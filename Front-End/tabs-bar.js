'use strict';

(function () {
  class TabsBar extends HTMLElement {
    constructor() {
      super();
      // attaches shadow tree and returns shadow root reference
      const shadow = this.attachShadow({ mode: 'open' });
      // creating a container for the tree-view component
      this.container = document.createElement('div');
      // adding a class to our container for the sake of clarity
      this.container.classList.add('tabs-bar');

      const template = document.createElement('template');
      const style = document.createElement('style');

      template.appendChild(style);
      template.innerHTML = `
        <div class="tabbar-item selected" onclick="selectTabBar(this)">
            <div class="tab-bar-btn">
              <span>
                <slot name="label">*Need a label</slot>
              </span>
            </div>
            <div class="tab-bar-content">
              <div class="tree-pane">
                <slot name="content">NEED CONTENT</slot>
              </div>
					</div>
				</div>
      `;


      style.textContent = `

      `;
      this.container.appendChild(template.content);

      // appending the container to the shadow DOM
      shadow.appendChild(this.container);
    }

    connectedCallback() {
      const container = this.shadowRoot.querySelector('.tabbar-item');

      container.addEventListener("click", event => {
        event.parentNode.querySelector(".tabbar-item.selected").classList.remove("selected");
        event.classList.add("selected");
      });
    }
  }

  // let the browser know about the custom element
  customElements.define('tabs-bar', TabsBar);
})();