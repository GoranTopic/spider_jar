import blessed from 'blessed';
import contrib from 'blessed-contrib';


const screen = blessed.screen({
  smartCSR: true,
  title: 'Blessed Window with Four Panels'
});

// Create a grid layout
var grid = new contrib.grid({rows: 2, cols: 2, screen: screen});

// Add four boxes to the grid
var box1 = grid.set(0, 0, 1, 1, blessed.box, {
  content: 'Top Left',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: '#f0f0f0'
    }
  }
});

var box2 = grid.set(0, 1, 1, 1, blessed.box, {
  content: 'Top Right',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'green',
    border: {
      fg: '#f0f0f0'
    }
  }
});

var box3 = grid.set(1, 0, 1, 1, blessed.box, {
  content: 'Bottom Left',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'red',
    border: {
      fg: '#f0f0f0'
    }
  }
});

var box4 = grid.set(1, 1, 1, 1, blessed.box, {
  content: 'Bottom Right',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'yellow',
    border: {
      fg: '#f0f0f0'
    }
  }
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();
