import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

//dummy transactions 
var data1 = {
    title: 'USA',
    style: {line: 'red'},
    x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30'],
    y: [0, 20, 40, 45, 45, 50, 55, 70, 65, 58, 50, 55, 60, 65, 70, 80, 70, 50, 40, 50, 60, 70, 82, 88, 89, 89, 89, 80, 72, 70]
}

var data2 = {
    title: 'Europe',
    style: {line: 'yellow'},
    x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30'],
    y: [0, 5, 5, 10, 10, 15, 20, 30, 25, 30, 30, 20, 20, 30, 30, 20, 15, 15, 19, 25, 30, 25, 25, 20, 25, 30, 35, 35, 30, 30]
}

function line({ grid, location, data, style }: Widget): contrib.Widgets.LineElement {
    let line = grid.set(
        location.y, location.x, location.w, location.h,
        contrib.line,
        style
    )
    // set line data
    function setLineData(mockData:any , line:any) {
        for (var i=0; i<mockData.length; i++) {
            var last = mockData[i].y[mockData[i].y.length-1]
            mockData[i].y.shift()
            var num = Math.max(last + Math.round(Math.random()*10) - 5, 10)    
            mockData[i].y.push(num)  
        }
        line.setData(mockData)
    }
    // set data
    setInterval(() => {
        setLineData([data1, data2], line)
    } , update_interval)
    // return 
    return line;
}


export default line
