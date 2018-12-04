(function (window, document, undefined) {

    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('template');
    
    const PREVIEW_SELECTED_EVENT = "previewSelected";
    
    class PedalElemPreviews extends HTMLElement {

        
        static get observedAttributes() {
            return ['url', 'pedal-element-type'];
        }
        
        constructor() {
            super();
            
            this.root = this.attachShadow({mode: 'closed'});
            
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);
            
            this.previews = [];

            this.fetchPreviews();
        }

        fetchPreviews() {
            fetch(this.getAttribute('url'))
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.previews = data;
                    this.setUpPreviews();
                })
                .catch(err => {
                    console.error('Error fetching preview image names: ' + err);
                });

        }

        setUpPreviews() {
            for(let previewFile of this.previews.files) {
                let previewElem = document.createElement('img');
                previewElem.className = 'menu-img';
                previewElem.id = 'preview';
                previewElem.src = this.previews.filesUrl + previewFile
                previewElem.alt = previewFile;
                
                previewElem.onclick = (e) => {
                    let detail = {
                        type: this.getAttribute('pedal-element-type'),
                        fileName: e.target.alt
                    };

                    let event = new CustomEvent('preview-selected', {detail: detail});
                    this.dispatchEvent(event);
                }

                this.root.appendChild(previewElem);
            }
        }

    }


    window.customElements.define('pedal-elem-previews', PedalElemPreviews);

})(window, document)