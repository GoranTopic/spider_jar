import contrib from 'blessed-contrib'
// the definition of the componenet type/

export interface Widget {
    label?: string;
    data?: any;
    style?: any;
    xLabelPadding?: number;
    xPadding?: number;
    grid: contrib.grid;
    location: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
