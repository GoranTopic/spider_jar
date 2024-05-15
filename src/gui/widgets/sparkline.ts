import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

var spark1 = [1,2,5,2,1,5,1,2,5,2,1,5,4,4,5,4,1,5,1,2,5,2,1,5,1,2,5,2,1,5,1,2,5,2,1,5]
var spark2 = [4,4,5,4,1,5,1,2,5,2,1,5,4,4,5,4,1,5,1,2,5,2,1,5,1,2,5,2,1,5,1,2,5,2,1,5]

function sparkline({ grid, location, data }: Widget): contrib.Widgets.SparklineElement {
    /**
     * Donut Options
     self.options.radius = options.radius || 14; // how wide is it? over 5 is best
     self.options.arcWidth = options.arcWidth || 4; //width of the donut
     self.options.yPadding = options.yPadding || 2; //padding from the top
     */
    var sparkline = grid.set(
        location.y, location.x, location.h, location.w,
        contrib.sparkline, {
            label: 'Throughput (bits/sec)',
            tags: true,
            style: { fg: 'blue', titleFg: 'white' }
        })
        // update data on the fly
        function refreshSpark() {
            spark1.shift()
            spark1.push(Math.random()*5+1)       
            spark2.shift()
            spark2.push(Math.random()*5+1)       
            sparkline.setData(['Server1', 'Server2'], [spark1, spark2])  
        }
        // set an interval to update the data
        setInterval(refreshSpark, update_interval)
    // return the widget
    return sparkline
}


export default sparkline
