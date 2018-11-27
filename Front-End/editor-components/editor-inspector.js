(function (window, document, undefined) {

    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('#pedal-details');

    class EditorInspector extends HTMLElement {

        constructor() {
            super();

            this.root = this.attachShadow({ mode: 'closed' });
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);

        }

        setEditablePedal(editablePedal) {
            this.editablePedal = editablePedal;
            this.setInputListeners();

            this.editablePedal.addEventListener('config-changed', (e) => {
                this.enableInputs();
                this.refreshInputs();
            });
        }

        refreshInputs() {
            
            for (let inputElem of this.root.querySelectorAll('input')) {
                inputElem.setAttribute('value', this.editablePedal.getSelectedElement()[inputElem.name]);
            }
        }

        setInputListeners() {
            // For main inputs
            for (let inputElem of this.root.querySelectorAll('input')) {
                inputElem.addEventListener('keyup', (event) => {
                    this.editablePedal.setSelectedElementAttribute(event.target.name, event.target.value);
                });
            }

            // For selections
            for (let backgroundImageElem of this.root.querySelectorAll('select')) {
                backgroundImageElem.addEventListener('change', (event) => {
                    this.editablePedal.setSelectedElementAttribute(event.target.name, event.target.value);
                })
            }
        }

        enableInputs() {
            for (let inputElem of this.root.querySelectorAll('input')) {
                inputElem.disabled = false;
            }

            for (let inputElem of this.root.querySelectorAll('select')) {
                inputElem.disabled = false;
            }
        }

    }

    window.customElements.define('editor-inspector', EditorInspector);
})(window, document);