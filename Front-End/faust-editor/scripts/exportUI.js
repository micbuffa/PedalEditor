"use strict";

function onEnterKey(event) {
	if (!event) {
		var event = window.event;
	}

	if (event.keyCode === 13) {
		event.preventDefault();
		updateFWTargets();
	}
}

function openExport() {
	document.getElementById("plusImg").style.visibility = "hidden";
	document.getElementById("moinsImg").style.visibility = "visible";
	document.getElementById("export").style.visibility = "visible";
}

function closeExport(event) {
	if (!event) {
		event = window.event;
	}

	var target = event.target;
	while (target && target != document.getElementById("export") && target !=
		document.getElementById("plusImg")) {
		target = target.parentNode;
	}

	if (!target) {
		document.getElementById("plusImg").style.visibility = "visible";
		document.getElementById("moinsImg").style.visibility = "hidden";
		document.getElementById("export").style.visibility = "hidden";
	}
}

function deleteQrCode(div)
{
	if (div !== undefined) {
		for (var i = div.children.length - 1; i >= 0; i--) {
			if (div.children[i].id != "loader") {
				div.removeChild(div.children[i]);
			}
		}
	}
}

function forgeURL()
{
	const plateform = document.getElementById("Platform").options[document.getElementById("Platform").selectedIndex].value;
	const architecture = document.getElementById("Architecture").options[document.getElementById("Architecture").selectedIndex].value;
	const output = (plateform === "android") ? "binary.apk" : "binary.zip";

	return document.getElementById("exportUrl").value + "/" + sha + "/" + plateform + "/" + architecture + "/" + output;
}

function updateQrCode(sha, div) 
{
	deleteQrCode(div);

	var plateform = document.getElementById("Platform").options[document.getElementById("Platform").selectedIndex].value;
	var architecture = document.getElementById("Architecture").options[document.getElementById("Architecture").selectedIndex].value;
	var output = (plateform === "android") ? "binary.apk" : "binary.zip";

	var link = document.createElement('a');
	link.href = document.getElementById("exportUrl").value + "/" + sha + "/" +
		plateform + "/" + architecture + "/" + output;

	var myWhiteDiv = getQrCode(document.getElementById("exportUrl").value, sha, plateform, architecture, output, 130);

	div.appendChild(link);
	link.appendChild(myWhiteDiv);
}

function tooglePlayEdit(sha, div) {
	console.log('yes');
	if(document.querySelector('#edit-zone').style.display === 'none') {
		document.querySelector('#edit-zone').style.display = 'block';
		document.querySelector('#play-zone').innerHTML = '';

	} else {
		document.querySelector('#edit-zone').style.display = 'none';
		document.querySelector('#play-zone').innerHTML = '<object type="text/html" data="http://localhost:3000/functional-pedals/current/testuntitled.html" width="800px" height="600px"></object>'
	}

	
}

function updateQrCodeForWAP(sha, div) {
	deleteQrCode(div);

	var plateform = 'web'
	var architecture = 'wap';
	var output = "binary.zip";

	let downPath = document.getElementById("exportUrl").value + "/" + sha + "/" +
	plateform + "/" + architecture + "/" + output;

	sendDownloadPathToPedalEditorBackendPath(downPath);
}



function sendDownloadPathToPedalEditorBackendPath(downPath, pedalName) {
	var http = new XMLHttpRequest();
	var url = 'http://localhost:3000/generated-wap';
	var params = {
		url: downPath,
		pedalName: "current"
	};

	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', "application/json");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}

	http.send(JSON.stringify(params));
}

function cancelLoader() {
	document.getElementById("loader").style.visibility = "hidden";
}

function cleanComboBox(id) {
	while (document.getElementById(id).childNodes.length > 0) {
		document.getElementById(id).removeChild(document.getElementById(id).childNodes[0]);
	}
}

function changeArchs() {
	// Clean combobox before adding new options
	cleanComboBox("Architecture");
	deleteQrCode(document.getElementById("qrDiv"));

	var platform = document.getElementById("Platform").options[document.getElementById("Platform").selectedIndex].value;
	var archs = getArchitectures(window.json, platform);

	for (var j = 0; j < archs.length; j++) {
		var a = document.createElement('option');
		a.text = archs[j];
		document.getElementById("Architecture").options.add(a);
	}
}

function updateFWTargets() {
	// Clean combobox before adding new options
	cleanComboBox("Platform");
	cleanComboBox("Architecture");

	getTargets(document.getElementById("exportUrl").value, function(json) {
		window.json = json;
		var platforms = getPlatforms(json);

		for (var i = 0; i < platforms.length; i++) {
			var o = document.createElement("option");
			o.text = platforms[i];
			document.getElementById("Platform").options.add(o);
		}

		changeArchs();
	}, function() {});
}

updateFWTargets();

/* document.getElementById("refreshButton").onclick = updateFWTargets;
document.getElementById("plusImg").onclick = openExport;
document.getElementById("moinsImg").onclick = closeExport;
document.body.addEventListener("click", closeExport, false);
 */