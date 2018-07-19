
class PedalElementManager {
    constructor(pedal, document) {
        this.pedal = pedal;
        this.doc = document;

        let resizeElem = this.pedal.shadowRoot.querySelector('#resize');

        var that = this;

        resizeElem.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            that.resizeListener(e, that.pedal);
        }, true);
    }


    addElement(type, filename, id) {

        /* The configuration of the pedal element. */
        let pedalElementConfig = this.addElementConfigDefault(type, filename);

        /* The html container of the element. */
        let pedalElementContainer = this.addElementHtml(pedalElementConfig, id);

        let containerId = pedalElementContainer.getAttribute('id');

        /* For the listeners. */
        var that = this;

        /* Drag and drop listener. */
        pedalElementContainer.addEventListener('mousedown', function (e) {
            //console.log(id);

            e.stopPropagation();
            e.preventDefault();
            that.dragAndDropElementListener(e, pedalElementConfig, that.pedal);
        }, true);

        /* Selection listener. */
        pedalElementContainer.addEventListener('click', function (e) {
            that.pedal.selectElement(containerId);
        }, true);

        /* Selecting the element just after it has been added. */
        //this.pedal.selectElement(id);

        return pedalElementConfig;
    }

    /********************************* Add Pedal Elements Config ************************************/

    /* Creating and adding the default configuration of the element by providing its type. */
    addElementConfigDefault(type, filename) {
        switch (type) {
            case 'switch':
                return this.addSwitchConfigDefault(filename);
            case 'knob':
                return this.addKnobConfigDefault(filename);
            case 'icon':
                return this.addIconConfigDefault(filename);
            case 'slider':
                return this.addSliderConfigDefault(filename);
            case 'label':
                return this.addLabelConfigDefault(filename);
        }
    }


    /* Creating and adding the default configuration of the knob. */
    addKnobConfigDefault(filename) {
        let uid = Math.floor(Math.random() * 1000)
        var knob = {
            id: "knob_" + uid,
            x: 43,
            y: 30,
            width: 70,
            height: 70,
            model: 'knob2.png',
            value: 20,
            label: 'knbo_' + uid,
            label_fontfamily: 'Comic Sans MS',
            label_fontsize: '9',
            label_color: '000000',
            type: 'knob'
        };
        this.pedal.knobs.push(knob);

        return knob;
    }

    /* Creating and adding the default configuration of a switch. */
    addSwitchConfigDefault(filename) {
        let uid = Math.floor(Math.random() * 1000);
        var _switch = {
            id: "switch_" + uid,
            x: 43,
            y: 30,
            width: 130,
            height: 75,
            model: 'switch_2.png',
            label: 'switch_' + uid,
            label_fontfamily: 'Comic Sans MS',
            label_fontsize: '9',
            label_color: '000000',
            type: 'switch'
        };
        this.pedal.switches.push(_switch);

        return _switch;
    }

    /* Creating and adding the default configuration of a slider. */
    addSliderConfigDefault(filename) {
        let uid = Math.floor(Math.random() * 1000);
        var slider = {
            id: "slider_" + uid,
            x: 43,
            y: 30,
            width: 45,
            height: 45,
            model: 'slider1.png',
            label: 'slider_' + uid,
            label_fontfamily: 'Comic Sans MS',
            label_fontsize: '9',
            label_color: '000000',
            type: 'slider'
        };
        this.pedal.sliders.push(slider);

        return slider;
    }

    /* Creating and adding the default configuration of an icon. */
    addIconConfigDefault(filename) {
        let uid = Math.floor(Math.random() * 1000);
        var icon = {
            id: "icon_" + uid,
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

    addLabelConfigDefault(name) {
        let uid = Math.floor(Math.random() * 1000);
        var _label = {
            id: "label_" + uid,
            x: 43,
            y: 30,
            label: name,
            label_fontfamily: 'Comic Sans MS',
            label_fontsize: '14',
            label_color: 'ffffff',
            type: 'label'
        };
        this.pedal.labels.push(_label);

        return _label;
    }

    /********************************* Add Pedal Elements Html ************************************/

    /* Creating and adding the html of the pedal element from its config. */
    addElementHtml(pedalElementConfig, id) {
        switch (pedalElementConfig.type) {
            case 'switch':
                return this.addSwitchHtml(pedalElementConfig);
            case 'knob':
                return this.addKnobHtml(pedalElementConfig, id);
            case 'icon':
                return this.addIconHtml(pedalElementConfig);
            case 'slider':
                return this.addSliderHtml(pedalElementConfig);
            case 'label':
                return this.addLabelHtml(pedalElementConfig, id);
        }
    }


    /* Creating and adding the html of the knob from its config. */
    addKnobHtml(knobConfig, id) {
        var knobContainer = this.doc.createElement("div");
        knobContainer.setAttribute('class', 'knob');
        knobContainer.setAttribute('id', id ? id : knobConfig.id);

        var knobElem = this.doc.createElement("webaudio-knob");
        knobElem.setAttribute('sprites', 100);
        knobElem.setAttribute('value', 0);
        knobElem.setAttribute('step', 1);
        knobElem.setAttribute('src', 'https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay2Amine/img/knobs/' + knobConfig.model);

        knobContainer.appendChild(knobElem);

        var label = this.doc.createElement('div');
        label.innerHTML = knobConfig.id;
        knobContainer.appendChild(label);

        this.pedal.shadowRoot.querySelector('.pedal').appendChild(knobContainer);
        return knobContainer;
    }

    /* Creating and adding the html of the knob from its config. */
    addLabelHtml(labelConfig, id) {
        console.log(labelConfig);
        var labelContainer = this.doc.createElement("div");
        labelContainer.setAttribute('class', 'label');
        labelContainer.setAttribute('id', id ? id : labelConfig.id);
        labelContainer.innerHTML = labelConfig.label;
        var labelElement = this.doc.createElement("div");
        //labelElement.setAttribute('style',`color:#${labelConfig.label_color}; font-family:${labelConfig.label_fontfamily}; font-size:${labelConfig.label_fontsize}px`);
        //labelElement.innerHTML = labelConfig.label;
        //labelContainer.appendChild(labelElement);

        this.pedal.shadowRoot.querySelector('.pedal').appendChild(labelContainer);
        return labelContainer;
    }

    /* Creating and adding the html of the switch from its config. */
    addSwitchHtml(switchConfig) {
        var switchContainer = this.doc.createElement("div");
        switchContainer.setAttribute('class', 'switch');
        switchContainer.setAttribute('id', switchConfig.id);

        var label = this.doc.createElement('div');
        label.innerHTML = switchConfig.id;

        switchContainer.appendChild(label);

        this.pedal.shadowRoot.querySelector('.pedal').appendChild(switchContainer);

        return switchContainer;
    }

    /* Creating and adding the html of the slider from its config. */
    addSliderHtml(sliderConfig) {
        var sliderContainer = this.doc.createElement("div");
        sliderContainer.setAttribute('class', 'switch');
        sliderContainer.setAttribute('id', sliderConfig.id);

        var switchElem = this.doc.createElement("webaudio-slider");
        switchElem.setAttribute('src', 'https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay2Amine/img/sliders/' + sliderConfig.model);
        switchElem.setAttribute('height', 64);
        switchElem.setAttribute('width', 128);

        sliderContainer.appendChild(switchElem);

        var label = this.doc.createElement('div');
        label.innerHTML = sliderConfig.id;

        sliderContainer.appendChild(label);

        this.pedal.shadowRoot.querySelector('.pedal').appendChild(sliderContainer);

        return sliderContainer;
    }



    /* Creating and adding the html of the icon from its config. */
    addIconHtml(iconConfig) {
        //var iconContainer = this.doc.createElement("div");
        //iconContainer.setAttribute('id', iconConfig.id);

        var iconImg = this.doc.createElement("img");
        iconImg.setAttribute('class', 'icon');
        iconImg.setAttribute('id', iconConfig.id);
        iconImg.setAttribute('src', 'https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay2Amine/img/icons/' + iconConfig.file);

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
            if (that.selectedElement === elem) {
                move(e.pageX, e.pageY);
                that.dispatchEvent(that.configChangedEvent);
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

    resizeListener(e, pedal) {
        let initialX = e.pageX;
        let initialY = e.pageY;

        let width = pedal.getAttribute("width");
        let height = pedal.getAttribute("height");

        function move(x, y) {
            let cursorOffsetX = x - initialX;
            let cursorOffsetY = y - initialY;

            let newWidth = parseInt(width) + cursorOffsetX;
            let newHeight = parseInt(height) + cursorOffsetY;

            pedal.setAttribute("width", newWidth);
            pedal.setAttribute("height", newHeight);

            pedal.dispatchEvent(pedal.configChangedEvent);

            pedal.updateStyle(pedal);
        }

        function onMouseMove(e) {
            move(e.pageX, e.pageY);
        }

        function onMouseUp(e) {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    }

    /* Listener for rescaling the pedal element with the mouse. */
    rescaleElementListener() {
        // TODO
    }

    /********************************* Deleting Pedal Elements ************************************/

    /* Deleting a pedal element */
    deleteElement(elementId) {
        console.log('The number of remaining pedal elements are: ' + pedal.getElements());

        this.deleteElementConfig(elementId);
        this.deleteElementHtml(elementId);
        this.pedal.updateStyle(this.pedal);
    }

    /* Deleting the configuration of the element. */
    deleteElementConfig(elementId) {
        var arr;

        arr = pedal.icons;
        for (let elem of arr) {
            if (elem.id == elementId) {
                var i = arr.indexOf(elem);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            }
        }

        arr = pedal.knobs;
        for (let elem of arr) {
            if (elem.id == elementId) {
                var i = arr.indexOf(elem);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            }
        }

        arr = pedal.sliders;
        for (let elem of arr) {
            if (elem.id == elementId) {
                var i = arr.indexOf(elem);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            }
        }

        arr = pedal.switches;
        for (let elem of arr) {
            if (elem.id == elementId) {
                var i = arr.indexOf(elem);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            }
        }

    }

    /* Removing the element from the html. */
    deleteElementHtml(elementId) {
        let elem = this.pedal.shadowRoot.querySelector('#' + elementId);
        elem.parentElement.removeChild(elem);
    }
}
