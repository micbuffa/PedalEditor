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
    generateFunctionalPedalCode() {
        // The complete content of the functional pedal file.
    let functionalPedalCode = `
            <script src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webcomponents-lite.js"></script>
            <script>
            WebAudioControlsOptions = {
                useMidi: 1,
            };
            </script>
            <script src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webaudio-controls.js"></script>
        `;

        /*let functionalPedalCode = `
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
                this.setSwitchListener();
                this.setResources();
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
            background.style = 'border-radius : ${this.editablePedal.getAttribute('radius')}px;'

            this._root.querySelectorAll(".knob").forEach((knob) => {
				knob.querySelector("webaudio-knob").setAttribute('src', this._plug.URL + '/assets/MiniMoog_Main.png');
            });
            
            this._root.querySelectorAll(".switch").forEach((s) => {
				s.querySelector("webaudio-switch").setAttribute('src', this._plug.URL + '/assets/switch_1.png');
            });
            
            
        `;

        // The content of the second function of the class.
        let function1Content = `
            for (var i = 0; i < this.knobs.length; i++) {
                this.eventToKnob(i);
            }
        `;

        let funcPropertiesContent = `
            this.boundingRect = {
                dataWidth: {
                type: Number,
                value: ${this.editablePedal.getAttribute('width')}
                },
                dataHeight: {
                type: Number,
                value: ${this.editablePedal.getAttribute('height')}
                }
          };
          return this.boundingRect;
        `;

        let funcSwitchListenerContent = `
            console.log("setswitch");
            this._root.querySelector(".switch").querySelector("webaudio-switch").addEventListener('change', (e) => {
                if (this.isOn) this.bypass()
                else this.reactivate();
                this.isOn = !this.isOn;
            });
        `

        let funcBypassContent = `
            this._plug.setParam("status", "disable");
        `
        let funcReactivateContent = `
            this._plug.setParam("status", "enable")
        `

        
        // Generating and appending the template of the pedal.
        functionalPedalCode += this.generateFunctionalPedalTemplate();

        // Generating the constructor of the pedal.
        let constructor = this.generateFunction('constructor', ['plug'], constructorContent);

        // Generating the functions of the pedal.
        let funcProperties = this.generateFunction('get properties', [], funcPropertiesContent);
        let functionGetObservedAttributes = this.generateFunction('static get observedAttributes', [], funcGetObservedAttributes);
        let functionAttributeChangedCallback = this.generateFunction('attributeChangedCallback', [], funcAttributeChangedCallback);
        let funcitonSetResources = this.generateFunction('setResources', [], funcSetResources);

        let function1 = this.generateFunction(
            'setKnobs', 
            [], 
            function1Content);
        
        let function4 = this.generateFunction('bypass', [], funcBypassContent);
        let function5 = this.generateFunction('reactivate', [], funcReactivateContent);
        let function6 = this.generateFunction('setSwitchListener', [], funcSwitchListenerContent);



        // The class will contain the constructor and the two functions.
        classContent += constructor + functionAttributeChangedCallback + funcProperties + functionGetObservedAttributes + funcitonSetResources + function1 + function4 + function6 + function5;

        functionalPedalCode += '<script>';

        functionalPedalCode += `
        let ${this.editablePedal.name}Temp = document.currentScript.ownerDocument.querySelector('template');
        `;

        // Generating and appending the class of the pedal.
        functionalPedalCode += this.generateClass(this.editablePedal.name + 'Gui', classContent);

        // Custom element export statement.
        functionalPedalCode += `
                try {
                    customElements.define('amine-${this.editablePedal.name.toLowerCase()}', ${this.editablePedal.name}Gui);
                    console.log("Element defined");
                } catch(error){
                    console.log(error);
                    console.log("Element already defined");      
                }
                
                create${this.editablePedal.name} = (plug) => {
                    let elem = new ${this.editablePedal.name}Gui(plug);
                    return elem; 
                }
        `
        functionalPedalCode += '</script>';

        return functionalPedalCode;
    }

     /**
      * Generates the template of the functional pedal.
      */
    generateFunctionalPedalTemplate() {
        let template = '';

        template += '<template>';
        template += this.generateFunctionalPedalStyle();
        template += this.generateFunctionalPedalHtml();
        template += '</template>';

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
        let html = this.editablePedal.getHtml();
        
        return html.outerHTML;
    }

    generateFunction(name, params, content) {
        // The return value of the function.
        let ret;
        
        let formattedParams = '';

        for(let param of params) {
            formattedParams += param;
        }
        
        ret = `
            ${name}(${formattedParams}) {
               ${content}
            }
        `

        return ret;
    }

    /**
     * Generates a class extending 'HTMLElement'.
     * @param {*} name The name of the class.
     * @param {*} content The content of the class.
     */
    generateClass(name, content) {
        let ret = '';
        ret += 'class ' + name + ' extends HTMLElement {';
        ret += content;
        ret += '}';

        return ret;
    }

}