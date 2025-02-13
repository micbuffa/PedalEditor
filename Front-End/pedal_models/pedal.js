(function(window, document, undefined) {
  // Refers to the "importer", which is index.html
  var thatDoc = document;

  // Refers to the "importee", which is vimeo-embed.html
  var thisDoc = (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;

  // Gets content from <template>.
  var template = thisDoc.querySelector("template");

  // Shim Shadow DOM styles if needed
  if (window.ShadowDOMPolyfill) {
    WebComponents.ShadowCSS.shimStyling(template.content, "pedal");
  }

  let BACKGROUND_IMAGES_URL = "../../Back-End/img/background/";

  //let ASSETS_PATH = 'https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay2Amine/img';

  // Use when server down.
  let ASSETS_PATH = "./img";

  class Pedal extends HTMLElement {
    static get observedAttributes() {
      return [
        "color",
        "width",
        "height",
        "radius",
        "background-image",
        "opacity"
      ];
    }

    constructor(wi) {
      super();
      this.knobs = [];
      this.icons = [];
      this.switches = [];
      this.sliders = [];
      this.labels = [];
      this.backgroundImageSrc = BACKGROUND_IMAGES_URL + "blue.jpg";
      this.selectedElement = null;
      this.pedalId = null;
      this.name = null;
      this.configChangedEvent = new CustomEvent("config-changed");
      this.ASSETS_PATH = ASSETS_PATH;
    }

    getAttributes() {
      return [
        "color",
        "width",
        "height",
        "radius",
        "background-image",
        "opacity",
        "name"
      ];
    }

    /********************************* Add Pedal Elements Config ************************************/

    addElement(type, filename, id) {
      return this.pedalElementManager.addElement(type, filename, id);
    }

    getElementById(id) {
      for (let elem of this.getElements()) {
        if (elem.id == id) {
          return elem;
        }
      }

      return null;
    }

    /********************************* Deleting Pedal Elements ************************************/

    deleteSelectedElement() {
      this.pedalElementManager.deleteElement(this.selectedElement.id);
      this.selectedElement = null;
    }

    getElements() {
      return this.knobs.concat(
        this.icons.concat(
          this.switches.concat(this.sliders.concat(this.labels))
        )
      );
    }

    getElementsTypes() {
      return ["knob", "icon", "switch", "slider", "label"];
    }

    getKnobs() {
      return this.knobs;
    }

    getIcons() {
      return this.icons;
    }

    setBackgroundImage(imageName) {
      if (imageName) {
        this.backgroundImageSrc = imageName;
        let backgroundImageElem = this.shadowRoot.querySelector(
          "#background-image"
        );
        backgroundImageElem.setAttribute(
          "src",
          ASSETS_PATH + "/background/" + imageName
        );
        this.backgroundImageName = imageName;
      }
    }

    getBackgroundImageName() {
      return this.backgroundImageName;
    }

    setBackgroundImagebysrc(src) {
      let backgroundImageElem = this.shadowRoot.querySelector(
        "#background-image"
      );
      backgroundImageElem.setAttribute("src", src);
    }

    setSrc(src) {
      this.src = src;
    }

    setSelectedElementAttribute(key, value) {
      this.selectedElement[key] = value;
      this.updateStyle_();
    }

    connectedCallback() {
      var shadowRoot = this.attachShadow({ mode: "open" });

      var clone = thatDoc.importNode(template.content, true);
      shadowRoot.appendChild(clone);

      this.pedalElementManager = new PedalElementManager(this, thatDoc);

      this.updateStyle(this);
    }

    updateStyle_() {
      this.updateStyle(this);
    }

    getSelectedElement() {
      return this.selectedElement;
    }

    selectElement(elementId) {
      for (let knob of this.knobs) {
        if (knob.id === elementId) {
          this.selectedElement = knob;
        }
      }

      for (let icon of this.icons) {
        if (icon.id === elementId) {
          this.selectedElement = icon;
        }
      }

      for (let s of this.switches) {
        if (s.id === elementId) {
          this.selectedElement = s;
        }
      }

      for (let slider of this.sliders) {
        if (slider.id === elementId) {
          this.selectedElement = slider;
        }
      }
      for (let label of this.labels) {
        if (label.id === elementId) {
          this.selectedElement = label;
        }
      }

      this.highlightElement(elementId);

      this.updateStyle(this);
      this.dispatchEvent(this.configChangedEvent);
    }

    highlightElement(elementId) {
      var shadow = this.shadowRoot;

      for (let i = 0; i < this.knobs.length; i++) {
        let knob = shadow.querySelectorAll(".knob")[i];
        knob.className = knob.className.replace("selected", "");
      }

      for (let i = 0; i < this.icons.length; i++) {
        let icon = shadow.querySelectorAll(".icon")[i];
        icon.className = icon.className.replace("selected", "");
      }

      for (let i = 0; i < this.switches.length; i++) {
        let s = shadow.querySelectorAll(".switch")[i];
        s.className = s.className.replace("selected", "");
      }

      for (let i = 0; i < this.sliders.length; i++) {
        let slider = shadow.querySelectorAll(".slider")[i];
        slider.className = slider.className.replace("selected", "");
      }
      for (let i = 0; i < this.labels.length; i++) {
        let label = shadow.querySelectorAll(".label")[i];
        label.className = label.className.replace("selected", "");
      }

      let selectedElement = shadow.querySelector("#" + elementId);
      selectedElement.className += " selected";
    }

    generateStyle(functional) {
      let nonFuncitonalPedalStyle = `
                        .pedal{
                            display: block;
                            background-color: ${this.getAttribute("color")};
                            width: ${this.getAttribute("width")}px;
                            height: ${this.getAttribute("height")}px;
                            border-radius: ${this.getAttribute("radius")}px;
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            /* bring your own prefixes */
                            /* transform: translate(-50%, -50%); */
                        }`;

      let functionalPedalStyle = `
                        .pedal{
                            display: block;
                            background-color: ${this.getAttribute("color")};
                            width: ${this.getAttribute("width")}px;
                            height: ${this.getAttribute("height")}px;
                            border-radius: ${this.getAttribute("radius")}px;
                            position: relative;
                            /* bring your own prefixes */
                            /* transform: translate(-50%, -50%); */
                        }
            `;

      return `	${functional ? functionalPedalStyle : nonFuncitonalPedalStyle}
                        
                        #background-image {
                            //border: solid 2px black;
                            width: ${this.getAttribute("width")}px;
                            height: ${this.getAttribute("height")}px;
                            opacity: ${this.getAttribute("opacity")};
                            /* display: none; */
                            //visibility: hidden;
                        }

                        /* .img-bck img[src=""] {
                            display: none;
                        } */

                        /* #resize {
                            position: absolute;
                            cursor: nwse-resize;
                            width: 10px;
                            height: 10px;
                            left: ${this.getAttribute("width") - 8}px;
                            top: ${this.getAttribute("height") - 8}px;
                            border: 1px solid black;
                        } */

                        .knob, .switch, .icon, .label, .slider {
                            position: absolute;
                            cursor: pointer;
                            text-align: center;
                        }

                        .container {
                            position: relative;
                            /* font-family: Arial; */
                          }
                          
                        .text-block {
                            position: absolute;
                            bottom: 20px;
                            right: 20px;
                            background-color: ${this.getAttribute("color")};
                            color: white;
                            padding-left: 20px;
                            padding-right: 20px;
                        }

                        /* .text-block :not(.tititi) {
                            opacity : 0;
                        } */

                        .draggable {
                            touch-action: none;
                            user-select: none;
                        }

                          #canvas {
                            width:100px;
                            height:300px;
                            border: 10px solid;
                        }
                        .rectangle {
                            border: 1px solid #FF0000;
                            position: absolute;
                        }

                        .selected {
                            border: 1px dashed black;
                            cursor: move;
                        }

                        .selected:hover {
                            /* border: 1px dashed black; */
                            cursor: move;
                        }

                        .selected  webaudio-knob{
                            cursor: move;
                        }

                        .selected  webaudio-switch{
                            cursor: move;
                        }

                        .selected  span{
                            cursor: move;
                        }

                        .selected:hover  span{
                            cursor: move;
                        }

                        .selected  webaudio-slider{
                            cursor: move;
                        }

                        .selected:hover webaudio-knob{
                            cursor: move;
                        }

                        .selected:hover webaudio-switch{
                            cursor: move;
                        }
                        
                        .selected:hover webaudio-slider{
                            cursor: move;
                        }


                        #switch1 {
                            bottom: 10px;
                            right: 0px;
                        }
                        ${this.generateElementsStyles()}
                        
                        .pedalLabel{
                            position: absolute;
                            /* top: 225px; */
                            font-size: ${window
                              .getComputedStyle(
                                this.shadowRoot.getElementById("test")
                              )
                              .getPropertyValue("font-size")}px;
                            font-family: ${window
                              .getComputedStyle(
                                this.shadowRoot.getElementById("test")
                              )
                              .getPropertyValue(
                                "font-family"
                              )};/*Sansita;*//*{font}*/
                            text-align: center;
                            line-height: 30px;/*{pedalfontsize}*/
                            width: 150px;
                            color: #6B0000;/*{fontcolor}*/
                        }
                        .knob-label{
                            position: absolute;
                            font-size: 12px;/*{knobfontsize}*/
                            line-height: 12px;
                            width:64px;
                            max-width:64px;
                            overflow: hidden;
                            text-align: center;
                            font-family: Sansita;/*{font}*/
                            color: #6B0000;/*{fontcolor}*/
                        }
                        #knob1-label{
                            top: 84px;
                            left: 43px;
                        }`;
    }

    updateStyle(elem) {
      var shadow = elem.shadowRoot;
      var childNodes = shadow.childNodes;

      for (var childNode of childNodes) {
        if (childNode.nodeName === "STYLE") {
          childNode.textContent = this.generateStyle(false);
        }
      }
    }

    generateElementsStyles() {
      let ret = "";
      for (let knob of this.knobs) {
        ret += `
                    #${knob.id} {
                        left: ${knob.x}px;
                        top: ${knob.y}px;
                    }

                    #${knob.id} div {
                        color: #${knob.label_color};
                        font-family: "${knob.label_fontfamily}";
                        font-size: ${knob.label_fontsize}px;
                        
                    }
                `;

        let knobContainer = this.shadowRoot.getElementById(knob.id);
        if (knobContainer) {
          knobContainer.innerHTML = "";

          var knobElem = thatDoc.createElement("webaudio-knob");
          knobElem.src = ASSETS_PATH + "/knobs/" + knob.model;
          knobElem.setAttribute("src", ASSETS_PATH + "/knobs/" + knob.model);
          knobElem.setAttribute("height", knob.height);
          knobElem.setAttribute("width", knob.width);
          knobElem.setAttribute("sprites", 100);
          knobElem.setAttribute("min", knob.min);
          knobElem.setAttribute("max", knob.max);
          knobElem.setAttribute("step", knob.step);

          // calculated automatically
          //knobElem.setAttribute('step', 1);
          //knobElem.setAttribute('step', knob.step);
          console.log("pedal.js KNOB STEP = " + knob.step);
          knobElem.value = knob.value;
          knobElem.setAttribute("value", knob.value);

          knobContainer.appendChild(knobElem);

          let labelElem = thatDoc.createElement("div");
          labelElem.innerHTML = knob.label;
          labelElem.setAttribute("style", "text-align:center");
          knobContainer.appendChild(labelElem);
        }
      }

      for (let s of this.switches) {
        ret += `
                    #${s.id} {
                        left: ${s.x}px;
                        top: ${s.y}px;
                    }

                    #${s.id} div {
                        color: #${s.label_color};
                        font-family: "${s.label_fontfamily}";
                        font-size: ${s.label_fontsize}px;
                        
                    }
                `;
        let switchContainer = this.shadowRoot.getElementById(s.id);
        if (switchContainer) {
          switchContainer.innerHTML = "";

          var switchElem = thatDoc.createElement("webaudio-switch");
          switchElem.setAttribute("src", ASSETS_PATH + "/switches/" + s.model);

          switchElem.setAttribute("height", s.height);
          switchElem.setAttribute("width", s.width);

          switchContainer.appendChild(switchElem);

          let labelElem = thatDoc.createElement("div");
          labelElem.innerHTML = s.label;
          switchContainer.appendChild(labelElem);
        }
      }

      for (let slider of this.sliders) {
        ret += `
                    #${slider.id} {
                        left: ${slider.x}px;
                        top: ${slider.y}px;
                    }

                    #${slider.id} div {
                        color: #${slider.label_color};
                        font-family: "${slider.label_fontfamily}";
                        font-size: ${slider.label_fontsize}px;
                        
                    }
                `;
        let sliderContainer = this.shadowRoot.getElementById(slider.id);

        if (sliderContainer) {
          let sliderElem = thatDoc.createElement("webaudio-slider");
          sliderContainer.innerHTML = "";
          sliderElem.setAttribute("value", slider.value);
          sliderElem.setAttribute("height", slider.height);
          sliderElem.setAttribute("width", slider.width);
          sliderElem.setAttribute("max", slider.max);
          sliderElem.setAttribute("min", slider.min);
          sliderElem.setAttribute("step", slider.step);
          console.log("pedal.js SLIDER STEP = " + slider.step);

          sliderElem.src = ASSETS_PATH + "/sliders/" + slider.model;
          sliderElem.setAttribute(
            "src",
            ASSETS_PATH + "/sliders/" + slider.model
          );
          sliderElem.setAttribute(
            "knobsrc",
            ASSETS_PATH + "/sliders/sliderKnob.png"
          );

          sliderContainer.appendChild(sliderElem);

          let labelElem = thatDoc.createElement("div");
          labelElem.innerHTML = slider.label;
          sliderContainer.appendChild(labelElem);
        }
      }

      for (let icon of this.icons) {
        ret += `
                        #${icon.id} {
                            left: ${icon.x}px;
                            top: ${icon.y}px;
                            width: ${icon.width}px;
                            height: ${icon.height}px;
                        }
                    `;
      }

      for (let label of this.labels) {
        ret += `
                #${label.id} {
                            left: ${label.x}px;
                            top: ${label.y}px;
                            color: #${label.label_color};
                            font-family: "${label.label_fontfamily}";
                            font-size: ${label.label_fontsize}px;
                        }

                `;
        let labelContainer = this.shadowRoot.querySelector("#" + label.id);
        labelContainer.innerHTML = label.label;
      }

      return ret;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.updateStyle(this);
    }

    /**
     ** Loads and sets the configuration of the pedal from a json file.
     */
    loadConfig(config) {
      this.pedalId = config.id;
      this.name = config.name;

      // Removing the old knobs
      for (let knob of this.knobs) {
        this.removeKnobDom(knob.id);
      }
      this.knobs = [];

      // ATTENTION MICHEL BUFFA : why do all loops for each element. One loop is enought !!!
      // AMINE: Je crois que je l'avais fait car j'avais une limitation don't je ne me rappelles plus.
      // Pour l'instant je garde les boucles pour éviter de casser quoi que ce soit puis on essaiera de réfactorer.
      for (let element of config.elements) {
        if (element.type === "icon") {
          let icon = this.addElement("icon", element.file);
          icon.x = element.x;
          icon.y = element.y;
          icon.width = element.width;
          icon.height = element.height;
          icon.file = element.file;
          icon.type = element.type;
        }
      }

      for (let element of config.elements) {
        console.log(
          "loadConfig: element.type = " +
            element.type +
            " element.label=" +
            element.label
        );
        if (element.type == "knob") {
          let knob = this.addElement("knob", null, element.label);
          // added to match with the elements generated by fetching wap
          // MICHEL BUFFA : Bug when label contains spaces. This is not valid for HTML ids !!!
          // Also, removing spaces here breaks other parts... need investigation !
          knob.id = element.label;
          knob.x = element.x;
          knob.y = element.y;
          knob.min = element.min ? element.min : 0;
          knob.max = element.max ? element.max : 100;
          knob.step = element.step ? element.step : 1;
          console.log(
            "LoadConfig: label = " + knob.id + " step = " + knob.step
          );
          knob.width = element.width;
          knob.height = element.height;
          knob.model = element.model;
          knob.value = element.value;
          knob.label = element.label;
          knob.label_fontfamily = element.label_fontfamily;
          knob.label_fontsize = element.label_fontsize;
          knob.label_color = element.label_color;
          knob.type = element.type;
          knob.address = element.address;
        }
        //console.log("KNOB STEP = " + element.step)
      }

      for (let element of config.elements) {
        if (element.type == "switch") {
          let switch_ = this.addElement("switch", null, element.id);
          switch_.id = element.id;
          switch_.x = element.x;
          switch_.y = element.y;
          switch_.width = element.width;
          switch_.height = element.height;
          switch_.label = element.label;
          switch_.label_fontfamily = element.label_fontfamily;
          switch_.label_fontsize = element.label_fontsize;
          switch_.label_color = element.label_color;
          switch_.type = element.type;
          switch_.address = element.address;
        }
      }

      for (let element of config.elements) {
        if (element.type == "slider") {
          let slider = this.addElement("slider", null, element.id);
          slider.id = element.id;
          slider.x = element.x;
          slider.y = element.y;
          slider.width = element.width;
          slider.height = element.height;
          slider.label = element.label;
          slider.label_fontfamily = element.label_fontfamily;
          slider.label_fontsize = element.label_fontsize;
          slider.label_color = element.label_color;
          slider.type = element.type;
          slider.min = element.min ? element.min : 0;
          slider.max = element.max ? element.max : 100;
          slider.step = element.step ? element.step : 1;
          slider.value = element.value;
          slider.address = element.address;
          console.log(
            "loadConfig SLIDER " + slider.label + " STEP = " + element.step
          );
        }
      }

      if (config.name) {
        for (let element of config.elements) {
          if (element.type == "label") {
            let label = this.addElement("label", config.name);
            label.label = element.label;
            label.x = element.x;
            label.y = element.y;
            label.label_fontfamily = element.label_fontfamily;
            label.label_fontsize = element.label_fontsize;
            label.label_color = element.label_color;
            label.type = element.type;
          }
        }
      }

      this.setAttribute("width", config.width);
      this.setAttribute("color", config.color);
      this.setAttribute("height", config.height);
      this.setAttribute("radius", config.radius);
      this.setAttribute("name", config.name);
      this.setAttribute("opacity", config.opacity || 1); // If the opacity is not set, initialize it to the default value which is 1.

      this.setBackgroundImage(config.backgroundImageSrc);
    }

    removeKnobDom(knobId) {
      let knobElem = this.shadowRoot.querySelector("#" + knobId);
      knobElem.remove();
    }

    getConfig() {
      let config = {
        id: this.pedalId,
        name: this.getAttribute("name"),
        backgroundImageSrc: this.backgroundImageSrc,
        color: this.getAttribute("color"),
        width: this.getAttribute("width"),
        height: this.getAttribute("height"),
        radius: this.getAttribute("radius"),
        opacity: this.getAttribute("opacity"),
        elements: []
      };

      for (let knob of this.knobs) {
        config.elements.push(knob);
      }

      for (let icon of this.icons) {
        config.elements.push(icon);
      }

      for (let label of this.labels) {
        config.elements.push(label);
      }

      for (let switch_ of this.switches) {
        config.elements.push(switch_);
      }

      for (let slider of this.sliders) {
        config.elements.push(slider);
      }

      return config;
    }

    /*
     * Generates the code of the functional pedal.
     */
    generateCodeFunctionalPedal() {
      //console.log(this.getFunctionPedalTemplate());
    }

    /*
     * Gets the style content of the function pedal.
     */
    getStyle() {
      let style = this.shadowRoot.childNodes[1].cloneNode(true);
      style.innerHTML = this.generateStyle(true);
      return style;
    }

    /*
     * Gets the html content of the function pedal.
     */
    getHtml() {
      let html = this.shadowRoot.childNodes[7].cloneNode(true);

      for (let elem of html.querySelectorAll("webaudio-knob")) {
        elem.innerHTML = "";
      }

      for (let elem of html.querySelectorAll("webaudio-switch")) {
        elem.innerHTML = "";
      }

      for (let elem of html.querySelectorAll("webaudio-slider")) {
        elem.innerHTML = "";
      }

      for (let elem of html.querySelectorAll(".knob")) {
        elem.className = elem.className.replace("selected", "");
        for (let knob of this.knobs) {
          if (elem.id == knob.id) {
            let knobElem = elem.childNodes[0];
          }
        }
      }

      return html;
    }

    setParam(name, value) {
      this.setAttribute(name, value);
    }
  }

  window.customElements.define("my-pedal", Pedal);
})(window, document);
