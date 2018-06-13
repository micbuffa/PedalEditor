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
        let functionalPedalCode = '';

        // The content of the generated class.
        let classContent = `
    
        `;

        // The content of the constructor of the class.
        let constructorContent = `
            super();
            this._plug = plug;
            this._root = this.attachShadow({ mode: 'open' });
            this._root.appendChild(pedal.content.cloneNode(true));
            this.isOn;
            this.setKnobs();
            this.setActive(false);
            this.setSwitchListener();
        `;

        // The content of the first function of the class.
        let function2Content = `
           
        `;

        // The content of the second function of the class.
        let function1Content = `
           
        `;


        
        // Generating and appending the template of the pedal.
        functionalPedalCode += this.generateFunctionalPedalTemplate();

        // Generating the constructor of the pedal.
        let constructor = this.generateFunction('constructor', ['plug'], constructorContent);

        // Generating the functions of the pedal.
        let function1 = this.generateFunction('setKnobs', [], function1Content);
        let function2 = this.generateFunction('setActive', ['active'], function2Content);
        let function3 = this.generateFunction('setSwitchListener', [], '');
        let function4 = this.generateFunction('bypass', [], function1Content);
        let function5 = this.generateFunction('reactivate', [], function1Content);


        // The class will contain the constructor and the two functions.
        classContent += constructor + function1 + function2 + function3 + function4 + function5;

        functionalPedalCode += '<script>';

        functionalPedalCode += `
        let pedal = document.currentScript.ownerDocument.querySelector('template');
        `;

        // Generating and appending the class of the pedal.
        functionalPedalCode += this.generateClass(this.editablePedal.name + 'Gui', classContent);

        // Custom element export statement.
        functionalPedalCode += '\nwindow.customElements.define("functional-pedal", ' + this.editablePedal.name + 'Gui);\n';
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