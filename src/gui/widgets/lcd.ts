import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

/*// lcd widget usage
  lcd({ grid, location: { x: 0, y: 9, w: 4, h: 3 },
  style: { 
  display: 546, 
  segmentWidth: 0.06, 
  segmentInterval: 0.11, 
  strokeWidth: 0.1, 
  elements: 5, 
  elementSpacing: 4, 
  elementPadding: 2
  }
  })
  */



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


function lcd({ grid, location, data, style }: Widget): any {
    let lcd = grid.set(
        location.y, location.x, location.w, location.h,
        contrib.lcd, 
        style
    )

    setInterval(function(){
        var colors = ['green','magenta','cyan','red','blue'];
        var text = ['A','B','C','D','E','F','G','H','I','J','K','L'];
        var value = Math.round(Math.random() * 100);
        lcd.setDisplay(value + text[value%12]);
        lcd.setOptions({
            color: colors[value%5],
            elementPadding: 4
        });
    }, update_interval);

    return lcd
}


export default lcd
