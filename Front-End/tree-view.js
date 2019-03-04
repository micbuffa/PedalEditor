'use strict';

(function () {
  class TreeView extends HTMLElement {
    constructor() {
      super();

      // binding methods
      this.addListItem = this.addListItem.bind(this);

      // attaches shadow tree and returns shadow root reference
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the tree-view component
      this.container = document.createElement('ul');

      // adding a class to our container for the sake of clarity
      this.container.classList.add('tree-view');

      const style = document.createElement('style');
      style.textContent = `
        /* Remove default bullets */
        ul, .tree-view {
          list-style-type: none;
        }

        /* Remove margins and padding from the parent ul */
        .tree-view {
          margin: 0;
          padding: 0;
        }
        
        /* Style the caret/arrow */
        .caret {
          cursor: pointer; 
          user-select: none; /* Prevent text selection */
        }
        
        /* Create the caret/arrow with a unicode, and style it */
        .caret::before {
          content: "\\25B6";
          color: black;
          display: inline-block;
          margin-right: 6px;
        }
        
        /* Rotate the caret/arrow icon when clicked on (using JavaScript) */
        .caret-down::before {
          transform: rotate(90deg); 
        }
        
        /* Hide the nested list */
        .nested {
          display: none;
          padding-left: 25px;
        }
        
        /* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
        .active {
          display: block;
        }
        .active > li  {
          display: flex;
        }
        .active > li > label {
          margin-right: 5px;
        }
        .active > li > :not(label) {
          width: 100%;
          margin: 3px;
        }
      `;

      this.container.appendChild(style);

      // appending the container to the shadow DOM
      shadow.appendChild(this.container);
    }

    static get observedAttributes() {
      return ['data'];
    }

    get treeData() {
      const data = this.getAttribute('data');
      return data ? JSON.parse(data) : [];
    }

    connectedCallback() {
      console.log('data : ', this.treeData)
      this.addListItem(this.treeData);
    }

    addListItem(treeData) {
      treeData.map(item => {
        //
        const li = document.createElement('li');
        const caret = document.createElement('span');
        const nested = document.createElement('ul');

        //
        caret.classList.add(['caret']);
        nested.classList.add(['nested']);

        //
        caret.textContent = item.title;
        caret.addEventListener("click", () => {
          nested.classList.toggle("active");
          caret.classList.toggle("caret-down");
        });
        item.children.forEach(child => {
          const childContainer = document.createElement('li');

          // Label
          const childLabel = document.createElement('label');
          childLabel.textContent = child.label;

          // Element
          const childElement = document.createElement(child.type);
          if (child.props) {
            for (let prop of Object.entries(child.props)) {
              const name = prop[0];
              const value = prop[1];
              childElement.setAttribute(name, value);
            }
          }

          childContainer.appendChild(childLabel);
          childContainer.appendChild(childElement);

          nested.appendChild(childContainer);
        })

        //
        li.appendChild(caret);
        li.appendChild(nested);

        this.container.appendChild(li);
      });
    }
  }

  // let the browser know about the custom element
  customElements.define('tree-view', TreeView);
})();