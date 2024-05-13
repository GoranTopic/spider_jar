import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

//dummy data logs
var commands = ['grep', 'node', 'java', 'timer', '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']


function table({ grid, location, data, style }: Widget): contrib.Widgets.TableElement {
    let table = grid.set(
        location.y, location.x, location.w, location.h,
        contrib.table,
        style
    )
    //set dummy data on bar chart
    function generateTable() {
        var data = []
        for (var i=0; i<30; i++) {
            var row = []          
            row.push(commands[Math.round(Math.random()*(commands.length-1))])
            row.push(Math.round(Math.random()*5))
            row.push(Math.round(Math.random()*100))
            data.push(row)
        }
        //set table data
        //@ts-ignore
        table.setData({headers: ['Process', 'Cpu (%)', 'Memory'], data: data})
    }
    generateTable()
    table.focus()
    setInterval(generateTable, update_interval)
    // return element
    return table
}


export default table
