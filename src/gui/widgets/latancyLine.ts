import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms


let latencyData = {
   x: ['t1', 't2', 't3', 't4'],
   y: [5, 1, 7, 5]
}



function latancyLine( { grid, location } : Widget) : contrib.Widgets.LineElement {
    var latencyLine = grid.set(
        location.x, location.y, location.h, location.w,
        contrib.line, 
        { style: { line: "yellow" , text: "green" , baseline: "black"} , 
            xLabelPadding: 3 , 
            xPadding: 5 , 
            label: 'Network Latency (sec)'
        }
    )

    setInterval(function() {
        setLineData([latencyData], latencyLine)
    }, update_interval)

    function setLineData(mockData: any[], line: contrib.Widgets.LineElement) {
        for (var i=0; i<mockData.length; i++) {
            var last = mockData[i].y[mockData[i].y.length-1]
            mockData[i].y.shift()
            var num = Math.max(last + Math.round(Math.random()*10) - 5, 10)    
            mockData[i].y.push(num)  
        }
        line.setData(mockData)
    }


    // return 
    return latencyLine
}

export default latancyLine
