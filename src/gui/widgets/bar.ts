import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms



//dummy data logs
var servers = ['US1', 'US2', 'EU1', 'AU1', 'AS1', 'JP1']
var commands = ['grep', 'node', 'java', 'timer', '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']


function bar({ grid, location, data, style }: Widget): contrib.Widgets.BarElement {
    let bar = grid.set(
        location.y, location.x, location.w, location.h,
        contrib.bar, 
        style
    )
    //set dummy data on bar chart
    function fillBar() {
        var arr = []
        for (var i=0; i<servers.length; i++) {
            arr.push(Math.round(Math.random()*10))
        }
        bar.setData({titles: servers, data: arr})
    }
    fillBar()
    setInterval(fillBar, 2000)
    // return the widget
    return bar
}


export default bar
