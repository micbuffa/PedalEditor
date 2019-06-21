const express = require("express");
let fs = require("fs");
let path = require("path");
let process = require("process");
var bodyParser = require("body-parser");
var cors = require("cors");
const request = require("request");
const unzip = require("unzip");
var multer = require("multer");
var multerData = multer();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

  next();
});

app.get("/", function(req, res) {
  res.send("Hello world!");
});

app.get("/pedals", function(req, res) {
  res.json(JSON.parse(fs.readFileSync("./saves.json", "utf8")));
});

app.get("/previews/knobs", function(req, res) {
  fs.readdir("../Front-End/img/knobs2", (err, files) => {
    let filesUrl = "http://localhost:8887/img/knobs2/";

    response = {
      filesUrl,
      files
    };

    res.json(response);
  });
});

app.get("/previews/sliders", (req, res) => {
  fs.readdir("../Front-End/img/sliders", (err, files) => {
    let filesUrl = "http://localhost:8887/img/sliders/";

    response = {
      filesUrl,
      files
    };

    res.json(response);
  });
});

app.get("/previews/icons", function(req, res) {
  fs.readdir("../Front-End/img/icons", (err, files) => {
    let filesUrl = "http://localhost:8887/img/icons/";

    response = {
      filesUrl,
      files
    };

    res.json(response);
  });
});

app.get("/previews/switches", function(req, res) {
  fs.readdir("../Front-End/img/switches", (err, files) => {
    let filesUrl = "http://localhost:8887/img/switches/";

    response = {
      filesUrl,
      files
    };

    res.json(response);
  });
});

app.post("/pedals", function(req, res) {
  let id;
  let pedals = JSON.parse(fs.readFileSync("./saves.json", "utf8"));
  let i = 0;

  for (; i < pedals.length; i++) {
    if (pedals[i].id === req.body.id) {
      pedals[i] = req.body;
      id = pedals[i].id;
      break;
    }
  }

  if (i == pedals.length) {
    id = Date.now();
    req.body.id = id;
    pedals.push(req.body);
  }

  fs.writeFile("./saves.json", JSON.stringify(pedals), err => {
    if (err) {
      res.error("An error occured saving the pedal.");
    } else {
      res.json({ message: "Pedal savec successfully!", id: id });
    }
  });
});

app.post("/generate", multerData.fields([]), function(req, res) {
  //console.dir(req.body);
  let wapName = req.body.wapName;

  // Check if a working dir exists for this WAP name, if not create it
  let currentDir = process.cwd();

  let wapDir = currentDir + "/functional-pedals/published/" + wapName;
  console.log("/generate, checking if dir " + wapDir + "exists...");

  if (!fs.existsSync(wapDir)) {
    console.log("it does not exists, let's create it...");
    fs.mkdirSync(wapDir);
    console.log("...created, let's copy assets into it...");
    // copy inside the assets
    // first, the img dir with webaudiocontrol sprites, etc.
    copyFolderRecursiveSync(
      currentDir + "/functional-pedals/commonAssets/img",
      wapDir
    );
    console.log("Folder with imgs copied...");

    // then the mp3 file used by the tester
    copyFileSync(
      currentDir + "/functional-pedals/commonAssets/CleanGuitarRiff.mp3",
      wapDir
    );
    console.log("mp3 file needed to WAP embedded tester copied...");
  }

  fs.writeFile(wapDir + "/main.html", req.body.generated, err => {
    if (err) {
      res.error("An error occured saving the functional pedal.");
    } else {
      res.json({
        message:
          "main.html generated successfully for wapName = " +
          req.body.wapName +
          " in directory " +
          wapDir
      });
    }
  });
});

// Gets the binary.zip DSP files from Faust remote server, and unzip it in the WAP dir.
app.post("/addBinaryDotZip", multerData.fields([]), function(req, res) {
  let wapName = req.body.wapName;
  let binaryDotZipURL = req.body.url;

  let currentDir = process.cwd();

  let wapDir = currentDir + "/functional-pedals/published/" + wapName;
  console.log("/addBinaryDotZip, adding binary.zip to " + wapDir);

  console.log("Sending request to GET " + binaryDotZipURL);
  request(binaryDotZipURL)
    .pipe(fs.createWriteStream(wapDir + "/binary.zip"))
    .on("close", function() {
      console.log("binary.zip has been downloaded, now unzipping it...");
      fs.createReadStream(wapDir + "/binary.zip").pipe(
        unzip.Extract({ path: wapDir })
      );
      console.log("The file has been unzipped...");
    });
});

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});

//################
// UTILS FUNCTIONS
//################
function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function(file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}
