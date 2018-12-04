(function (window, document, undefined) {

    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('template');
        
    class EditorFaust extends HTMLElement {

        
        static get observedAttributes() {
            return [];
        }
        
        constructor() {
            super();
            
            this.root = this.attachShadow({mode: 'closed'});
            
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);
            
            this.faustParser = new FaustParser();

            this.faustCodeBox = this.root.querySelector('#faust-code-box');

            this.setUpListeners();
        }

        setUpListeners() {
            this.root.querySelector('#validate').addEventListener('click', () => {
                this.faustParser.extractElements(this.faustCodeBox.value);
            });
        }

    }


    window.customElements.define('editor-faust', EditorFaust);

})(window, document)