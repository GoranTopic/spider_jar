import * as blessed from 'blessed';
import * as contrib from 'blessed-contrib';

interface MakeWidget {
    make_widget: (options: any) => any;
    x?: number;
    y?: number;
    width: number;
    height: number;
    style?: any;
}

class Window {
    private grid: contrib.grid;
    private gridWidth: number;
    private gridHeight: number;
    private currentX: number;
    private currentY: number;
    private rowHeight: number;
    private makers: MakeWidget[];
    private widgets: contrib.Widgets.WidgetElements[];

    constructor({ width = 12, height = 12, grid, makers }: {
        width: number,
        height: number,
        grid: contrib.grid,
        makers: MakeWidget[]
    }) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.currentX = 0;
        this.currentY = 0;
        this.rowHeight = 0;
        this.grid = grid;
        // save maker for later use
        this.makers = makers;
        this.widgets = [];
    }

    add({ make_widget, x, y, width, height, style }: MakeWidget): void {
        // if we have the x and y, skip positioning
        if(x !== undefined && y !== undefined){
            // save maker for later use
            this.makers.push({ make_widget, x, y, width, height });
            //console.log('Adding widget at x & y', this.currentX, this.currentY);
            // create widget
            this.widgets.push( make_widget({
                grid: this.grid, 
                location: { x, y, w: width, h: height },
                style,
            }) );
        }
        // 
        if (this.currentX + width >= this.gridWidth) {
            this.currentX = 0;
            this.currentY += this.rowHeight;
            this.rowHeight = 0;
        }
        //console.log('this.gridHeight:', this.gridHeight);
        //console.log('this.currentY + height', this.currentY, ' + ', height)
        if (this.currentY + height > this.gridHeight) {
            console.error('Widget does not fit in the window');
            process.exit();
        }
        //console.log('Adding widget at', this.currentX, this.currentY);
        // create widget
        this.widgets.push( make_widget({
            grid: this.grid, 
            location: {
                x: this.currentX, y: this.currentY, w: width, h: height,
            },
            style: style || { fg: 'white', border: { fg: 'cyan' } }
        }) );
        this.currentX += width;
        this.rowHeight = Math.max(this.rowHeight, height);
    }
     

    destroy(): void {
        this.widgets.forEach(w => w.destroy());
        this.widgets = [];
        this.currentX = 0;
        this.currentY = 0;
        this.rowHeight = 0;
    }

    mount(): void {
        this.makers.forEach(m => this.add(m));
    }

    getWidgets(): contrib.Widgets.WidgetElements[] {
        return this.widgets;
    }
}

export default Window;
