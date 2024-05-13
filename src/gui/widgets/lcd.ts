import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

/*
* LCD Options
//these options need to be modified epending on the resulting positioning/size
options.segmentWidth = options.segmentWidth || 0.06; // how wide are the segments in % so 50% = 0.5
options.segmentInterval = options.segmentInterval || 0.11; // spacing between the segments in % so 50% = 0.5
options.strokeWidth = options.strokeWidth || 0.11; // spacing between the segments in % so 50% = 0.5
//default display settings
options.elements = options.elements || 3; // how many elements in the display. or how many characters can be displayed.
options.display = options.display || 321; // what should be displayed before anything is set
options.elementSpacing = options.spacing || 4; // spacing between each element
options.elementPadding = options.padding || 2; // how far away from the edges to put the elements
//coloring
options.color = options.color || "white";
*/


let gauge_percent = 0;


function gauge({ grid, location, data }: Widget): contrib.Widgets.GaugeElement {
        var gauge = grid.set(
        location.y, location.x, location.w, location.h,
        contrib.gauge, {
            label: 'storage',
            percent: [80,20],
        })
        // gauge percent update
        setInterval(function() {
            gauge.setData([gauge_percent, 100-gauge_percent]);
            gauge_percent++;
            if (gauge_percent>=100) gauge_percent = 0  
        }, 200)
    // gauge percent update
    return gauge
}


export default gauge
