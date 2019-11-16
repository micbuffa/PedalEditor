function createDiv() {
    var pp = document.querySelector('my-pedal');
    var classname = document.getElementById('classnameid').value;
    var idvalue = document.getElementById('idvalueid').value;
    var width = document.getElementById('widthid').value;
    var height = document.getElementById('heightid').value;
    var top = document.getElementById('topid').value;
    var left = document.getElementById('leftid').value;
    var borderstyle = document.getElementById('borderstyleid').value;

    var mydiv = document.createElement('div');
    mydiv.className = classname;
    mydiv.id = idvalue;
    mydiv.style.width = width.concat('px');
    mydiv.style.height = height.concat('px');
    mydiv.style.top = top.concat('%');
    mydiv.style.left = left.concat('%');
    mydiv.style.borderStyle = borderstyle;
    mydiv.style.position = 'absolute';

    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('txtcontainer').appendChild(mydiv);
    }
}




document.querySelector("#knobmenuid > pedal-elem-previews").previews = [];

fetch(document.querySelector("#knobmenuid > pedal-elem-previews").getAttribute('url'))
    .then(response => {
        return response.json();
    })
    .then(data => {
        document.querySelector("#knobmenuid > pedal-elem-previews").previews = data;
        document.querySelector("#knobmenuid > pedal-elem-previews").setUpPreviews();
    })
    .catch(err => {
        console.error('Error fetching preview image names: ' + err);
    });

function setUpPreviews() {
    for (let previewFile of document.querySelector("#knobmenuid > pedal-elem-previews").previews.files) {
        let previewElem = document.createElement('img');
        previewElem.className = 'menu-img';
        previewElem.id = 'preview';
        previewElem.src = document.querySelector("#knobmenuid > pedal-elem-previews").previews.filesUrl +
            previewFile
        previewElem.alt = previewFile;

        previewElem.onclick = (e) => {
            let detail = {
                type: document.querySelector("#knobmenuid > pedal-elem-previews").getAttribute(
                    'pedal-element-type'),
                fileName: e.target.alt
            };

            let event = new CustomEvent('preview-selected', {
                detail: detail
            });
            document.querySelector("#knobmenuid > pedal-elem-previews").dispatchEvent(event);
        }

        document.querySelector("#knobmenuid > pedal-elem-previews").shadowRoot.appendChild(previewElem);
    }
}

/* var divs = [];
divs = document.querySelector("#knobmenuid > pedal-elem-previews").shadowRoot.querySelectorAll("#preview");
    divs.forEach(e => {
        e.onclick = function(){
            var knobContainer = document.createElement("div");
            knobContainer.setAttribute('class', 'knob');
            knobContainer.setAttribute('id', 'knob');

            var knobElem = document.createElement("webaudio-knob");

            
            knobElem.setAttribute('sprites', 100);
            knobElem.setAttribute('value', 0);
            knobElem.setAttribute('step', 1);
            knobElem.setAttribute('height', '70px;');
            knobElem.setAttribute('width', '70px;');
            knobElem.setAttribute('src', '.'.concat(document.querySelector("#knobmenuid > pedal-elem-previews").shadowRoot.querySelector("#preview").getAttribute('src').substr(21)));

            knobContainer.appendChild(knobElem);

            this.pedal.shadowRoot.querySelector('.pedal').appendChild(knobContainer);
        }
    }); */


function handleChange(checkbox) {
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        if (checkbox.checked == true) {
            /* pedal.shadowRoot.getElementById('background-image').setAttribute("src","");
            pedal.shadowRoot.getElementById('background-image').setAttribute("src","./img/background/blue.jpg"); */
            pedal.shadowRoot.getElementById('background-image').style.display = "none";
        } else {
            //pedal.shadowRoot.getElementById('background-image').setAttribute("src","");
            pedal.shadowRoot.getElementById('background-image').style.display = "";
        }
    }

}

function defineImage() {
    var img = document.getElementById('blah');
    var pp = document.querySelector('my-pedal');

    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", img.getAttribute('src'));
    }
}

function showImage() {
    var img = document.getElementById('blah');
    var selector = document.getElementById('selectImage');
    if (selector.options[0].selected) {
        img.setAttribute("src", "");
        img.setAttribute("src", "./img/background/blue.jpg");
        img.style.width = "150px";
        img.style.height = "200px";
    }
    if (selector.options[1].selected) {
        img.setAttribute("src", "");
        img.setAttribute("src", "./img/background/2.jpg");
        img.style.width = "150px";
        img.style.height = "200px";
    }
    if (selector.options[2].selected) {
        img.setAttribute("src", "");
        img.setAttribute("src", "./img/background/1.png");
        img.style.width = "150px";
        img.style.height = "200px";
    }
    if (selector.options[3].selected) {
        img.setAttribute("src", "");
        img.setAttribute("src", "./img/background/image2.png");
        img.style.width = "150px";
        img.style.height = "200px";
    }
}


function selectImage() {
    var selector = document.getElementById('selectImage');
    if (selector.options[0].selected) {
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "");
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "./img/background/blue.jpg");
    }
    if (selector.options[1].selected) {
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "");
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "./img/background/2.jpg");
    }
    if (selector.options[2].selected) {
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "");
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "./img/background/1.png");
    }
    if (selector.options[3].selected) {
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "");
        pedal.shadowRoot.getElementById('background-image').setAttribute("src", "./img/background/image2.png");
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$('div.params input').blur(function () {
    //setShadow();
})

$('#inset').click(function () {
    //setShadow();
})

$('div.minus').click(function () {
    var toChange = $(this).next();
    toChange.val(parseInt(toChange.val()) - 1);
    //setShadow();
})

$('div.plus').click(function () {
    var toChange = $(this).prev();
    toChange.val(parseInt(toChange.val()) + 1);
    //setShadow();
})

$('#surprise').click(function () {
    setRandom();
    //setShadow();
})

$('#variants').click(function () {
    for (var c = 0; c < 5; c++) {
        // boxshadow     offsetX           offsety              blur                             spread
        var shdw2 = rndnr('15') + 'px ' + rndnr('15') + 'px ' + Math.abs(rndnr('30')) + 'px ' + rndnr(
            '10') + 'px ' + '#' + $('#color').val();
        var html = "<div class='box' style='box-shadow: " + shdw2 + "'>" + shdw2 + "</div>";
        $('div.entry-content').append(html);
    }
})


/* $('div.swatch').click(function(){
    $('#box').attr('style', $(this).attr('style'));
    $('#snippet').html($(this).attr('style'));
}) */



var swatchclick = 0;
document.getElementById('hardlight').onclick = function () {
    swatchclick++;
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        if ((swatchclick % 2) == 0) {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = document.getElementById('hardlight')
                .style.boxShadow;
        } else {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
        }
    }
};
swatchclick = 0;
document.getElementById('soft').onclick = function () {
    swatchclick++;
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        if ((swatchclick % 2) == 0) {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = document.getElementById('soft').style
                .boxShadow;
        } else {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
        }
    }
};
swatchclick = 0;
document.getElementById('fromabove').onclick = function () {
    swatchclick++;
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        if ((swatchclick % 2) == 0) {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = document.getElementById('fromabove')
                .style.boxShadow;
        } else {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
        }
    }
};
swatchclick = 0;
document.getElementById('reduced').onclick = function () {
    swatchclick++;
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        if ((swatchclick % 2) == 0) {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = document.getElementById('reduced').style
                .boxShadow;
        } else {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
        }
    }
};
swatchclick = 0;
document.getElementById('inset').onclick = function () {
    swatchclick++;
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        if ((swatchclick % 2) == 0) {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = document.getElementById('inset').style
                .boxShadow;
        } else {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
        }
    }
};
swatchclick = 0;
document.getElementById('glow').onclick = function () {
    swatchclick++;
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        if ((swatchclick % 2) == 0) {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = document.getElementById('glow').style
                .boxShadow;
        } else {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
        }
    }
};
swatchclick = 0;
document.getElementById('disto').onclick = function () {
    swatchclick++;
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        var toto = pedal.shadowRoot.getElementById('pedal').style.background;
        if ((swatchclick % 2) == 0) {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.background = document.getElementById('color').value;
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = document.getElementById('disto').style
                .boxShadow;
            pedal.shadowRoot.getElementById('pedal').style.background = document.getElementById('disto').style
                .background;
        } else {
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
            pedal.shadowRoot.getElementById('pedal').style.background = document.getElementById('color').value;

        }
    }
};
swatchclick = 0;




function setShadow() {
    var b = document.querySelector('my-pedal');
    var shdw = '';
    var offsetx = document.getElementById('offX').value;
    var offsety = document.getElementById('offY').value;
    var blur = document.getElementById('blur').value;
    var spread = document.getElementById('spread').value;

    if (b.shadowRoot) {
        shdw += offsetx + 'px' + ' ' + offsety + 'px' + ' ' + blur + 'px' + ' ' + spread + 'px';
        if (document.getElementById('insett').checked) {
            shdw += ' inset';
            pedal.shadowRoot.getElementById('pedal').style.boxShadow = shdw;
        }
        pedal.shadowRoot.getElementById('pedal').style.boxShadow = shdw;

    }

}


function setRandom() {
    document.getElementById('offX').value = rndnr('15');
    document.getElementById('offY').value = rndnr('15');
    document.getElementById('blur').value = Math.abs(rndnr('30'));
    document.getElementById('spread').value = rndnr('10');

    // inset
    var rndInset = Math.random();
    if (rndInset < .6) {
        document.getElementById('insett').checked = false;
    } else {
        document.getElementById('insett').checked = true;
    };
}

function rndnr(range) {
    var randomNum = Math.ceil(Math.random() * range)
    var vz = Math.random();
    if (vz < .5) randomNum = -1 * randomNum;
    return randomNum;
}

//setShadow();







// target elements with the "draggable" class
interact('.draggables')
    .draggable({
        onmove: window.dragMoveListener,
    })
    .resizable({
        // resize from all edges and corners
        edges: {
            left: true,
            right: true,
            bottom: true,
            top: true
        },

        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent',
                endOnly: true
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: {
                    width: 100,
                    height: 50
                }
            })
        ],

        inertia: true
    })
    .on('resizemove', function (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'
        //pedal.shadowRoot.getElementById('background-image').style.width = target.style.width
        //pedal.shadowRoot.getElementById('background-image').style.height = target.style.height

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
//window.dragMoveListener = dragMoveListener;

function toggleLabelMenuFunction() {
    var x = document.getElementById("labelmenuid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleKnobMenuFunction() {
    var x = document.getElementById("knobmenuid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleShadowMenuFunction() {
    var x = document.getElementById("shadowmenuid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleDivMenuFunction() {
    var x = document.getElementById("divmenuid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleGradientMenuFunction() {
    var x = document.getElementById("gradientmenuid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleTextureMenuFunction() {
    var x = document.getElementById("texturemenuid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleImageMenuFunction() {
    var x = document.getElementById("imagemenuid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


function generateGradient() {
    var pp = document.querySelector('my-pedal');

    var leftred = Number(document.getElementById('leftred').value);
    var leftgreen = Number(document.getElementById('leftgreen').value);
    var leftblue = Number(document.getElementById('leftblue').value);

    var rightred = Number(document.getElementById('rightred').value);
    var rightgreen = Number(document.getElementById('rightgreen').value);
    var rightblue = Number(document.getElementById('rightblue').value);

    var opacity = Number(document.getElementById('opacityid').value);

    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('pedal').style.background = 'linear-gradient(rgb(' + leftred + ', ' +
            leftgreen + ', ' + leftblue + '), ' + 'rgb(' + rightred + ', ' + rightgreen + ', ' + rightblue + '))';
        pedal.shadowRoot.getElementById('textB').style.background = 'linear-gradient(rgba(' + leftred + ', ' +
            leftgreen + ', ' + leftblue + ', ' + opacity + '), ' + 'rgba(' + rightred + ', ' + rightgreen + ', ' +
            rightblue + ', ' + opacity + '))';
    }
}

function generateTexture() {
    var pp = document.querySelector('my-pedal');
    var selector = document.getElementById('selectTexture');
    if (pp.shadowRoot) {
        if (selector.options[0].selected) {
            pedal.shadowRoot.getElementById('pedal').style.background = "";
            //pedal.shadowRoot.getElementById('textB').style.background = "";
            pedal.shadowRoot.querySelector('.pedal').style.cssText =
                'background: radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%,      rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px), #8a3; background-size: 20px 20px;';
            //pedal.shadowRoot.querySelector('.text-block').style.cssText = 'background: radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%,      rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px), #8a3; background-size: 20px 20px;';
            //pedal.shadowRoot.getElementById('textB').style.background = "radial-gradient(black 15%, transparent 16%) 0 0, radial-gradient(black 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255,255,255,0) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,0) 15%, transparent 20%) 8px 9px;";
        }
        if (selector.options[1].selected) {
            pedal.shadowRoot.getElementById('pedal').style.background = "";
            //pedal.shadowRoot.getElementById('textB').style.background = "";
            pedal.shadowRoot.querySelector('.pedal').style.cssText =
                'background: radial-gradient(black 15%, transparent 16%) 0 0, radial-gradient(black 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px; background-color:#282828; background-size:16px 16px;';
            //pedal.shadowRoot.querySelector('.text-block').style.cssText = 'background: radial-gradient(black 15%, transparent 16%) 0 0, radial-gradient(black 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px; background-color:#282828; background-size:16px 16px;';
        }
        if (selector.options[2].selected) {
            pedal.shadowRoot.getElementById('pedal').style.background = "";
            //pedal.shadowRoot.getElementById('textB').style.background = "";
            pedal.shadowRoot.querySelector('.pedal').style.cssText =
                'background-color: #eee; background-image: linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black); background-size: 60px 60px; background-position: 0 0, 30px 30px;';
            //pedal.shadowRoot.querySelector('.text-block').style.cssText = 'background-color: #eee; background-image: linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black); background-size: 60px 60px; background-position: 0 0, 30px 30px;';
        }
    }
}

function togglePreSetsFunction() {
    var x = document.getElementById("presetsid");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}



function toggleLabelMenu() {
    var linkId = document.getElementById('LabelMenu');
    var click = 0;
    var pp = document.querySelector('my-pedal');

    linkId.onclick = function () {
        click++;
        if (pp.shadowRoot) {
            window.addEventListener("contextmenu", e => {
                if ((click % 2) == 0) {
                    this.removeEventListener("contextmenu", e, false);
                    console.log("number of clicks is:" + click);
                } else {
                    e.preventDefault();
                    const origin = {
                        left: e.pageX + 10,
                        top: e.pageY + 10
                    };
                    setPosition(origin);
                    console.log("number of clicks is :" + click);
                    return false;
                }
            });
        }
    };
}



function drawRectangle() {
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        initDraw(pedal.shadowRoot.getElementById('pedal'));
    }

}

function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onclick = function (e) {
        if (element !== null) {
            element = null;
            canvas.style.cursor = "default";
            console.log("finsihed.");
        } else {
            console.log("begun.");
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle'
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            canvas.appendChild(element)
            canvas.style.cursor = "crosshair";
        }
    }
}




window.onmousemove = moveElem;
window.onmouseup = stopMovingElem;


var selected = null; // element to be moved
var oldMouseX, oldMouseY; // Stores x & y coordinates of the mouse pointer
var elemX, elemY;
var divs = [];


// Will be called when user starts dragging an element
function dragInit(evt) {
    // Store the elem
    selected = evt.target;
    elemX = selected.offsetLeft;
    elemY = selected.offsetTop;

    oldMouseX = evt.clientX;
    oldMouseY = evt.clientY;
    //evt.stopPropagation();
}

// Will be called when user dragging an element
function moveElem(e) {
    // new mouse ps
    var newMouseX = e.clientX;
    var newMouseY = e.clientY;

    if (oldMouseX !== undefined) {
        // how many pixels did we move the mouse?
        var dx = newMouseX - oldMouseX;
        var dy = newMouseY - oldMouseY;
    }

    if (selected !== null) {
        // move the selected element dx, dy pixels hozontally/vertically
        changePosOfSelectedElement(dx, dy);
    }

    // update the old position of the mouse
    oldMouseX = newMouseX;
    oldMouseY = newMouseY;
}

function changePosOfSelectedElement(dx, dy) {
    // update the old position of the selected element
    elemX += dx;
    elemY += dy;

    // change the pos on screen of the element
    // by modifying its CSS left/top properties
    selected.style.left = elemX + 'px';
    selected.style.top = elemY + 'px';
}

// Destroy the object when we are done
function stopMovingElem() {
    selected = null;
}

function submitChangeName() {
    pedal.name = document.getElementById('nompedal').value;
}

function submitChangeLabel() {
    var pp = document.querySelector('my-pedal');

    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').innerHTML = document.getElementById('labelpedal').value;
    }
}

const menu = document.querySelector(".menu");
let menuVisible = false;

const toggleMenu = command => {
    menu.style.display = command === "show" ? "block" : "none";
    menuVisible = !menuVisible;
};

const setPosition = ({
    top,
    left
}) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu("show");
};

/* if (document.querySelector('my-pedal').shadowRoot) {
    window.addEventListener("click", e => {
        if (menuVisible) toggleMenu("hide");
    });

    window.addEventListener("contextmenu", e => {
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition(origin);
        return false;
    });
} */

var fonts = ["Montez", "Lobster", "Roboto", "Lexend Zetta", "Josefin Sans", "Shadows Into Light", "Pacifico",
    "Amatic SC", "Orbitron", "Rokkitt", "Righteous", "Dancing Script", "Bangers", "Chewy", "Sigmar One",
    "Architects Daughter", "Abril Fatface", "Covered By Your Grace", "Kaushan Script", "Gloria Hallelujah",
    "Satisfy", "Lobster Two", "Comfortaa", "Cinzel", "Courgette"
];
var string = "";
var select = document.getElementById("select")
for (var a = 0; a < fonts.length; a++) {
    var opt = document.createElement('option');
    opt.value = opt.innerHTML = fonts[a];
    opt.style.fontFamily = fonts[a];
    select.add(opt);
}

function fontChange() {
    var x = document.getElementById("select").selectedIndex;
    var y = document.getElementById("select").options;
    document.body.insertAdjacentHTML("beforeend", "<style> #text{ font-family:'" + y[x].text + "';}" +
        "#select{font-family:'" + y[x].text + "';</style>");

    var t3 = new TimelineLite,
        mySplitText3 = new SplitText("#h3", {
            type: "words,chars"
        }),
        chars = mySplitText3.chars; //an array of all the divs that wrap each character
    TweenLite.set("#h3", {
        perspective: 400
    });
    t3.staggerFrom(chars, 0.2, {
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 150% -50",
        ease: Back.easeOut
    }, 0.01, "+=0");
    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.fontFamily = window.getComputedStyle(document.getElementById(
            'h3')).getPropertyValue('font-family');
    }
}
/* TweenLite.to(page, 0, {top:"-100vh", ease:Bounce.easeOut, delay:0});
TweenLite.to(page, 1, {top:"0vh", ease:Elastic.easeOut, delay:1}); */
//fontChange();

function labelPedalChange() {

    var pp = document.querySelector('my-pedal');
    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.fontFamily = window.getComputedStyle(document.getElementById(
            'h3')).getPropertyValue('font-family');
    }
}

var totalClicksX = 0;

function moveLabelXLeft() {
    var pp = document.querySelector('my-pedal');
    //var t='10';
    //var click=0;
    //var link = document.getElementById('moveLabelXLeft');
    totalClicksX += 10;
    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.right = String(totalClicksX).concat("px");
    }
}


function moveLabelXRight() {
    var pp = document.querySelector('my-pedal');
    //var t='10';
    //var click=0;
    //var link = document.getElementById('moveLabelXRight');
    totalClicksX -= 10;
    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.right = String(totalClicksX).concat("px");
    }
}

var totalClicksY = 0;

function moveLabelYUp() {
    var pp = document.querySelector('my-pedal');
    //var t='10';
    //var click=0;
    //var link = document.getElementById('moveLabelXRight');
    totalClicksY += 10;
    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.bottom = String(totalClicksY).concat("px");
    }
}

function moveLabelYDown() {
    var pp = document.querySelector('my-pedal');
    //var t='10';
    //var click=0;
    //var link = document.getElementById('moveLabelXRight');
    totalClicksY -= 10;
    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.bottom = String(totalClicksY).concat("px");
    }
}


function changeSize(n) {
    var s = document.getElementById('h3');
    var pp = document.querySelector('my-pedal');
    s.style.fontSize = n.value + 'px'

    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.fontSize = window.getComputedStyle(document.getElementById(
            'h3')).getPropertyValue('font-size');
    }
}


function fontSizeX() {
    var s = document.getElementById('h3');
    var pp = document.querySelector('my-pedal');
    //var click = Number(window.getComputedStyle(document.getElementById('h3')).getPropertyValue('font-size').slice(0,2));

    //var click = Number(document.getElementById('sel1').value);
    var sel = document.getElementById('sel1');

    var link = document.getElementById('fontSizeX');
    link.onclick = function () {

        if (pp.shadowRoot) {
            var toto = Number(window.getComputedStyle(pedal.shadowRoot.getElementById('test')).getPropertyValue(
                'font-size').slice(0, 2));
        }
        click = toto + 1;

        if (pp.shadowRoot) {
            pedal.shadowRoot.getElementById('test').style.fontSize = String(click).concat("px");
        }
        //s.style.fontSize = click + 'px';
        //document.getElementById('sel1').value = click;
    };

}


function fontSizeY() {
    var s = document.getElementById('h3');
    var pp = document.querySelector('my-pedal');
    //var click = Number(window.getComputedStyle(document.getElementById('h3')).getPropertyValue('font-size').slice(0,2));

    //var click = Number(document.getElementById('sel1').value);
    var sel = document.getElementById('sel1');

    var link = document.getElementById('fontSizeY');
    link.onclick = function () {

        if (pp.shadowRoot) {
            var toto = Number(window.getComputedStyle(pedal.shadowRoot.getElementById('test')).getPropertyValue(
                'font-size').slice(0, 2));
        }
        if (toto > 0) {
            click = toto - 1;
        }


        if (pp.shadowRoot) {
            pedal.shadowRoot.getElementById('test').style.fontSize = String(click).concat("px");
        }
        //s.style.fontSize = click + 'px';
        //document.getElementById('sel1').value = click;
    };

}


function changeLabelFont(n) {
    var s = document.getElementById('h3');
    var pp = document.querySelector('my-pedal');
    s.style.fontFamily = n.value;

    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.fontFamily = window.getComputedStyle(document.getElementById(
            'h3')).getPropertyValue('font-family');
    }
}


function HEX2RGB(hex) {
    "use strict";
    if (hex.charAt(0) === '#') {
        hex = hex.substr(1);
    }
    if ((hex.length < 2) || (hex.length > 6)) {
        return false;
    }
    var values = hex.split(''),
        r,
        g,
        b;

    if (hex.length === 2) {
        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = r;
        b = r;
    } else if (hex.length === 3) {
        r = parseInt(values[0].toString() + values[0].toString(), 16);
        g = parseInt(values[1].toString() + values[1].toString(), 16);
        b = parseInt(values[2].toString() + values[2].toString(), 16);
    } else if (hex.length === 6) {
        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = parseInt(values[2].toString() + values[3].toString(), 16);
        b = parseInt(values[4].toString() + values[5].toString(), 16);
    } else {
        return false;
    }
    return [r, g, b];
}


function changeShadowColor() {
    var pp = document.querySelector('my-pedal');
    var col = document.getElementById('jscolorshadowpick').value;
    var ca = "#";

    var color = ca.concat(col);
    var finalcolor = HEX2RGB(color);

    var r = finalcolor[0];
    var g = finalcolor[1];
    var b = finalcolor[2];

    if (pp.shadowRoot) {
        //pedal.shadowRoot.getElementById('pedal').style.boxShadow = 'none';
        pedal.shadowRoot.getElementById('pedal').style.boxShadow += ' rgb(' + r + ', ' + g + ', ' + b + ') ';
    }
}

function changeColor(n) {
    var s = document.getElementById('h3');
    var pp = document.querySelector('my-pedal');
    var ca = "#";

    s.style.color = ca.concat(n.value);

    if (pp.shadowRoot) {
        pedal.shadowRoot.getElementById('test').style.color = window.getComputedStyle(document.getElementById('h3'))
            .getPropertyValue('color');
    }
}


function pedalitemslist() {
    var length = pedal.shadowRoot.getElementById('pedal').children.length;
    //var i=2;
    var sel = document.getElementById('selectliste');



    for (var i = 2; i <= length - 1; i++) {
        var opt = document.createElement('option');
        opt.text = pedal.shadowRoot.getElementById('pedal').children[i].id;
        sel.appendChild(opt);
    }

}


$('a[href$="#myModal"]').on("click", function () {
    $('#myModal').modal('show');
});


$('a[href$="#myModal2"]').on("click", function () {
    $('#myModal2').modal('show');
});

$('a[href$="#myModal3"]').on("click", function () {
    $('#myModal3').modal('show');
});

$('a[href$="#myModal4"]').on("click", function () {
    $('#myModal4').modal('show');
});

$('a[href$="#myModal5"]').on("click", function () {
    $('#myModal5').modal('show');
});



/* $(".dropdown-toggle").on("mouseenter", function () {
    // make sure it is not shown:
    if (!$(this).parent().hasClass("show")) {
        $(this).click();
    }
});


$(".btn-group, .dropdown").on("mouseleave", function () {
    // make sure it is shown:
    if ($(this).hasClass("show")){
        $(this).children('.dropdown-toggle').first().click();
    }
}); */


$(function () {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $(window).resize(function (e) {
        if ($(window).width() <= 768) {
            $("#wrapper").removeClass("toggled");
        } else {
            $("#wrapper").addClass("toggled");
        }
    });
});


function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}


function closeMenu() {
    var mn = document.getElementById("closeLink");
    mn.onclick = function () {
        toggleMenu("hide");
    };
}

function RGBAToHexA(r, g, b, a) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    if (a.length == 1)
        a = "0" + a;

    return "#" + r + g + b + a;
}

var nbliensclick = 0;

function BoldStyle() {
    var click = 0;
    var link = document.getElementById('boldid');
    var pp = document.querySelector('my-pedal');
    document.getElementById("h3").style.fontWeight = "900";
    link.onclick = function () {
        click++;
        nbliensclick++;
        if ((click % 2) == 0) {
            document.getElementById("h3").style.fontWeight = "";
        } else {
            document.getElementById("h3").style.fontWeight = "900";
        }

        if (pp.shadowRoot) {
            pedal.shadowRoot.getElementById('test').style.fontWeight = window.getComputedStyle(document
                .getElementById('h3')).getPropertyValue('font-weight');
        }
    };
}

function UnderlineStyle() {
    var click = 0;
    var link = document.getElementById('underlineid');
    var pp = document.querySelector('my-pedal');
    document.getElementById("h3").style.textDecoration = "underline";
    link.onclick = function () {
        click++;
        nbliensclick++;
        if ((click % 2) == 0) {
            document.getElementById("h3").style.textDecoration = "";
        } else {
            document.getElementById("h3").style.textDecoration = "underline";
        }
        if (pp.shadowRoot) {
            pedal.shadowRoot.getElementById('test').style.textDecoration = window.getComputedStyle(document
                .getElementById('h3')).getPropertyValue('text-decoration');
        }
    };
}

function OverlineStyle() {
    var click = 0;
    var link = document.getElementById('overlineid');
    var pp = document.querySelector('my-pedal');
    document.getElementById("h3").style.textDecoration = "overline";
    link.onclick = function () {
        click++;
        nbliensclick++;
        if ((click % 2) == 0) {
            document.getElementById("h3").style.textDecoration = "";
        } else {
            document.getElementById("h3").style.textDecoration = "overline";
        }
        if (pp.shadowRoot) {
            pedal.shadowRoot.getElementById('test').style.textDecoration = window.getComputedStyle(document
                .getElementById('h3')).getPropertyValue('text-decoration');
        }
    };
}


function GripLinesStyle() {
    var click = 0;
    var link = document.getElementById('griplinesid');
    var pp = document.querySelector('my-pedal');
    document.getElementById("h3").style.textDecoration = "underline overline";
    link.onclick = function () {
        click++;
        nbliensclick++;
        if ((click % 2) == 0) {
            document.getElementById("h3").style.textDecoration = "";
        } else {
            document.getElementById("h3").style.textDecoration = "underline overline";
        }
        if (pp.shadowRoot) {
            pedal.shadowRoot.getElementById('test').style.textDecoration = window.getComputedStyle(document
                .getElementById('h3')).getPropertyValue('text-decoration');
        }
    };
}



function LoadTemplateConfig() {
    var frame = document.getElementById('template1');
    var linkframe = document.getElementById('selectTemplate');



}


function LabelColorStyle() {

}


function refreshModal() {

    document.getElementById('width').value = '';
    document.getElementById('color').value = '';
    document.getElementById('height').value = '';
    document.getElementById('radius').value = '';
    document.getElementById('name').value = '';
}

var url = "http://localhost:8085";
let serverUrl = 'http://localhost:3000';

var http = new XMLHttpRequest();
var path = "/pedale";
//var ctx = new AudioContext();
var section = document.getElementsByClassName("pedalSection")[0];
//var section2 = document.getElementById('editor-pedal-details');
var pedal = getFirstChild(section);
var editorPedalDetails = document.getElementById('editor-pedal-details');
var knobSprite;
var switchSprite;
let savedPedalsConfigs;
let functionalPedalGenerator;

var bt_buildIt = document.querySelector('#bt_buildIt');
let currentWapName, currentWapCode;


window.onload = initialize;
//Mettre en commentaire la fonction ci-dessous avant d'utiliser faust, bug à régler
/* function init(){
    var pp = document.querySelector('my-pedal');
    if(pp.shadowRoot){
        divs = pedal.shadowRoot.querySelectorAll('.draggable');
        divs.forEach(e => {
        e.onmousedown = function (evt) {
            dragInit(evt);
            //console.log('true');
            e.stopPropagation();
        };
                  })
    }
} */
var faustUI = {};

function initialize() {

    var urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams.has('data')); // true
    console.log(urlParams.get('data'));
    //console.log("name present : " + urlParams.has('name')); // true
    //console.log("name = " + urlParams.get('name'));
    console.log("### FAUSTUI JSON = ");
    //console.log(urlParams.get('data'));
    console.log("###");
    //faustUI = JSON.parse(urlParams.get('data'));

}

function setFaustUIFromUrl() {
    let url = new URL(location);
    let searchParams = new URLSearchParams(url.search);
    console.log("url = ", url)
    faustUI = searchParams.get('data');
    console.log("data = ", faustUI)
}


/*Slider Nav Menu*/
function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function newPedal(args, withoutInit) {



    section.innerHTML = '';
    pedal = null;
    let pedalElem = document.createElement('my-pedal');
    pedalElem.id = "my-pedal";
    //pedalElem.className = "draggable";
    section.appendChild(pedalElem);
    pedal = pedalElem;


    pedal.addEventListener('select-knob', function (e) {
        selectKnob(e.detail);
        updateInspector();
    });

    if (!withoutInit) {
        defaultPedalConfig.name = currentWapName;
    }

    var r = Number(document.getElementById("color").value.slice(5, 8));
    var g = Number(document.getElementById("color").value.slice(9, 12));
    var b = Number(document.getElementById("color").value.slice(13, 16));
    var a = Number(document.getElementById("color").value.slice(17, 20));
    //RGBAToHexA(r,g,b,a)

    let defaultPedalConfig = {
        color: document.getElementById('color').value,
        width: Number(document.getElementById('width').value),
        height: Number(document.getElementById('height').value),
        radius: Number(document.getElementById('radius').value),
        elements: [],
        name: document.getElementById('name').value
    };


    let modifiedPedalConfig = {
        color: RGBAToHexA(r, g, b, a),
        width: window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue('width')
            .slice(0, window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue(
                'width').lastIndexOf("p")),
        height: window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue('height')
            .slice(0, window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue(
                'width').lastIndexOf("p")),
        radius: window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue('radius')
            .slice(0, window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue(
                'width').lastIndexOf("p")),
        elements: [],
        name: document.getElementById('name').value
    }

    if (args) {
        defaultPedalConfig.name = args.name;
        defaultPedalConfig.height = args.height;
        defaultPedalConfig.width = args.width;
        defaultPedalConfig.name = args.name;
        defaultPedalConfig.elements = args.elements;
    }

    pedal.loadConfig(defaultPedalConfig);
    //pedal.loadConfig(modifiedPedalConfig);
    /* if(Number(defaultPedalConfig.width) < Number(window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue('width').slice(0,1))  || Number(defaultPedalConfig.width) > Number(window.getComputedStyle(pedal.shadowRoot.getElementById('pedal')).getPropertyValue('width').slice(0,1))) {
        
        pedal.loadConfig(modifiedPedalConfig);
    }
    else{
        pedal.loadConfig(defaultPedalConfig);
    } */
    plugPedalToEditor();



    functionalPedalGenerator = new FunctionalPedalGenerator(pedal);;

    document.getElementById('h3').innerHTML = document.getElementById('label').value;
    var ped = document.querySelector('my-pedal');

    if (ped.shadowRoot) {
        pedal.shadowRoot.getElementById('test').innerHTML = document.getElementById('label').value;
        /* window.addEventListener("click", e => {
            const flyoutElement = document.getElementById("closeLink");
            let targetElement = e.target;
            if (targetElement === flyoutElement) toggleMenu("hide");
        }); */

        /* window.addEventListener("contextmenu", e => {
            e.preventDefault();
            const origin = {
                left: e.pageX,
                top: e.pageY
            };
            setPosition(origin);
            return false;
        }); */
    }
}

function removeDOMElement() {
    var p = document.querySelector('my-pedal');

    if (p.shadowRoot) {
        //pedal.shadowRoot.getElementById('pedal').removeChild(pedal.shadowRoot.getElementById('pedal').children[2]);

        for (var i = 2; i < pedal.shadowRoot.getElementById('pedal').childElementCount; i++) {
            pedal.shadowRoot.getElementById('pedal').removeChild(pedal.shadowRoot.getElementById('pedal').children[
                i]);
        }
    }

}


/* function removeDOMElement(){
    var p = pedal.shadowRoot.getElementById('pedal');

    p.addEventListener("click",function(e) {
    var tgt = e.target;
    if (tgt.id.includes('knob')) {
        tgt.parentNode.removeChild(tgt); // or tgt.remove();
    }
    });
} */

// Remove the selected CSS class from all selected elements
// other wise the saved pedal will display dashed borders
// for saved elements
function deselectEverything() {
    let elems = pedal.shadowRoot.querySelectorAll(".selected");
    elems.forEach((e) => {
        e.classList.toggle("selected");
        //e.style.border = "2px solid red";
    });

    // remove background image is it has no src
    let img = pedal.shadowRoot.querySelector("#background-image");
    console.log("### img.src = " + img.src);
    if ((img.src === undefined) || (img.src === "")) {
        // remove the elem
        img.parentNode.removeChild(img);
    }
}

function savePedal() {

    deselectEverything();

    let pedalName = pedal.getAttribute('name');
    if (pedalName == '') {
        alert('You should enter the pedal name before saving !');
        return;
    }

    let config = pedal.getConfig();

    let http = new XMLHttpRequest();
    let url = serverUrl + '/pedals';
    let params = config;
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            alert('Saved successfully!');
            pedal.pedalId = JSON.parse(http.responseText).id;
            //displaySavedPedalsIds();
        }
    }
    http.send(JSON.stringify(params));
    generateCodeFunctionalPedalFetch();
}

function refreshSavedPedalsConfigs() {
    let request = new XMLHttpRequest();
    request.open('GET', serverUrl + '/pedals', false);
    request.send(null);
    let pedalConfigs = JSON.parse(request.responseText);
    savedPedalsConfigs = pedalConfigs;
}

/* function displaySavedPedalsIds() {

    // Uptates the list of pedal configurations by fetching then from the server. 
    refreshSavedPedalsConfigs();

    // Gets the select element that displays the list of names of the saved pedal configurations. 
    let loadPedalElem = document.querySelector('#load-pedal');

    let oldVal = loadPedalElem.value;

    // Flushes the select element to get rid of the old pedal configurations that have been generated
    //during the last call to this function. If we don't flush it, the names of the new pedal configurations
    //will be appended to the ones that has been fetched in the previous call to the function.
    loadPedalElem.innerHTML = '';

    for (let savedPedalConfig of savedPedalsConfigs) {
        let savedPedalIdElem = document.createElement('option');
        savedPedalIdElem.setAttribute('value', savedPedalConfig.id);
        savedPedalIdElem.innerHTML = savedPedalConfig.name;

        loadPedalElem.appendChild(savedPedalIdElem);
    }

    loadPedalElem.value = oldVal;

} */


function setSelectedElementLabel(value) {
    let element = pedal.getSelectedElement();
    element.label = value;
    pedal.updateStyle_();
}

function setSelectedElementLabelColor(value) {
    let element = pedal.getSelectedElement();
    element.label_color = value;
    pedal.updateStyle_();
}

function setSelectedElementLabelFontfamily(value) {
    let element = pedal.getSelectedElement();
    element.label_fontfamily = value;
    pedal.updateStyle_();
}

function setSelectedElementLabelFontsize(value) {
    let element = pedal.getSelectedElement();
    element.label_fontsize = value;
    pedal.updateStyle_();
}

function setSelectedElementValue(value) {
    let element = pedal.getSelectedElement();
    element.value = value;
    pedal.updateStyle_();
}

function setSelectedElementModel(value) {
    let element = pedal.getSelectedElement();
    element.model = value;
    pedal.updateStyle_();
    selectKnob(pedal.getSelectedElement());
}

function setSelectedElementXPosition(xPosition) {
    let element = pedal.getSelectedElement();
    element.x = xPosition;
    pedal.updateStyle_();
}

function setSelectedElementYPosition(yPosition) {
    let element = pedal.getSelectedElement();
    element.y = yPosition;
    pedal.updateStyle_();
}

function setSelectedElementWidth(width) {
    let keepRatio = document.querySelector("#keep-ratio").checked;


    let element = pedal.getSelectedElement();
    element.width = width;

    if (keepRatio) {
        element.height = element.width;
        document.querySelector("#inspector-height").value = width;
    }

    pedal.updateStyle_();
}

function setSelectedElementHeight(height) {
    let keepRatio = document.querySelector("#keep-ratio").checked;

    let element = pedal.getSelectedElement();
    element.height = height;

    if (keepRatio) {
        element.width = element.height;
        document.querySelector("#inspector-width").value = height;

    }

    pedal.updateStyle_();
}

/*function updatePedalElementsSection() {

    // Deleting the elements of all the sections.
    for (let pedalElementType of pedal.getElementsTypes()) {
        let section = getSectionByPedalElementType(pedalElementType);

        if (!section) {
            continue;
        }

        let firstChild;
        while (firstChild = section.firstChild) {
            section.removeChild(firstChild);
        }
    }


    // Populating the sections.
    for (let pedalElement of pedal.getElements()) {
        let section = getSectionByPedalElementType(pedalElement.type);
        if (!section) {
            continue;
        }

        let idElem = document.createElement('div');
        idElem.className = pedalElement.type + '_id';
        idElem.innerHTML = pedalElement.id;
        idElem.onclick = (e) => {
            selectKnob(e.target.innerHTML);
        }

        section.appendChild(idElem);
    }

    // Select the pedal's selected element.
    let selectedElement = pedal.getSelectedElement();
    if (selectedElement) {
        selectKnob(selectedElement.id);
    }

}*/

function getSectionByPedalElementType(pedalElementType) {
    let section = document.querySelector('#' + pedalElementType + '_section');

    return section;
}

function updateInspector() {
    pedal.getSelectedElement();
}

function selectKnob(knobId) {

    /*
    var knobs = document.getElementById('knob_section').childNodes;
    var icons = document.getElementById('icon_section').childNodes;

    for (let knob of knobs) {
        // TODO: Remove.
        if (knob.className)
            knob.className = knob.className.replace('selected', '');
        if (knob.innerHTML === knobId) {
            knob.className += ' selected';
        }
    }

    for (let icon of icons) {
        // TODO: Remove.
        if (icon.className)
            icon.className = icon.className.replace('selected', '');
        if (icon.innerHTML === knobId) {
            icon.className += ' selected';
        }
    }

    if (pedal.getSelectedElement().id != knobId) {
        pedal.selectElement(knobId);
    }*/


    let knob = pedal.getSelectedElement();
    let inspectorId = document.getElementById('inspector-id');
    let inspectorLabel = document.getElementById('inspector-label');
    let inspectorLabelColor = document.getElementById('inspector-label-color');
    let inspectorLabelFontFamily = document.getElementById('inspector-label-font-family');
    let inspectorLabelSize = document.getElementById('inspector-label-font-size');
    let inspectorXPosition = document.getElementById('inspector-x-position');
    let inspectorYPosition = document.getElementById('inspector-y-position');
    let inspectorWidth = document.getElementById('inspector-width');
    let inspectorHeight = document.getElementById('inspector-height');

    let inspectorModel = document.getElementById('inspector-model');
    let inspectorPreview = document.getElementById('inspector-preview');



    inspectorLabel.value = knob.label;
    inspectorLabelColor.value = knob.label_color;
    inspectorLabelFontFamily.value = knob.label_fontfamily;
    inspectorLabelSize.value = knob.label_fontsize;
    inspectorXPosition.value = knob.x;
    inspectorYPosition.value = knob.y;
    inspectorWidth.value = knob.width || 0;
    inspectorHeight.value = knob.height || 0;

    inspectorModel.value = knob.model;

    let inspector = document.getElementById('inspector');
}

function deleteSelectedElement() {
    pedal.deleteSelectedElement();
    updatePedalElementsSection();
}

function addSlider() {
    pedal.addElement('slider');
}



function loadPedalConfig(value) {

    newPedal();
    for (let pedalConfig of savedPedalsConfigs) {
        if (pedalConfig.id == value) {
            pedal.loadConfig(pedalConfig);

            let loadPedal = document.querySelector('#load-pedal');
            loadPedal.value = value;
        }
    }

    plugPedalToEditor();
}

function plugPedalToEditor() {

    // Plug pedal to pedal details component
    let pedalDetails = document.querySelector('#editor-pedal-details');
    let newPedalDetails = pedalDetails.cloneNode();
    pedalDetails.parentNode.replaceChild(newPedalDetails, pedalDetails);
    newPedalDetails.setEditablePedal(pedal);

    // Plug pedal to element list component
    let elementList = document.querySelector('#editor-element-list');
    elementList.setEditablePedal(pedal);

    // Plug pedal to inspector component
    let inspector = document.querySelector('#editor-inspector');
    inspector.setEditablePedal(pedal);
}

function getFirstChild(el) {
    var firstChild = el.firstChild;

    while (firstChild != null && firstChild.nodeType == 3) { // skip TextNodes
        firstChild = firstChild.nextSibling;
    }

    return firstChild;
}

// Sends the main.html GUI file for the wap named currentWapName
// to the backend server. A dir is created if there is none already
// created for this WAP.
// It also copies asset files if necessary, and finally sends a message to the Faust IDE
// to ask for it to generate a binary.zip file with the DSP code. An async message will be 
// sent back by the faust IDE when ready (processed in the next listener defined after this
// function)



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateCodeFunctionalPedalFetch() {
    let url = serverUrl + '/generate';

    let data = new FormData();
    data.append("generated", functionalPedalGenerator.generateFunctionalPedalCode(currentWapName));
    data.append("wapName", currentWapName);
    data.append("wapCode", currentWapCode);

    fetch(url, {
        method: "POST",
        body: data
    })
        .then((responseJSON) => {
            responseJSON.json()
                .then(res => {
                    console.log(res.message);
                    alert(res.message);
                })
        })
        .catch(err => {
            console.log(err)
        })

    // 1 - SEND ASYNC MESSAGE TO FAUST EDITOR
    console.log("SENDING EXPORT MESSAGE TO FAUST EDITOR")
    if (window.parent !== window) {
        window.parent.postMessage({
            type: "export",
            plat: "web",
            arch: "wap"
        })
    }

}

function initializeFromMessagePostedByFaustIDE(data) {
    console.log("initializeFromMessagePostedByFaustIDE")

    let name = data.name;
    console.log("initializeFromMessagePostedByFaustIDE: name = " + name)
    currentWapCode = data.code;

    /* ####### Commenter la ligne de faustUI.WapName ci-dessous quand on n'utilise pas faust editor ########
     */
    faustUI.WapName = name.substr(0, name.lastIndexOf("."));
    console.log("initializeFromMessagePostedByFaustIDE: faustUI.WapName = " + faustUI.WapName)

    currentWapName = faustUI.WapName;
    console.log("initializeFromMessagePostedByFaustIDE: currentWapName = " + currentWapName)
    console.log("code = " + data.code);
    //Mettre en commentaire init() quand on utilise faust editor, bug à régler
    //init();
    faustUI = data.ui;
    console.log("FaustUI = " + JSON.stringify(data.ui))
    //console.log("faustUI = ", faustUI)
    //setFaustUIFromUrl();
    //console.log("faustUi après setFaustUIFromUrl= ", faustUI)


    //displaySavedPedalsIds();

    /* bt_buildIt.addEventListener('click', () => {

    checkMetadata(document.querySelector("#urlPlugin").value);
    }); */

    let faust = document.querySelector('#editor-faust'),
        faustClone = faust.cloneNode(true);
    faust.parentNode.replaceChild(faustClone, faust);

    faust = document.querySelector('#editor-faust');
    /*faust.addEventListener('create-pedal', (e) => {
    newPedal();
    let pedalConfig = {
    name: "First",
    color: "#7caeff",
    width: e.detail.width,
    height: e.detail.height,
    radius: "10",
    opacity: "1",
    elements: e.detail.elements
    };
    //console.log(e.detail);
    pedal.loadConfig(pedalConfig);
    });*/
    if (window.faustUI) {
        console.log("### faustUI present ! ####")
        console.log(window.faustUI);
        newPedal(null, true);

        let detail = faust.pedalConfigFromUI(window.faustUI);

        let pedalConfig = {
            name: window.faustUI.WapName,
            color: "#7caeff",
            width: detail.width,
            height: detail.height,
            radius: "10",
            opacity: "1",
            elements: detail.elements
        };
        console.log(detail);
        console.log("PEDALCONFIG = ", pedalConfig);

        //currentWapName = pedalConfig.name;
        pedal.loadConfig(pedalConfig);

    }
}
// 2 - SENT BY FAUST IDE WHEN THE BINARY.ZIP FILE IS READY TO BE SENT TO BACK-END WAP SERVER
window.addEventListener("message", (e) => {
    const data = e.data;

    if (data.type === "build") {
        initializeFromMessagePostedByFaustIDE(data);
    }

    if (data.type === "exported") {
        let wapBinaryDotZipFileURL = data.href
        console.log(wapBinaryDotZipFileURL);

        // Let's send a message to the backend server so that it gets
        // this file, and unzip it in the same dir the main.html GUI file + assets
        // have been created
        let url = serverUrl + '/addBinaryDotZip';
        let data2 = new FormData();
        data2.append("url", wapBinaryDotZipFileURL);
        data2.append("wapName", currentWapName);

        fetch(url, {
            method: "POST",
            body: data2
        })
            .then((responseJSON) => {
                responseJSON.json()
                    .then(res => {
                        console.log(res.message);
                        alert(res.message);
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
});


// Sends the binary.zip to the Back-End
function publish(downPath, pedalName) {
    var http = new XMLHttpRequest();
    var url = 'http://localhost:3000/generated-wap';
    var params = {
        url: downPath,
        pedalName: "current"
    };

    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', "application/json");

    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }

    http.send(JSON.stringify(params));
}

function toggleHidden(elem) {
    if (elem.style.display === 'none') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
}

function toggleEditorPedalDetails() {
    let elem = document.querySelector('#editor-pedal-details');
    toggleHidden(elem);
}



// And of the forked content
// -----------------------------Json fetching part ---------------------------//

function checkMetadata(baseURL) {
    fetch(baseURL + "/main.json").then(responseJSON => {
        return responseJSON.json();
    }).then(metadata => {
        let name = metadata.name
        let className = metadata.vendor + metadata.name;
        loadPlugin(className, name, baseURL);
    }).catch((e) => {
        console.log(e);
    });
}

// add the script tag and load the plugin 
function loadPlugin(className, name, baseURL) {
    let scriptURL = baseURL + "/main.js";

    // if we are here this means that the script is not present. Add it to the document
    let script = document.createElement("script");
    script.src = scriptURL;

    script.onload = function () {
        // Once the script has been loaded instanciate the plugin
        getDescriptorFromPlugin(className, name, baseURL);
    }
    // will be executed before the onload above...
    document.head.appendChild(script);
}

// instanciate the plugin 
/* function getDescriptorFromPlugin(className, name, baseURL) {

     var plugin = new window[className](ctx, baseURL);
     console.log(plugin);

     plugin.load().then((node) => {
         plugin.loadGui().then((elem) => {
             let descriptor = node.getDescriptor();
             let dimensions = elem.properties;
             let nbParam = Object.keys(descriptor).length;
             var count = 0;
             let hoffset = 50;
             let voffset = 60;
             console.log(descriptor);

             //--------------------------------- JSON edition PART -------------------------//
             let extendedDescriptor = {
                 "name": name,
                 "backgroundImageSrc": "image2.png",
                 "color": "#AB2E24",
                 "width": dimensions.dataWidth.value,
                 "height": dimensions.dataHeight.value,
                 "radius": "10",
                 "elements": []
             }


             for (var param in descriptor) {
                 // 2* because we want by default two ranges of knobs
                 let horizontalRange = Math.ceil(count % (nbParam / 2));
                 let verticalRange = Math.floor(count / (nbParam / 2));
                 console.log(param, horizontalRange, verticalRange);

                 // Here we do a little normalisation because we have to select by ID later

                 if (descriptor.hasOwnProperty(param)) {
                     var element = {
                         "id": param.toLowerCase().replace(/ /g, "").replace('\/', ""),
                         "x": hoffset * horizontalRange,
                         "y": voffset * verticalRange,
                         "width": 40,
                         "height": 40,
                         "model": "Carbon.png",
                         "value": descriptor[param].defaultValue,
                         "min": descriptor[param].minValue,
                         "max": descriptor[param].maxValue,
                         "label": param,
                         "label_fontfamily": "Verdana",
                         "label_fontsize": "7",
                         "label_color": "000000",
                         "type": "knob"
                     }

                 }
                 count++;
                 extendedDescriptor.elements.push(element);


             }
             var elemlabel = {
                 "x": 20,
                 "y": 130,
                 "label": name,
                 "label_fontfamily": 'Comic Sans MS',
                 "label_fontsize": '14',
                 "label_color": 'ffffff',
                 "type": 'label'
             }
             extendedDescriptor.elements.push(elemlabel);
             //-------------------- END of JSON Edition -------------------- //

             newPedal(extendedDescriptor);
             console.log(extendedDescriptor);


         });
         delete node;

     });

     delete plugin;

 }*/