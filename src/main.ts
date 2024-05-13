import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { 
    map, 
    donut,
    sparkline,
    bar,
    table,
} from './gui/widgets'

var screen = blessed.screen()

//create layout and widgets

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

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


]



/*
 *
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

var lcdLineOne = grid.set(0,9,2,3, 
                          contrib.lcd,
  {
    label: "LCD Test",
    segmentWidth: 0.06,
    segmentInterval: 0.11,
    strokeWidth: 0.1,
    elements: 5,
    display: 3210,
    elementSpacing: 4,
    elementPadding: 2
  }
);


var errorsLine = grid.set(0, 6, 4, 3, contrib.line, 
  { style: 
    { line: "red"
    , text: "white"
    , baseline: "black"}
  , label: 'Errors Rate'
  , maxY: 60
  , showLegend: true })

var transactionsLine = grid.set(0, 0, 6, 6, contrib.line, 
          { showNthLabel: 5
          , maxY: 100
          , label: 'Total Transactions'
          , showLegend: true
          , legend: {width: 10}})

      /*
var log = grid.set(8, 6, 4, 2, contrib.log, 
  { fg: "green"
  , selectedFg: "green"
  , label: 'Server Log'})


//dummy data logs
var servers = ['US1', 'US2', 'EU1', 'AU1', 'AS1', 'JP1']
var commands = ['grep', 'node', 'java', 'timer', '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']


//set log dummy data
setInterval(function() {
   var rnd = Math.round(Math.random()*2)
   if (rnd==0) log.log('starting process ' + commands[Math.round(Math.random()*(commands.length-1))])   
   else if (rnd==1) log.log('terminating server ' + servers[Math.round(Math.random()*(servers.length-1))])
   else if (rnd==2) log.log('avg. wait time ' + Math.random().toFixed(2))
}, 500)


//set line charts dummy data

var transactionsData = {
   title: 'USA',
   style: {line: 'red'},
   x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30'],
   y: [0, 20, 40, 45, 45, 50, 55, 70, 65, 58, 50, 55, 60, 65, 70, 80, 70, 50, 40, 50, 60, 70, 82, 88, 89, 89, 89, 80, 72, 70]
}

var transactionsData1 = {
   title: 'Europe',
   style: {line: 'yellow'},
   x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30'],
   y: [0, 5, 5, 10, 10, 15, 20, 30, 25, 30, 30, 20, 20, 30, 30, 20, 15, 15, 19, 25, 30, 25, 25, 20, 25, 30, 35, 35, 30, 30]
}

var errorsData = {
   title: 'server 1',
   x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25'],
   y: [30, 50, 70, 40, 50, 20]
}

var latencyData = {
   x: ['t1', 't2', 't3', 't4'],
   y: [5, 1, 7, 5]
}

setLineData([transactionsData, transactionsData1], transactionsLine)
setLineData([errorsData], errorsLine)

setInterval(function() {
   setLineData([transactionsData, transactionsData1], transactionsLine)
   screen.render()
}, 500)

setInterval(function() {   
    setLineData([errorsData], errorsLine)
}, 1500)

setInterval(function(){
  var colors = ['green','magenta','cyan','red','blue'];
  var text = ['A','B','C','D','E','F','G','H','I','J','K','L'];

  var value = Math.round(Math.random() * 100);
  lcdLineOne.setDisplay(value + text[value%12]);
  lcdLineOne.setOptions({
    color: colors[value%5],
    elementPadding: 4
  });
  screen.render()
}, 1500);


function setLineData(mockData, line) {
  for (var i=0; i<mockData.length; i++) {
    var last = mockData[i].y[mockData[i].y.length-1]
    mockData[i].y.shift()
    var num = Math.max(last + Math.round(Math.random()*10) - 5, 10)    
    mockData[i].y.push(num)  
  }
  line.setData(mockData)
}
*/

screen.on('resize', () => {
    elements.forEach( e => e.emit('attach') );
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

setInterval(() => {
    screen.render()
}, 100)

screen.render()
