import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

let gauge_percent = 0;

function gauge({ grid, location, data }: Widget): contrib.Widgets.GaugeElement {
    var gauge = grid.set(
        location.y, location.x, location.h, location.w,
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
