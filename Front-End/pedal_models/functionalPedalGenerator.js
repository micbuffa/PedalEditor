/**
 * Generates the code of the functional pedal from the editable pedal.
 */
class FunctionalPedalGenerator {
    
    constructor(editablePedal) {
        this.editablePedal = editablePedal;

        console.log(this.generateFunctionalPedalCode());
    }

    /** 
     * Generates the code of the functional pedal which will be used on the pedal board. 
     */
    generateFunctionalPedalCode() {
        // The complete content of the functional pedal file.
        let functionalPedalCode = '';

        // The content of the generated class.
        let classContent = `
    
        `;

        // The content of the constructor of the class.
        let constructorContent = `
            super();
            this.plug = plug;
        `;

        // The content of the first function of the class.
        let function2Content = `
            this.plug = plug;
            this.plug.setDrive(this.shadowRoot.querySelector('.knob').childNodes[0].getAttribute('value') * 150 / 100);
        `;

        // The content of the second function of the class.
        let function1Content = `
            this.shadowRoot.querySelector('.knob').childNodes[0].addEventListener('input', (e) => {
                this.plug.setDrive((e.target.value / 100) * 150);
            });
        `;

        let connectedCallbackContent = `
            var shadowRoot = this.attachShadow({mode:'open'});
        
            var clone = thatDoc.importNode( template.content, true );
            shadowRoot.appendChild(clone);
            this.setKnobs();
        `;

        
        // Generating and appending the template of the pedal.
        functionalPedalCode += this.generateFunctionalPedalTemplate();

        // Generating the constructor of the pedal.
        let constructor = this.generateFunction('constructor', ['plug'], constructorContent);

        // Generating the functions of the pedal.
        let function1 = this.generateFunction('setKnobs', [], function1Content);
        let function2 = this.generateFunction('setPlug', ['plug'], function2Content);
        let connectedCallback = this.generateFunction('connectedCallback', [], connectedCallbackContent);

        // The class will contain the constructor and the two functions.
        classContent += constructor + function1 + function2 + connectedCallback;

        functionalPedalCode += '<script>';

        functionalPedalCode += `
            var thatDoc = document;
            
            var thisDoc = (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;
            
            var template = thisDoc.querySelector( 'template' );
            
            
            if (window.ShadowDOMPolyfill) {
                WebComponents.ShadowCSS.shimStyling(template.content, 'pedal');
            }
        `;

        // Generating and appending the class of the pedal.
        functionalPedalCode += this.generateClass('FunctionalPedal', classContent);

        // Custom element export statement.
        functionalPedalCode += '\nwindow.customElements.define("functional-pedal", FunctionalPedal);\n';
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