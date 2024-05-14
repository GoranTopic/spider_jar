import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { 
    map, 
    donut,
    sparkline,
    bar,
    lcd,
    table,
    line,
} from './gui/widgets'

var screen = blessed.screen()

//create layout and widgets

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

grid

let elements = [
    // donut widget
    donut({ grid, location: { x: 8, y: 8, w: 4, h: 2 } }),
    // map widget
    map({ grid, location: { x: 6, y: 0, w: 6, h: 6 } }),
    // sparkline widget
    sparkline({ grid, location: { x: 10, y: 10, w: 2, h: 2 } }),
    // bar widget
    /*
       bar({ grid, 
       location: { x: 5, y: 6, w: 4, h: 3 },
       style: { label: 'Server Utilization (%)',
       barWidth: 4, barSpacing: 6, xOffset: 2, maxHeight: 9
       }
       }),
       */
    // table widget
    /*
       table({ grid, location: { x: 4, y: 9, w: 4, h: 3 },
       style: { 
       keys: true, 
       fg: 'green', 
       label: 'Active Processes', 
       columnSpacing: 1, 
       columnWidth: [24, 10, 10] 
       }
       }),
       */
    // line 
    line({ grid, 
         location: { x: 0, y: 0, w: 6, h: 6 },
         style: {
             showNthLabel: 5,
             maxY: 100,
             label: 'Total Transactions',
             showLegend: true,
             legend: { width: 10 }
         }
    }),
]


screen.on('resize', () => {
    elements.forEach( e => e.emit('attach') );
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// arrow left
screen.key(['left'], function(ch, key) {
    map({ grid, location: { x: 8, y: 3, w: 6, h: 6 } })
});

setInterval(() => {
    screen.render()
}, 100)

screen.render()
