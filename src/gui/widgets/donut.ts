import contrib from 'blessed-contrib'
import { Widget } from './types'

let update_interval = 500 // ms

let pct = 0.00;

function donut({ grid, location, data }: Widget): contrib.Widgets.DonutElement {
    /**
     * Donut Options
     self.options.radius = options.radius || 14; // how wide is it? over 5 is best
     self.options.arcWidth = options.arcWidth || 4; //width of the donut
     self.options.yPadding = options.yPadding || 2; //padding from the top
     */
    var donut = grid.set(
        location.y, location.x, location.h, location.w,
        contrib.donut, 
        {
            label: 'Percent Donut',
            radius: 16,
            arcWidth: 4,
            yPadding: 2,
            data: [{label: 'Storage', percent: 87}]
        })
        // donut component
        function updateDonut(){
            if (pct > 0.99) pct = 0.00;
            var color = "green";
            if (pct >= 0.25) color = "cyan";
            if (pct >= 0.5) color = "yellow";
            if (pct >= 0.75) color = "red";  
            donut.setData([
                // @ts-ignore
                {percent: parseFloat((pct+0.00) % 1).toFixed(2), label: 'storage', 'color': color}
            ]);
            pct += 0.01;
        }
        setInterval(function() {   
            updateDonut();
        }, update_interval);

    // donut component
    return donut
}


export default donut
