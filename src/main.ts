import blessed from 'blessed'
import contrib from 'blessed-contrib'
import Window from './gui/window'
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

let donutWindow = new Window({ 
    grid, 
    height: 12, 
    width: 12,
    makers: [ 
        { make_widget: donut, width: 12, height: 4, },
        { make_widget: lcd, width: 5, height: 5,
            style: {
                display: 546, 
                segmentWidth: 0.06, 
                segmentInterval: 0.11, 
                strokeWidth: 0.1, 
                elements: 5, 
                elementSpacing: 4, 
                elementPadding: 2
            }
        },
        //{ make_widget: bar, width: 4, height: 4, },
        //{ make_widget: table, width: 4, height: 2, },
        //{ make_widget: sparkline, width: 3, height: 4, },
        //{ make_widget: line, width: 4, height: 4, },
        { make_widget: map, width: 4, height: 4 },
        //{ make_widget: donut, width: 3, height: 3 }
    ]
})

let mapWindow = new Window({
    grid,
    height: 12,
    width: 12,
    makers: [
        { make_widget: map, width: 12, height: 12 }
    ]
})

let currentWindow = donutWindow;

currentWindow.mount();

screen.on('resize', () => {
    currentWindow.getWidgets().forEach( e => e.emit('resize') );
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// arrow left
screen.key(['m'], function(ch, key) {
    currentWindow.destroy();
    currentWindow = mapWindow;
    currentWindow.mount();
});

// arrow left
screen.key(['l'], function(ch, key) {
    currentWindow.destroy();
    currentWindow = donutWindow;
    currentWindow.mount();
});

setInterval(() => {
    screen.render()
}, 100)

screen.render()
