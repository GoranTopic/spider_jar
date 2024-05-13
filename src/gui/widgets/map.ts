import contrib from 'blessed-contrib'
import { widget } from './widget'

let update_interval = 500 // ms

let proxy_locations = [
    {lon: "-79.0000", lat: "37.5000", color: 'red', char: 'X'},
    {lon: "-122.6819", lat: "45.5200", color: 'red', char: 'X'},
    {lon: "-6.2597", lat: "53.3478", color: 'red', char: 'X'},
    {lon: "103.8000", lat: "1.3000", color: 'yellow', char: 'X'}
]


function map( { grid, location } : widget) : contrib.Widgets.MapElement {
    let map = grid.set(
        location.x, location.y, location.w, location.h, 
        contrib.map, 
        {label: 'Servers Location'}
    )
    let marker = true
    setInterval(function() {
        if (marker) {
            map.addMarker({lon: "-79.0000", lat: "37.5000", color: 'red', char: 'X'})
            map.addMarker({lon: "-122.6819", lat: "45.5200", color: 'red', char: 'X'})
            map.addMarker({lon: "-6.2597", lat: "53.3478", color: 'red', char: 'X'})
            map.addMarker({lon: "103.8000", lat: "1.3000", color: 'yellow', char: 'X'})
        } else {
            map.clearMarkers()
        }
        marker =! marker
    }, update_interval)
    return map;
}

export default map
