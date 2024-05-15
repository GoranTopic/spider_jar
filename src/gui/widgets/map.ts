import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

let proxy_locations = [
    {lon: "-79.0000", lat: "37.5000", color: 'red', char: 'X'},
    {lon: "-122.6819", lat: "45.5200", color: 'red', char: 'X'},
    {lon: "-6.2597", lat: "53.3478", color: 'red', char: 'X'},
    {lon: "103.8000", lat: "1.3000", color: 'yellow', char: 'X'}
]

function map( { grid, location } : Widget) : contrib.Widgets.MapElement {
    let map : contrib.Widgets.MapElement = grid.set(
        location.y, location.x, location.h, location.w, 
        contrib.map, 
        {label: 'Servers Location'}
    )
    let marker = true
    setInterval(function() {
        if (marker) {
            for (let loc of proxy_locations) 
                // @ts-ignore
                map.addMarker(loc)
        } else {
            // @ts-ignore
            map.clearMarkers()
        }
        marker =! marker
    }, update_interval)
    // return 
    return map;
}

export default map
