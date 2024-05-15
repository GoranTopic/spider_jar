import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

//dummy data logs
var servers = ['US1', 'US2', 'EU1', 'AU1', 'AS1', 'JP1']
var commands = ['grep', 'node', 'java', 'timer',
    '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']

function log({ grid, location, data, style }: Widget): contrib.Widgets.LogElement {
    let log = grid.set(
        location.y, location.x, location.h, location.w,
        contrib.log, 
        style
    )

    //set log dummy data
    setInterval(function() {
        var rnd = Math.round(Math.random()*2)
        if (rnd==0) log.log('starting process ' + commands[Math.round(Math.random()*(commands.length-1))])   
            else if (rnd==1) log.log('terminating server ' + servers[Math.round(Math.random()*(servers.length-1))])
                else if (rnd==2) log.log('avg. wait time ' + Math.random().toFixed(2))
    }, update_interval)

    return log;
}


export default log
