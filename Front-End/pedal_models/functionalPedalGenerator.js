/**
 * Generates the code of the functional pedal from the editable pedal.
 */
class FunctionalPedalGenerator {
  constructor(editablePedal) {
    this.editablePedal = editablePedal;
  }

  /**
   * Generates the code of the functional pedal which will be used on the pedal board.
   */
  generateFunctionalPedalCode(pedalName) {
    // this.editablePedal.name = 'untitled';
    // this.editablePedal.setAttribute('name', 'untitled');
    // MB
    this.editablePedal.name = pedalName;

    // The complete content of the functional pedal file.
    let functionalPedalCode = `
    <link href='https://fonts.googleapis.com/css?family=Montez|Lobster|Roboto|Lexend+Zetta|Josefin+Sans|Shadows+Into+Light|Pacifico|Amatic+SC:700|Orbitron:400,900|Rokkitt|Righteous|Dancing+Script:700|Bangers|Chewy|Sigmar+One|Architects+Daughter|Abril+Fatface|Covered+By+Your+Grace|Kaushan+Script|Gloria+Hallelujah|Satisfy|Lobster+Two:700|Comfortaa:700|Cinzel|Courgette' rel='stylesheet' type='text/css'>
            <script src="https://mainline.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webcomponents-lite.js"></script>
            <script>
            </script>
            <script src="https://mainline.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webaudio-controls.js"></script>
            WebAudioControlsOptions = {
                useMidi: 1,
            };
            `;

    /* let functionalPedalCode = `
        <script>
        WebAudioControlsOptions = {
            useMidi: 1,
        };
        </script>
                `;*/

    // The content of the generated class.
    let classContent = `
    
        `;

    // The content of the constructor of the class.
    let constructorContent = `
                super();
                this._plug = plug;
                this._plug.gui = this;
                console.log(this._plug);
                this._root = this.attachShadow({ mode: 'open' });
                this._root.appendChild(${this.editablePedal.name}Temp.content.cloneNode(true));
                this.isOn;
                this.state = new Object();
                this.setKnobs();
                this.setSliders();
                this.setSwitches();
                //this.setSwitchListener();
                this.setInactive();
                this._root.querySelector("#pedal").style.transform = 'none';
                //this._root.querySelector("#test").style.fontFamily = window.getComputedStyle(this._root.querySelector("#test")).getPropertyValue('font-family');

                // Compute base URI of this main.html file. This is needed in order
                // to fix all relative paths in CSS, as they are relative to
                // the main document, not the plugin's main.html

                //console.log("maindoc URI = " + ${this.editablePedal.name}Temp.baseURI);
                let posOfLastSlash = ${this.editablePedal.name}Temp.baseURI.lastIndexOf("/");
                //console.log("Base URI = " + ${this.editablePedal.name}Temp.baseURI.substring(0, posOfLastSlash))
                this.basePath = ${this.editablePedal.name}Temp.baseURI.substring(0, posOfLastSlash);
                //console.log("basePath = " + this.basePath)
                //console.log("baseURI = " + this.baseURI)

                // Fix relative path in WebAudio Controls elements
                this.fixRelativeImagePathsInCSS();

                // optionnal : set image background using a relative URI (relative
                // to this main.html file)
                //this.setImageBackground("/img/BigMuffBackground.png");
        `;

    // The content of the first function of the class.
    let function2Content = `
                if (active == undefined || active == false) {
                    this.isOn = false;
                    this.bypass();
                    this._root.querySelector("#switch1").value = 0;
                } else if (active) {
                    this.isOn = true;
                    this.reactivate();
                    this._root.querySelector("#switch1").value = 1;
                }
    `;

    let funcFixRelativeImagePathsInCSSContent = `
        // change webaudiocontrols relative paths for spritesheets to absolute
            let webaudioControls = this._root.querySelectorAll("webaudio-knob, webaudio-slider, webaudio-switch");
            webaudioControls.forEach(e => {
                let currentImagePath = e.getAttribute("src");
                if (currentImagePath !== undefined) {
                    //console.log("Got wc src as " + e.getAttribute("src"));
                    let imagePath = e.getAttribute("src");
                    e.setAttribute("src", this.basePath + "/" + imagePath);
                    //console.log("After fix : wc src as " + e.getAttribute("src"));
                }
            });
            `;

    let funcSetImageBackgroundContent = `
           // check if the shadowroot host has a background image
            let mainDiv = this._root.querySelector("#main");
            mainDiv.style.backgroundImage = "url(" + this.basePath + "/" + imageRelativeURI + ")";

            //console.log("background =" + mainDiv.style.backgroundImage);
            //this._root.style.backgroundImage = "toto.png";
    `;

    let funcSetInactiveContent = `
        let switches = this._root.querySelectorAll(".switch webaudio-switch");
        switches.forEach(s => {
          console.log("### SWITCH ID = " + s.id);
          this._plug.setParam(s.id, 1);
        });
       `;

    let funcGetObservedAttributes = `
                return ['state'];
        `;

    let funcAttributeChangedCallback = `
            this.state = JSON.parse(this.getAttribute('state'));
            console.log(this.state);
            if (this.state.status == "enable") {
                this._root.querySelector(".switch").querySelector("webaudio-switch").value = 1;
                this.isOn = true;
            }
            //this.knobs = this._root.querySelectorAll(".knob");
            //this.labels = this._root.querySelectorAll(".knob-label");
            for (var i = 0; i < this.knobs.length; i++) {
                //this.knobs[i].querySelector("webaudio-konb").value = this.state[this.labels[i].innerHTML.toLowerCase().replace(/ /g, "")] * 100;
                this.knobs[i].querySelector("webaudio-knob").value = this.state[this.knobs[i].id];
            }
        `;

    let funcSetResources = `
            // Sets the background image and style.
            var background = this._root.querySelector('img');
            background.src = this._plug.URL + '/assets/${this.editablePedal.getBackgroundImageName()}';
            background.style = 'border-radius : ${this.editablePedal.getAttribute(
              "radius"
            )}px;'
            this._root.querySelectorAll(".knob").forEach((knob) => {
				knob.querySelector("webaudio-knob").setAttribute('src', this._plug.URL + '/assets/MiniMoog_Main.png');
            });
            
            this._root.querySelectorAll(".switch").forEach((s) => {
				s.querySelector("webaudio-switch").setAttribute('src', this._plug.URL + '/assets/switch_1.png');
            });
            
            
        `;

    // The content of the second function of the class.
    let function1Content = this.generateSetKnobs();

    let funcSetSlidersContent = this.generateSetSliders();
    let funcSetSwitchesContent = this.generateSetSwitches();

    let funcPropertiesContent = `
            this.boundingRect = {
                dataWidth: {
                type: Number,
                value: ${this.editablePedal.getAttribute("width")}
                },
                dataHeight: {
                type: Number,
                value: ${this.editablePedal.getAttribute("height")}
                }
          };
          return this.boundingRect;
        `;

    let funcSwitchListenerContentOld = `
            console.log("setswitch");
            if(this._root.querySelector("#switch1")) {
                this._root.querySelector("#switch1").addEventListener('change', (e) => {
                    if (this.isOn) this.bypass()
                    else this.reactivate();
                    this.isOn = !this.isOn;
                });
            }
        `;

    // Michel Buffa : new version does not do anything special, no hard coding of the
    // bypass, as we now rely on faust code for that
    let funcSwitchListenerContent = `
            console.log("setswitch");
            if(this._root.querySelector("#switch1")) {
                this._root.querySelector("#switch1").addEventListener('change', (e) => {
                    if (this.isOn) this.bypass()
                    else this.reactivate();
                    this.isOn = !this.isOn;
                });
            }
        `;
    let funcBypassContent = `
            this._plug.setParam("/${this.editablePedal.getAttribute(
              "name"
            )}/bypass", 1);
            console.log("disabled");
        `;
    let funcReactivateContent = `
            this._plug.setParam("/${this.editablePedal.getAttribute(
              "name"
            )}/bypass", 0);
        `;
    let funcAttributeChangedCallbackContent = `
            console.log("Custom element attributes changed.");
            this.state = JSON.parse(this.getAttribute('state'));
            let tmp = "/${this.editablePedal.getAttribute("name")}/bypass";
            if (this.state[tmp] == 1) {
            this._root.querySelector("#switch1").value = 0;
            this.isOn = false;
            } else if (this.state[tmp] == 0) {
            this._root.querySelector("#switch1").value = 1;
            this.isOn = true;
            }
            this.knobs = this._root.querySelectorAll(".knob");
            console.log(this.state);
            for (var i = 0; i < this.knobs.length; i++) {
                    this.knobs[i].setValue(this.state[this.knobs[i].id],false);
            console.log(this.knobs[i].value);
            }
        `;

    // Generating and appending the template of the pedal.
    functionalPedalCode += this.generateFunctionalPedalTemplate();

    // Generating the constructor of the pedal.
    let constructor = this.generateFunction(
      "constructor",
      ["plug"],
      constructorContent
    );

    let funcFixRelativeImagePathsInCSS = this.generateFunction(
      "fixRelativeImagePathsInCSS",
      ["imageRelativeURI"],
      funcFixRelativeImagePathsInCSSContent
    );

    let funcSetImageBackground = this.generateFunction(
      "setImageBackground",
      [],
      funcSetImageBackgroundContent
    );
    // Generating the functions of the pedal.
    let funcProperties = this.generateFunction(
      "get properties",
      [],
      funcPropertiesContent
    );
    let functionGetObservedAttributes = this.generateFunction(
      "static get observedAttributes",
      [],
      funcGetObservedAttributes
    );
    let functionAttributeChangedCallback = this.generateFunction(
      "attributeChangedCallback",
      [],
      funcAttributeChangedCallbackContent
    );
    let functionSetResources = this.generateFunction(
      "setResources",
      [],
      funcSetResources
    );
    let funcSetInactive = this.generateFunction(
      "setInactive",
      [],
      funcSetInactiveContent
    );
    let function1 = this.generateFunction("setKnobs", [], function1Content);
    // STOP USING IT
    let function4 = this.generateFunction("bypass", [], funcBypassContent);
    let function5 = this.generateFunction(
      "reactivate",
      [],
      funcReactivateContent
    );
    let function6 = this.generateFunction(
      "setSwitchListener",
      [],
      funcSwitchListenerContent
    );
    let funcSetSliders = this.generateFunction(
      "setSliders",
      [],
      funcSetSlidersContent
    );

    let funcSetSwitches = this.generateFunction(
      "setSwitches",
      [],
      funcSetSwitchesContent
    );
    // The class will contain the constructor and th methods/functions.
    classContent +=
      constructor +
      funcFixRelativeImagePathsInCSS +
      funcSetImageBackground +
      functionAttributeChangedCallback +
      funcProperties +
      functionGetObservedAttributes +
      functionSetResources +
      function1 +
      //function4 +
      function6 +
      //function5 +
      funcSetSliders +
      funcSetSwitches +
      funcSetInactive;

    functionalPedalCode += "<script>";

    functionalPedalCode += `
        let ${this.editablePedal.name}Temp = document.currentScript.ownerDocument.querySelector('template');
        `;
    // Generating and appending the class of the pedal.
    functionalPedalCode += this.generateClass(
      this.editablePedal.name + "Gui",
      classContent
    );
    // Custom element export statement.
    functionalPedalCode += `
                try {
                    customElements.define('wap-${this.editablePedal.name.toLowerCase()}', ${
      this.editablePedal.name
    }Gui);
                    console.log("Element defined");
                } catch(error){
                    console.log(error);
                    console.log("Element already defined");      
                }
                
                create${this.editablePedal.name}GUI = (plug) => {
                    let elem = new ${this.editablePedal.name}Gui(plug);
                    return elem; 
                }
        `;
    functionalPedalCode += "</script>";
    return functionalPedalCode;
  }
  /**
   * Generates the template of the functional pedal.
   */
  generateFunctionalPedalTemplate() {
    let template = "";
    template += "<template>";
    template += this.generateFunctionalPedalStyle();
    template += this.generateFunctionalPedalHtml();
    template += "</template>";
    return template;
  }
  /**
   * Generate the style of the functional pedal.
   */
  generateFunctionalPedalStyle() {
    let style = this.editablePedal.getStyle();
    return style.outerHTML;
  }
  /**
   * Generate the html of the functional pedal.
   */
  generateFunctionalPedalHtml() {
    this.setWebAudioControlsIds();
    let html = this.editablePedal.getHtml();

    return html.outerHTML;
  }
  generateFunction(name, params, content) {
    // The return value of the function.
    let ret;

    let formattedParams = "";
    for (let param of params) {
      formattedParams += param;
    }

    ret = `
            ${name}(${formattedParams}) {
               ${content}
            }
        `;
    return ret;
  }
  /**
   * Generates a class extending 'HTMLElement'.
   * @param {*} name The name of the class.
   * @param {*} content The content of the class.
   */
  generateClass(name, content) {
    let ret = "";
    ret += "class " + name + " extends HTMLElement {";
    ret += content;
    ret += "}";
    return ret;
  }
  generateSetKnobs() {
    let ret = "";

    for (let knob of this.editablePedal.knobs) {
      ret +=
        'this._root.getElementById("' +
        knob.address +
        '").addEventListener("input", (e) =>' +
        'this._plug.setParam("' +
        knob.address +
        '", e.target.value));';
      ret += "\n";
    }
    return ret;
  }
  generateSetSliders() {
    let ret = "";

    for (let slider of this.editablePedal.sliders) {
      ret +=
        'this._root.getElementById("' +
        slider.address +
        '").addEventListener("input", (e) =>' +
        'this._plug.setParam("' +
        slider.address +
        '", e.target.value));';
      ret += "\n";
    }
    return ret;
  }

  generateSetSwitches() {
    let ret = "";

    for (let sw of this.editablePedal.switches) {
      ret +=
        'this._root.getElementById("' +
        sw.address +
        '").addEventListener("change", (e) =>' +
        'this._plug.setParam("' +
        sw.address +
        '", 1-e.target.value));';
      ret += "\n";
    }
    return ret;
  }
  
  setWebAudioControlsIds() {
    for (let knob of this.editablePedal.shadowRoot.childNodes[7].querySelectorAll(
      ".knob"
    )) {
      let id = knob.getAttribute("id");
      let waControlId = this.editablePedal.getElementById(id).address;
      knob.childNodes[0].setAttribute("id", waControlId);
    }
    for (let slider of this.editablePedal.shadowRoot.childNodes[7].querySelectorAll(
      ".slider"
    )) {
      let id = slider.getAttribute("id");
      let waControlId = this.editablePedal.getElementById(id).address;
      slider.childNodes[0].setAttribute("id", waControlId);
    }

    /*
    let waControl = this.editablePedal.shadowRoot.childNodes[3].querySelector(
      ".switch"
    );
    if (waControl) waControl.childNodes[0].setAttribute("id", "switch1");
    else console.log("functionalPedalGenerator waControl = null");
    */

    for (let sw of this.editablePedal.shadowRoot.childNodes[7].querySelectorAll(
      ".switch"
    )) {
      let id = sw.getAttribute("id");
      let waControlId = this.editablePedal.getElementById(id).address;
      sw.childNodes[0].setAttribute("id", waControlId);
    }
  }
}
