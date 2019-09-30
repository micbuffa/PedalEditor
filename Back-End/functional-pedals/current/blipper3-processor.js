
/*
Code generated with Faust version 2.17.12
Compilation options: -lang wasm-ib -scal -ftz 2
*/

function getJSONblipper3() {
	return '{"name": "Blipper","filename": "blipper3.dsp","version": "2.17.12","compile_options": "-lang wasm-ib -scal -ftz 2","library_list": ["/usr/local/share/faust/stdfaust.lib","/usr/local/share/faust/basics.lib","/usr/local/share/faust/maths.lib","/usr/local/share/faust/signals.lib","/usr/local/share/faust/oscillators.lib","/usr/local/share/faust/analyzers.lib","/usr/local/share/faust/filters.lib"],"include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/6244E251437BE860C00D085D00DFD06889A02EDF/web/wap"],"size": "16528","inputs": "2","outputs": "2","meta": [ { "analyzers.lib/name": "Faust Analyzer Library" },{ "analyzers.lib/version": "0.0" },{ "author": "Oli Larkin (contact@olilarkin.co.uk)" },{ "basics.lib/name": "Faust Basic Element Library" },{ "basics.lib/version": "0.0" },{ "copyright": "Oliver Larkin" },{ "description": "Envelope Follower controlling pitch of a triangle oscillator, good with percussive input" },{ "filename": "blipper3.dsp" },{ "filters.lib/name": "Faust Filters Library" },{ "filters.lib/version": "0.0" },{ "licence": "GPL" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.1" },{ "name": "Blipper" },{ "oscillators.lib/name": "Faust Oscillator Library" },{ "oscillators.lib/version": "0.0" },{ "signals.lib/name": "Faust Signal Routing Library" },{ "signals.lib/version": "0.0" },{ "version": "0.2" }],"ui": [ {"type": "vgroup","label": "Blipper","items": [ {"type": "hslider","label": "BasePitch","address": "/Blipper/BasePitch","index": "84","meta": [{ "OWL": "PARAMETER_A" },{ "unit": "semitones" }],"init": "60","min": "24","max": "96","step": "0.1"},{"type": "hslider","label": "Mix","address": "/Blipper/Mix","index": "20","meta": [{ "OWL": "PARAMETER_D" }],"init": "0.5","min": "0","max": "1","step": "0.01"},{"type": "hslider","label": "PitchMod","address": "/Blipper/PitchMod","index": "96","meta": [{ "OWL": "PARAMETER_B" },{ "unit": "semitones" }],"init": "24","min": "-64","max": "64","step": "1"},{"type": "hslider","label": "Release","address": "/Blipper/Release","index": "48","meta": [{ "OWL": "PARAMETER_C" },{ "unit": "ms" }],"init": "20","min": "2","max": "100","step": "1"},{"type": "checkbox","label": "bypass","address": "/Blipper/bypass","index": "40"}]}]}';
}
function getBase64Codeblipper3() { return "AGFzbQEAAAAB1oCAgAAQYAJ/fwBgBH9/f38AYAF9AX1gAX8Bf2ABfwF/YAJ/fwF9YAF/AX9gAn9/AGABfwBgAn9/AGACf38AYAF/AGACf38Bf2ACf38Bf2ACfX0BfWADf399AAKZgICAAAIDZW52BV9leHBmAAIDZW52BV9wb3dmAA4Dj4CAgAAOAAEDBAUGBwgJCgsMDQ8FjICAgAABAYSAgIAA7IeAgAAHuoGAgAAMB2NvbXB1dGUAAwxnZXROdW1JbnB1dHMABA1nZXROdW1PdXRwdXRzAAUNZ2V0UGFyYW1WYWx1ZQAGDWdldFNhbXBsZVJhdGUABwRpbml0AAgNaW5zdGFuY2VDbGVhcgAJEWluc3RhbmNlQ29uc3RhbnRzAAoMaW5zdGFuY2VJbml0AAsaaW5zdGFuY2VSZXNldFVzZXJJbnRlcmZhY2UADA1zZXRQYXJhbVZhbHVlAA8GbWVtb3J5AgAK25CAgAAOgoCAgAAAC6CJgIAAAgZ/G31BACEEQQAhBUEAIQZBACEHQwAAAAAhCkMAAAAAIQtDAAAAACEMQwAAAAAhDUMAAAAAIQ5DAAAAACEPQwAAAAAhEEEAIQhDAAAAACERQwAAAAAhEkMAAAAAIRNDAAAAACEUQwAAAAAhFUMAAAAAIRZDAAAAACEXQwAAAAAhGEMAAAAAIRlDAAAAACEaQwAAAAAhG0MAAAAAIRxDAAAAACEdQwAAAAAhHkMAAAAAIR9DAAAAACEgQwAAAAAhIUEAIQlDAAAAACEiQwAAAAAhI0MAAAAAISQgAkEAaigCACEEIAJBBGooAgAhBSADQQBqKAIAIQYgA0EEaigCACEHQQAqAhBBACoCFJQhCkEAKgIoIQtDAACAPyALkyEMQwAAAABBACoCLEEAKgIsQ28SgzpBACoCMJSXlZMQACENQwAAgD8gDZMhDkEAKgJQQQAqAlSUIQ9BACoCEEEAKgJglCEQQQAhCANAAkBBAEEBNgIYIApBACoCDEEAKgIklJIhEUEAIBFDAAAAACARvEGAgID8B3EbOAIgIAQgCGoqAgAhEiAFIAhqKgIAIRMgDCASIBOSlIshFCAUIA1BACoCOJQgDiAUlJKXIRVBACAVQwAAAAAgFbxBgICA/AdxGzgCNEEAKgIMQQAqAkCUQQAqAhBBACoCNJSSIRZBACAWQwAAAAAgFrxBgICA/AdxGzgCPCAPQQAqAkxBACoCXJSSIRdBACAXQwAAAAAgF7xBgICA/AdxGzgCWCAQQQAqAgxBACoCaJSSIRhBACAYQwAAAAAgGLxBgICA/AdxGzgCZEMAAABAQ6uqqj1BACoCWEEAKgJkQQAqAjyUkkMAAIrCkpQQASEZQwAA3EMgGZRDc5e7QZchGkMAAAAAQwDg/0RBACoCSCAalZaXIRsgG44hHEMAAKBBIBqLlyEdQQAgHTgCbEEAKgJ4QQAqAixBACoCcJSSIR4gHiAejpMhH0EAIB9DAAAAACAfvEGAgID8B3EbOAJ0QwAAAEBBACoCdJRDAACAv5JDAAAAQBABISBBACAgOAJ8QQAoAhyyICBBACoCgAGTlCAdlSEhQYgBQQAoAoQBQf8fcUECdGogITgCACAbqCEJQ3e+fz9BACoCjIEBlEEAKgJEIBsgHJNBiAFBACgChAEgCUEBamtB/x9xQQJ0aioCAJQgIUGIAUEAKAKEASAJa0H/H3FBAnRqKgIAIBxDAACAPyAbk5KUk5OUkyEiQQAgIkMAAAAAICK8QYCAgPwHcRs4AoiBAUEAKgIIQQAqAiBBACoCPJRBACoCiIEBlCAZlJQhIyALIAxDAACAP0EAKgIgk5SSISQgBiAIaiAjIBIgJJSSOAIAIAcgCGogIyATICSUkjgCAEEAQQAoAhg2AhxBAEEAKgIgOAIkQQBBACoCNDgCOEEAQQAqAjw4AkBBAEEAKgJYOAJcQQBBACoCZDgCaEEAQQAqAmw4AnBBAEEAKgJ0OAJ4QQBBACoCfDgCgAFBAEEAKAKEAUEBajYChAFBAEEAKgKIgQE4AoyBASAIQQRqIQggCEEEIAFsSARADAIMAQsLCwuFgICAAABBAg8LhYCAgAAAQQIPC4uAgIAAACAAIAFqKgIADwuIgICAAABBACgCAA8LjoCAgAAAIAAgARACIAAgARALC62EgIAAAQt/QQAhAUEAIQJBACEDQQAhBEEAIQVBACEGQQAhB0EAIQhBACEJQQAhCkEAIQtBACEBA0ACQEEYIAFBAnRqQQA2AgAgAUEBaiEBIAFBAkgEQAwCDAELCwtBACECA0ACQEEgIAJBAnRqQwAAAAA4AgAgAkEBaiECIAJBAkgEQAwCDAELCwtBACEDA0ACQEE0IANBAnRqQwAAAAA4AgAgA0EBaiEDIANBAkgEQAwCDAELCwtBACEEA0ACQEE8IARBAnRqQwAAAAA4AgAgBEEBaiEEIARBAkgEQAwCDAELCwtBACEFA0ACQEHYACAFQQJ0akMAAAAAOAIAIAVBAWohBSAFQQJIBEAMAgwBCwsLQQAhBgNAAkBB5AAgBkECdGpDAAAAADgCACAGQQFqIQYgBkECSARADAIMAQsLC0EAIQcDQAJAQewAIAdBAnRqQwAAAAA4AgAgB0EBaiEHIAdBAkgEQAwCDAELCwtBACEIA0ACQEH0ACAIQQJ0akMAAAAAOAIAIAhBAWohCCAIQQJIBEAMAgwBCwsLQQAhCQNAAkBB/AAgCUECdGpDAAAAADgCACAJQQFqIQkgCUECSARADAIMAQsLC0EAQQA2AoQBQQAhCgNAAkBBiAEgCkECdGpDAAAAADgCACAKQQFqIQogCkGAIEgEQAwCDAELCwtBACELA0ACQEGIgQEgC0ECdGpDAAAAADgCACALQQFqIQsgC0ECSARADAIMAQsLCwuwgYCAAABBACABNgIAQQBDAIA7SEMAAIA/QQAoAgCyl5Y4AgRBAEMAANxEQQAqAgSVOAIIQQBDAAAAAEMAAEhDQQAqAgSVkxAAOAIMQQBDAACAP0EAKgIMkzgCEEEAQwAAgD9BACoCBJU4AixBAEMAAIA+QQAqAgSUOAJEQQBDAAAAP0EAKgIElDgCSEEAQwAAAABDAADIQkEAKgIElZMQADgCTEEAQwAAgD9BACoCTJM4AlALkICAgAAAIAAgARAKIAAQDCAAEAkLtICAgAAAQQBDAAAAPzgCFEEAQwAAAAA4AihBAEMAAKBBOAIwQQBDAABwQjgCVEEAQwAAwEE4AmALjYCAgAAAIAEgACAAIAFIGw8LjYCAgAAAIAAgASAAIAFIGw8LjICAgAAAIAAgAWogAjgCAAsL6JKAgAABAEEAC+ESeyJuYW1lIjogIkJsaXBwZXIiLCJmaWxlbmFtZSI6ICJibGlwcGVyMy5kc3AiLCJ2ZXJzaW9uIjogIjIuMTcuMTIiLCJjb21waWxlX29wdGlvbnMiOiAiLWxhbmcgd2FzbS1pYiAtc2NhbCAtZnR6IDIiLCJsaWJyYXJ5X2xpc3QiOiBbIi91c3IvbG9jYWwvc2hhcmUvZmF1c3Qvc3RkZmF1c3QubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9iYXNpY3MubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9tYXRocy5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L3NpZ25hbHMubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9vc2NpbGxhdG9ycy5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L2FuYWx5emVycy5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L2ZpbHRlcnMubGliIl0sImluY2x1ZGVfcGF0aG5hbWVzIjogWyIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0IiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdCIsIi91c3Ivc2hhcmUvZmF1c3QiLCIuIiwiL3RtcC9zZXNzaW9ucy82MjQ0RTI1MTQzN0JFODYwQzAwRDA4NUQwMERGRDA2ODg5QTAyRURGL3dlYi93YXAiXSwic2l6ZSI6ICIxNjUyOCIsImlucHV0cyI6ICIyIiwib3V0cHV0cyI6ICIyIiwibWV0YSI6IFsgeyAiYW5hbHl6ZXJzLmxpYi9uYW1lIjogIkZhdXN0IEFuYWx5emVyIExpYnJhcnkiIH0seyAiYW5hbHl6ZXJzLmxpYi92ZXJzaW9uIjogIjAuMCIgfSx7ICJhdXRob3IiOiAiT2xpIExhcmtpbiAoY29udGFjdEBvbGlsYXJraW4uY28udWspIiB9LHsgImJhc2ljcy5saWIvbmFtZSI6ICJGYXVzdCBCYXNpYyBFbGVtZW50IExpYnJhcnkiIH0seyAiYmFzaWNzLmxpYi92ZXJzaW9uIjogIjAuMCIgfSx7ICJjb3B5cmlnaHQiOiAiT2xpdmVyIExhcmtpbiIgfSx7ICJkZXNjcmlwdGlvbiI6ICJFbnZlbG9wZSBGb2xsb3dlciBjb250cm9sbGluZyBwaXRjaCBvZiBhIHRyaWFuZ2xlIG9zY2lsbGF0b3IsIGdvb2Qgd2l0aCBwZXJjdXNzaXZlIGlucHV0IiB9LHsgImZpbGVuYW1lIjogImJsaXBwZXIzLmRzcCIgfSx7ICJmaWx0ZXJzLmxpYi9uYW1lIjogIkZhdXN0IEZpbHRlcnMgTGlicmFyeSIgfSx7ICJmaWx0ZXJzLmxpYi92ZXJzaW9uIjogIjAuMCIgfSx7ICJsaWNlbmNlIjogIkdQTCIgfSx7ICJtYXRocy5saWIvYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRocy5saWIvbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHMubGliL3ZlcnNpb24iOiAiMi4xIiB9LHsgIm5hbWUiOiAiQmxpcHBlciIgfSx7ICJvc2NpbGxhdG9ycy5saWIvbmFtZSI6ICJGYXVzdCBPc2NpbGxhdG9yIExpYnJhcnkiIH0seyAib3NjaWxsYXRvcnMubGliL3ZlcnNpb24iOiAiMC4wIiB9LHsgInNpZ25hbHMubGliL25hbWUiOiAiRmF1c3QgU2lnbmFsIFJvdXRpbmcgTGlicmFyeSIgfSx7ICJzaWduYWxzLmxpYi92ZXJzaW9uIjogIjAuMCIgfSx7ICJ2ZXJzaW9uIjogIjAuMiIgfV0sInVpIjogWyB7InR5cGUiOiAidmdyb3VwIiwibGFiZWwiOiAiQmxpcHBlciIsIml0ZW1zIjogWyB7InR5cGUiOiAiaHNsaWRlciIsImxhYmVsIjogIkJhc2VQaXRjaCIsImFkZHJlc3MiOiAiL0JsaXBwZXIvQmFzZVBpdGNoIiwiaW5kZXgiOiAiODQiLCJtZXRhIjogW3sgIk9XTCI6ICJQQVJBTUVURVJfQSIgfSx7ICJ1bml0IjogInNlbWl0b25lcyIgfV0sImluaXQiOiAiNjAiLCJtaW4iOiAiMjQiLCJtYXgiOiAiOTYiLCJzdGVwIjogIjAuMSJ9LHsidHlwZSI6ICJoc2xpZGVyIiwibGFiZWwiOiAiTWl4IiwiYWRkcmVzcyI6ICIvQmxpcHBlci9NaXgiLCJpbmRleCI6ICIyMCIsIm1ldGEiOiBbeyAiT1dMIjogIlBBUkFNRVRFUl9EIiB9XSwiaW5pdCI6ICIwLjUiLCJtaW4iOiAiMCIsIm1heCI6ICIxIiwic3RlcCI6ICIwLjAxIn0seyJ0eXBlIjogImhzbGlkZXIiLCJsYWJlbCI6ICJQaXRjaE1vZCIsImFkZHJlc3MiOiAiL0JsaXBwZXIvUGl0Y2hNb2QiLCJpbmRleCI6ICI5NiIsIm1ldGEiOiBbeyAiT1dMIjogIlBBUkFNRVRFUl9CIiB9LHsgInVuaXQiOiAic2VtaXRvbmVzIiB9XSwiaW5pdCI6ICIyNCIsIm1pbiI6ICItNjQiLCJtYXgiOiAiNjQiLCJzdGVwIjogIjEifSx7InR5cGUiOiAiaHNsaWRlciIsImxhYmVsIjogIlJlbGVhc2UiLCJhZGRyZXNzIjogIi9CbGlwcGVyL1JlbGVhc2UiLCJpbmRleCI6ICI0OCIsIm1ldGEiOiBbeyAiT1dMIjogIlBBUkFNRVRFUl9DIiB9LHsgInVuaXQiOiAibXMiIH1dLCJpbml0IjogIjIwIiwibWluIjogIjIiLCJtYXgiOiAiMTAwIiwic3RlcCI6ICIxIn0seyJ0eXBlIjogImNoZWNrYm94IiwibGFiZWwiOiAiYnlwYXNzIiwiYWRkcmVzcyI6ICIvQmxpcHBlci9ieXBhc3MiLCJpbmRleCI6ICI0MCJ9XX1dfQ=="; }

/*
 faust2wasm: GRAME 2017-2019
*/
 
'use strict';

// Monophonic Faust DSP
class blipper3Processor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            blipper3Processor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            blipper3Processor.parse_items(group.items, obj, callback);
        }
    }
    
    static parse_items(items, obj, callback)
    {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], obj, callback);
        }
    }
    
    static parse_item1(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            blipper3Processor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Nothing
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            obj.push({ name: item.address,
                     defaultValue: item.init,
                     minValue: item.min,
                     maxValue: item.max });
        }
    }
    
    static parse_item2(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            blipper3Processor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "soundfile") {
            // Keep soundfile adresses
            obj.soundfile_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        }
    }
 
    static get parameterDescriptors() 
    {
        // Analyse JSON to generate AudioParam parameters
        var params = [];
        blipper3Processor.parse_ui(JSON.parse(getJSONblipper3()).ui, params, blipper3Processor.parse_item1);
 	    return params;
    }
   
    constructor(options)
    {
        super(options);
        
       	const importObject = {
                env: {
                    memoryBase: 0,
                    tableBase: 0,

                    // Integer version
                    _abs: Math.abs,

                    // Float version
                    _acosf: Math.acos,
                    _asinf: Math.asin,
                    _atanf: Math.atan,
                    _atan2f: Math.atan2,
                    _ceilf: Math.ceil,
                    _cosf: Math.cos,
                    _expf: Math.exp,
                    _floorf: Math.floor,
                    _fmodf: function(x, y) { return x % y; },
                    _logf: Math.log,
                    _log10f: Math.log10,
                    _max_f: Math.max,
                    _min_f: Math.min,
                    _remainderf: function(x, y) { return x - Math.round(x/y) * y; },
                    _powf: Math.pow,
                    _roundf: Math.fround,
                    _sinf: Math.sin,
                    _sqrtf: Math.sqrt,
                    _tanf: Math.tan,

                    // Double version
                    _acos: Math.acos,
                    _asin: Math.asin,
                    _atan: Math.atan,
                    _atan2: Math.atan2,
                    _ceil: Math.ceil,
                    _cos: Math.cos,
                    _exp: Math.exp,
                    _floor: Math.floor,
                    _fmod: function(x, y) { return x % y; },
                    _log: Math.log,
                    _log10: Math.log10,
                    _max_: Math.max,
                    _min_: Math.min,
                    _remainder:function(x, y) { return x - Math.round(x/y) * y; },
                    _pow: Math.pow,
                    _round: Math.fround,
                    _sin: Math.sin,
                    _sqrt: Math.sqrt,
                    _tan: Math.tan,

                    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
                }
        };
        
        this.blipper3_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
        this.json_object = JSON.parse(options.processorOptions.json);
     
        this.output_handler = function(path, value) { this.port.postMessage({ path: path, value: value }); };
        
        this.ins = null;
        this.outs = null;

        this.dspInChannnels = [];
        this.dspOutChannnels = [];

        this.numIn = parseInt(this.json_object.inputs);
        this.numOut = parseInt(this.json_object.outputs);

        // Memory allocator
        this.ptr_size = 4;
        this.sample_size = 4;
        this.integer_size = 4;
        
        this.factory = this.blipper3_instance.exports;
        this.HEAP = this.blipper3_instance.exports.memory.buffer;
        this.HEAP32 = new Int32Array(this.HEAP);
        this.HEAPF32 = new Float32Array(this.HEAP);

        //console.log(this.HEAP);
        //console.log(this.HEAP32);
        //console.log(this.HEAPF32);

        // bargraph
        this.outputs_timer = 5;
        this.outputs_items = [];

        // input items
        this.inputs_items = [];
        
        // soundfile items
        this.soundfile_items = [];

        // Start of HEAP index

        // DSP is placed first with index 0. Audio buffer start at the end of DSP.
        this.audio_heap_ptr = parseInt(this.json_object.size);

        // Setup pointers offset
        this.audio_heap_ptr_inputs = this.audio_heap_ptr;
        this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);

        // Setup buffer offset
        this.audio_heap_inputs = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * NUM_FRAMES * this.sample_size);
        
        // Start of DSP memory : DSP is placed first with index 0
        this.dsp = 0;

        this.pathTable = [];
     
        // Send output values to the AudioNode
        this.update_outputs = function ()
        {
            if (this.outputs_items.length > 0 && this.output_handler && this.outputs_timer-- === 0) {
                this.outputs_timer = 5;
                for (var i = 0; i < this.outputs_items.length; i++) {
                    this.output_handler(this.outputs_items[i], this.HEAPF32[this.pathTable[this.outputs_items[i]] >> 2]);
                }
            }
        }
        
        this.loadFile = function (sound_index, sound_ptr, length, sample_rate, channels, buffers)
        {
            /*
             Soundfile layout:
            
                FAUSTFLOAT** fBuffers;
                int fLength;
                int fSampleRate;
                int fChannels;
             
                ===========
                Soundfile struct
                fBuffers[channels]
                fBuffers0
                fBuffers1
                ...
                Soundfile struct
                fBuffers[channels]
                fBuffers0
                fBuffers1
                ...
                ===========
            */
            
            var size_of_soundfile = this.ptr_size + (this.integer_size * 3);  // fBuffers, fLength, fSampleRate, fChannels
            
            //console.log("sound_ptr " + sound_ptr);
            //console.log("size_of_soundfile " + size_of_soundfile);
            
            // end of sounfile
            var end_of_soundfile_ptr = sound_ptr + size_of_soundfile;
            
            this.HEAP32[sound_ptr >> 2] = end_of_soundfile_ptr;
            this.HEAP32[(sound_ptr + 4) >> 2] = length;      // fLength
            this.HEAP32[(sound_ptr + 8) >> 2] = sample_rate; // fSampleRate
            this.HEAP32[(sound_ptr + 12) >> 2] = channels;   // fChannels
            
            //console.log("end_of_soundfile_ptr " + end_of_soundfile_ptr);
            
            // Setup soundfile pointers
            var start_of_soundfile_data_ptr = end_of_soundfile_ptr + this.ptr_size * channels;
            
            for (var i = 0; i < channels; i++) {
                this.HEAP32[(end_of_soundfile_ptr + (i * this.ptr_size)) >> 2] = start_of_soundfile_data_ptr + (i * length * this.sample_size);
            }
            
            // Setup soundfile buffer
            for (var i = 0; i < channels; i++) {
                
                // start of sound buffer
                var start_of_buffer_ptr = start_of_soundfile_data_ptr + (i * length * this.sample_size);
                
                // generate a 440 Hz signal
                for (var j = 0; j < length; j++) {
                    this.HEAPF32[(start_of_buffer_ptr + (j * this.sample_size)) >> 2] = 0.8 * Math.sin((j/length)*2*Math.PI);
                }
            }
            
            // Setup fSoundfile fields in the DSP structure
            //console.log("sound_index " + sound_index);
            //console.log("this.pathTable[this.soundfile_items[sound_index]] " + this.pathTable[this.soundfile_items[sound_index]]);
            
            this.HEAP32[this.pathTable[this.soundfile_items[sound_index]] >> 2] = sound_ptr;
            
            /*
            console.log("start_of_soundfile_data_ptr " + start_of_soundfile_data_ptr);
            console.log("length " + length);
            console.log("channels " + channels);
            console.log("this.sample_size " + this.sample_size);
            console.log("END " + (start_of_soundfile_data_ptr + (channels * length * this.sample_size)));
            */
            
            // End of buffer data;
            return start_of_soundfile_data_ptr + (channels * length * this.sample_size);
        }
        
        this.initAux = function ()
        {
            var i;
            
            if (this.numIn > 0) {
                this.ins = this.audio_heap_ptr_inputs;
                for (i = 0; i < this.numIn; i++) {
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((NUM_FRAMES * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((NUM_FRAMES * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }
            
            // Parse UI
            blipper3Processor.parse_ui(this.json_object.ui, this, blipper3Processor.parse_item2);
            
            /*
            console.log("soundfile_items.length " + this.soundfile_items.length);
            
            // Setup soundfile offset (after audio data)
            this.soundfile_ptr = this.audio_heap_outputs + (this.numOut * NUM_FRAMES * this.sample_size);
            
            var sound_ptr1 = this.soundfile_ptr;
            var sound_ptr2 = this.loadFile(0, sound_ptr1, 44100/700, 44100, 2, null);
            var sound_ptr3 = this.loadFile(1, sound_ptr2, 44100/500, 44100, 2, null);
            */
             
            // Init DSP
            this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
        }

        this.setParamValue = function (path, val)
        {
            this.HEAPF32[this.pathTable[path]] = val;
        }

        this.getParamValue = function (path)
        {
            return this.HEAPF32[this.pathTable[path]];
        }

        // Init resulting DSP
        this.initAux();
        
        console.log(this);
    }
    
    process(inputs, outputs, parameters) 
    {
        var input = inputs[0];
        var output = outputs[0];
        
        // Check inputs
        if (this.numIn > 0 && ((input === undefined) || (input[0].length === 0))) {
            //console.log("Process input error");
            return true;
        }
        // Check outputs
        if (this.numOut > 0 && ((output === undefined) || (output[0].length === 0))) {
            //console.log("Process output error");
            return true;
        }
        
        // Copy inputs
        if (input !== undefined) {
            for (var chan = 0; chan < Math.min(this.numIn, input.length) ; ++chan) {
                var dspInput = this.dspInChannnels[chan];
                dspInput.set(input[chan]);
            }
        }
        
        /*
        TODO: sample accurate control change is not yet handled
        When no automation occurs, params[i][1] has a length of 1,
        otherwise params[i][1] has a length of NUM_FRAMES with possible control change each sample
    	*/
        
        // Update controls
        var params = Object.entries(parameters);
        for (var i = 0; i < params.length; i++) {
            this.HEAPF32[this.pathTable[params[i][0]] >> 2] = params[i][1][0];
        }
        
        // Compute
        this.factory.compute(this.dsp, NUM_FRAMES, this.ins, this.outs);
        
        // Update bargraph
        this.update_outputs();
        
        // Copy outputs
        if (output !== undefined) {
            for (var chan = 0; chan < Math.min(this.numOut, output.length); ++chan) {
                var dspOutput = this.dspOutChannnels[chan];
                output[chan].set(dspOutput);
            }
        }
        
        return true;
    }
}

// Globals
const NUM_FRAMES = 128;
registerProcessor('blipper3', blipper3Processor);


