
class PedalElementManager {
    constructor(pedal, document) {
        this.pedal = pedal;
        this.doc = document;
    }


    addElement(type, filename) {
        
        /* The configuration of the pedal element. */
        let pedalElementConfig = this.addElementConfigDefault(type, filename);
        
        /* The html container of the knob. */
        let pedalElementContainer = this.addElementHtml(pedalElementConfig);
        
        /* For the listeners. */
        var that = this;

        /* Drag and drop listener. */
        pedalElementContainer.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            e.preventDefault();
            that.dragAndDropElementListener(e, pedalElementConfig, that.pedal);
        }, true);
        
        /* Selection listener. */
        pedalElementContainer.addEventListener('click', function(e) {
            let knobId = e.target.parentElement.parentElement ? e.target.parentElement.parentElement.id : e.target.id;
            /*if(!knobId) {
                that.pedal.selectKnob(e.target.parentElement.id);
                return;
            } else */
            console.log(knobId);
            that.pedal.selectKnob(knobId);

        });
        

        this.pedal.selectKnob(pedalElementConfig.id);
        this.pedal.updateStyle(this.pedal)

        return pedalElementConfig;
    }

    /********************************* Add Pedal Elements Config ************************************/
    
    /* Creating and adding the default configuration of the pedal element by providing its type. */
    addElementConfigDefault(type, filename) {
        switch(type) {
            case 'switch':
                return this.addSwitchConfigDefault(filename);
            case 'knob':
                return this.addKnobConfigDefault(filename);
            case 'icon':
                return this.addIconConfigDefault(filename);
        }
    }
    

    /* Creating and adding the default configuration of the knob. */
    addKnobConfigDefault(filename) {
        var knob = {
            id: "knob_" + this.pedal.knobs.length,
            x: 43,
            y: 30,
            model: 'knob2.png',
            value: 20,
            label: 'knbo_' + this.pedal.knobs.length,
            label_fontfamily: 'Comic Sans MS',
            label_fontsize: '14',
            label_color: '000000',
            type: 'knob'
        };
        this.pedal.knobs.push(knob);

        return knob;
    }

    /* Creating and adding the default configuration of a switch. */
    addSwitchConfigDefault(filename) {
    }

    /* Creating and adding the default configuration of an icon. */
    addIconConfigDefault(filename) {
        var icon = {
            id: "icon_" + this.pedal.icons.length,
            x: 10,
            y: 10,
            width: 45,
            height: 45,
            file: filename,
            type: 'icon'
        };

        this.pedal.icons.push(icon);

        return icon;
    }

    /********************************* Add Pedal Elements Html ************************************/

    /* Creating and adding the html of the pedal element from its config. */
    addElementHtml(pedalElementConfig) {
        switch(pedalElementConfig.type) {
            case 'switch':
                return this.addSwitchHtml(pedalElementConfig);
            case 'knob':
                return this.addKnobHtml(pedalElementConfig);
            case 'icon':
                return this.addIconHtml(pedalElementConfig);
        }
    }
    

    /* Creating and adding the html of the knob from its config. */
    addKnobHtml(knobConfig) {
        var knobContainer = this.doc.createElement("div");
        knobContainer.setAttribute('class', 'knob');
        knobContainer.setAttribute('id', knobConfig.id);
        
        var knobElem = this.doc.createElement("webaudio-knob");
        knobElem.setAttribute('sprites', 100);
        knobElem.setAttribute('value', 0);
        knobElem.setAttribute('step', 1);
        knobElem.setAttribute('src', '../img/knobs/' + knobConfig.model);
        
        knobContainer.appendChild(knobElem);

        var label = this.doc.createElement('div');
        label.innerHTML = knobConfig.id;
        knobContainer.appendChild(label);
        
        this.pedal.shadowRoot.querySelector('.pedal').appendChild(knobContainer);

        return knobContainer;
    }
    
    /* Creating and adding the html of the switch from its config. */
    addSwitchHtml(switchConfig) {

    }

    /* Creating and adding the html of the icon from its config. */
    addIconHtml(iconConfig) {
        //var iconContainer = this.doc.createElement("div");
        //iconContainer.setAttribute('id', iconConfig.id);
        
        var iconImg = this.doc.createElement("img");
		iconImg.setAttribute('class', 'icon');
		iconImg.setAttribute('id', iconConfig.id);
        iconImg.setAttribute('src', '../img/icons/' + iconConfig.file);
        
        //iconContainer.appendChild(iconImg);
        this.pedal.shadowRoot.querySelector('.pedal').appendChild(iconImg);

        return iconImg;
    }
    
    /********************************* Pedal Elements Listeners ************************************/

    /* Listener for draging and droping the pedal element with the mouse. */
    dragAndDropElementListener(e, elem, that) {

        let initialX = e.pageX;
        let initialY = e.pageY;

        let posX = elem.x;
        let posY = elem.y;

        function move(x, y) {
            let cursorOffsetX = x - initialX;
            let cursorOffsetY = y - initialY;

            elem.x = posX + cursorOffsetX;
            elem.y = posY + cursorOffsetY;

            that.updateStyle(that);
        }

        function onMouseMove(e) {
            if(that.selectedKnob === elem) {
                move(e.pageX, e.pageY);
            }
        }

        function onMouseUp(e) {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        }
        
        //e.preventDefault();

        document.addEventListener('mousemove', onMouseMove);			
        document.addEventListener('mouseup', onMouseUp);
    }
    
    /* Listener for selecting the pedal element with the mouse. */
    selectElementListener() {

    }

    /* Listener for rescaling the pedal element with the mouse. */
    rescaleElementListener() {
        // TODO
    }
    
    /********************************* Deleting Pedal Elements ************************************/
    
    /* Deleting a pedal element */
    deleteElement(pedalElementConfig) {
    }
    
    /* Deleting the configuration of the pedal element. */
    deleteElementConfig(pedalElementConfig) {

    }
    
    /* Removing the pedal element from the html. */
    deleteElementHtml(pedalElementConfig) {

    }
}
