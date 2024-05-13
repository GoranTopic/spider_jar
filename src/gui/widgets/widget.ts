import contrib from 'blessed-contrib'
// the definition of the componenet type/

export interface widget {
  label?: string;
  data?: any;
  grid: contrib.grid;
  location: {
      x: number;
      y: number;
      w: number;
      h: number;
  };
}
