/**
 * This utility will parse Faust code then extract relevant information on
 * the pedal elements necessary to run that Faust code.
 * 
 * This informations can be:
 *  - Relative disposition and alignement of pedal elements.
 *  - Ids of the pedal elements.
 *  - Ranges and step of the pedal element.
 *  - Initial value of the pedal element.
 *  - etc ...
 */
class FaustParser {

    constructor() {
        //this.regex = new RegExp('hslider\(.*\)', 'g');
        this.regex = new RegExp('hslider[(][^)]*[)]', 'g');

    }

    /**
     * Extracts the pedal elements as an array from a faust bit of code.
     */
    extractElements(faustCode) {
        console.log(faustCode.match(this.regex));
        return null;
    }

}