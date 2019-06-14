"use strict";

var isWebKitAudio = (typeof(webkitAudioContext) !== "undefined");
var isWasm = (typeof(WebAssembly) !== "undefined");
var isPoly = false;

if (!isWasm) {
	alert("WebAssembly is not supported in this browser, the page will not work !")
}

var audio_context = (isWebKitAudio) ? new webkitAudioContext() : new AudioContext();
var buffer_size = 1024;
var audio_input = null;
var midi_input = [];
var factory_stack = [];
var DSP = null;
var dsp_code = null;
var faust_svg = null;
var poly_flag = "OFF";
var ftz_flag = "2";
var poly_nvoices = 16;
var rendering_mode = "ScriptProcessor";
var output_handler = null;

// compute libraries URL relative to current page
var wurl = window.location.href;
var qm = wurl.indexOf('?');
if (qm > 0) {
    wurl = wurl.substr(0, qm);  // remove options from the URL
}
var libraries_url = wurl.substr(0, wurl.lastIndexOf('/')) + "/libraries/";
console.log("URL:", libraries_url);

function workletAvailable()
{
    if (typeof (OfflineAudioContext) === "undefined") return false;
    var context = new OfflineAudioContext(1, 1, 44100);
    return context.audioWorklet && typeof context.audioWorklet.addModule === 'function';
}

// Do no keep more than 10 alive DSP factories 
function checkFactoryStack(factory)
{
    if (factory && factory_stack.indexOf(factory) === -1) {
        factory_stack.push(factory);
        if (factory_stack.length >= 10) {
            faust.deleteDSPFactory(factory_stack.shift());
        }
    }
}

function deleteDSP()
{
	if (DSP) {
		if (audio_input) {
			audio_input.disconnect(DSP);
		}
		DSP.disconnect(audio_context.destination);
		if (isPoly) {
			faust.deletePolyDSPInstance(DSP);
		} else {
			faust.deleteDSPInstance(DSP);
		}
		_f4u$t.hard_delete(faust_svg);

		DSP = null;
		faust_svg = null;
	}
}

function activateDSP(dsp)
{
    if (dsp) {
        DSP = dsp;
        if (DSP.getNumInputs() > 0) {
            activateAudioInput();
        } else {
            audio_input = null;
        }

        // Setup UI
        faust_svg = $('#faustui');
        output_handler = _f4u$t.main(DSP.getJSON(), $(faust_svg), function(path, val) { DSP.setParamValue(path, val); });
        console.log(DSP.getJSON());
        DSP.setOutputParamHandler(output_handler);
        DSP.connect(audio_context.destination);

        console.log(DSP.getNumInputs());
        console.log(DSP.getNumOutputs());

        loadDSPState();
    } else {
      	alert(faust.getErrorMessage());
        // Fix me
        document.getElementById('faustuiwrapper').style.display = 'none';
    }
}

function redirectEditor(dsp) {
    let ui = JSON.parse(dsp.getJSON()).ui;
    let dspFull = JSON.parse(dsp.getJSON());

    // get the WAP name
    //let name = document.querySelector("#filename").value;
    //let pos = name.lastIndexOf(".");
    // ui.WapName = name.substr(0, pos)
    ui.WapName = dspFull.name;

    console.log("WapName = " + ui.WapName);
    console.log("#######", ui);
    
    /*
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "../index.html");
    form.setAttribute("target", "view");

    var hiddenField = document.createElement("input"); 
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "message");
    hiddenField.setAttribute("value", JSON.stringify(ui));

    form.appendChild(hiddenField);
    document.body.appendChild(form);

    window.open('', 'view');


    form.submit();*/

    var newWindow = window.open('../index.html');
    newWindow.faustUI = ui;
    //var win = window.open("../index.html?data=" + JSON.stringify(ui));
    //win.focus();
}

function activateMonoDSP(dsp)
{
    activateDSP(dsp);
}

function activatePolyDSP(dsp)
{
	activateDSP(dsp);
    checkPolyphonicDSP(dsp.getJSON());
}

function compileMonoDSP(factory, openPE)
{
    if (!factory) {
        alert(faust.getErrorMessage());
        // Fix me
        document.getElementById('faustuiwrapper').style.display = 'none';
    } else if (openPE && rendering_mode === "ScriptProcessor") {
        console.log("Compiling for pedal editor");
        faust.createDSPInstance(factory, audio_context, buffer_size, redirectEditor);
    } else if (rendering_mode === "ScriptProcessor") {
        console.log("ScriptProcessor createDSPInstance");
        faust.createDSPInstance(factory, audio_context, buffer_size, activateMonoDSP);
    } else {
        console.log("Worklet createDSPWorkletInstance");
        faust.createDSPWorkletInstance(factory, audio_context, activateMonoDSP);
    }
}

function compilePolyDSP(factory, openPE)
{   
    if (!factory) {
        alert(faust.getErrorMessage());
        // Fix me
        document.getElementById('faustuiwrapper').style.display = 'none';
    } else if (openPE) {
        console.log("Copiling for pedal editor");
        faust.createPolyDSPInstance(factory, audio_context, buffer_size, poly_nvoices, openPE);
    } else if (rendering_mode === "ScriptProcessor") {
        console.log("ScriptProcessor createPolyDSPInstance");
        faust.createPolyDSPInstance(factory, audio_context, buffer_size, poly_nvoices, activatePolyDSP);
    } else {
        console.log("Worklet createPolyDSPWorkletInstance");
        faust.createPolyDSPWorkletInstance(factory, audio_context, poly_nvoices, activatePolyDSP);
    }
}

function compileDSP(openPE)
{
	deleteDSP();

	// Prepare argv list
	var argv = [];
	argv.push("-ftz");
	argv.push(ftz_flag);
	argv.push("-I");
	argv.push(libraries_url);
	/*
	// TODO : support for multiple library directories
	argv.push("-I");
	argv.push(base_url);
	*/
	console.log(argv);

    if(openPE) {
        console.log("Opening pe");
		isPoly = false;
		console.log("Mono DSP");
		// Create a mono DSP factory from the dsp code
		faust.createDSPFactory(dsp_code, argv, function(factory) { compileMonoDSP(factory, true); checkFactoryStack(factory); });

        return;

    }

	if (poly_flag === "ON") {
		isPoly = true;
		console.log("Poly DSP");
		// Create a poly DSP factory from the dsp code
		faust.createPolyDSPFactory(dsp_code, argv, function(factory) { compilePolyDSP(factory); checkFactoryStack(factory); });
    } else {
		isPoly = false;
		console.log("Mono DSP");
		// Create a mono DSP factory from the dsp code
		faust.createDSPFactory(dsp_code, argv, function(factory) { compileMonoDSP(factory); checkFactoryStack(factory); });
	}
}


function expandDSP(dsp_code)
{
	// Prepare argv list
	var argv = [];
	argv.push("-ftz");
	argv.push(ftz_flag);
	argv.push("-I");
	argv.push(libraries_url);
	/*
	// TODO : support for multiple library directories
	argv.push("-I");
	argv.push(base_url);
	*/
	console.log(argv);

	return faust.expandDSP(dsp_code, argv);
}
