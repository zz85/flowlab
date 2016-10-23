class Bounds {
    constructor(x, y, w, h) {
        return this.set(x, y, w, h);
    }

    set(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        return this;
    }
}

class BNode {
  constructor(name, topo) {
    this.name = name;
    this.connections = new Set();
    topo.add(this);
    this.bounds = new Bounds();
  }

  connectTo(node) {
    this.connections.add(node);
  }
}

class Topo {
  constructor() {
    this.nodes = new Set();
  }

  add(node) {
      this.nodes.add(node);
  }
  
  // adjust the positions of the node
  layout() {
    //   this.simple_layout();
      this.graph_layout()
  }

  // simple layout
  simple_layout() {
    let x = 100;
    const w = 60, h = 20;
    for (let node of this.nodes) {
        node.bounds.set(x, 50, w, h);
        x += 200;
    }
  }
  
  graph_layout() {
      let visited = new Set();
      let x = 100;
      let y = 50;
      

      let i = 0;

    //   const grid = new Array2D(); 
      const col_last = [];
      
      for (let node of this.nodes) {
          traverseNode(node, visited, i, col_last);
      }
  }
  
  // TODO viz graph or some other kind of layouts
  
  // saves topo to some serailzable json form 
  serialize() {
      
  }
}

function traverseNode(node, visited, i, col_last) {
    const w = 60, h = 20;

    if (visited.has(node)) return;
    visited.add(node);
    if (col_last[i]) {
        col_last[i]++ 
    }
    else {
        col_last[i] = 1;
    } 

    console.log(i, col_last[i]);

    const x = 50 + i * 200;
    const y = 50 + col_last[i] * 100;

    node.bounds.set(x, y, w, h);
    i++;

    // children first
    for (let connection of node.connections) {
        traverseNode(connection, visited, i, col_last);
    }
}


// class Array2D {
//     constructor() {
//         this.values = [];
//     }
    
//     set(x, y, value) {
//         if (!this.values[y]) this.values[y] = [];
//         this.values[y][x] = value;
//     }
    
//     get(x, y) {
//         if (this.values[y]) return this.values[y][x];
//         return;
//     }
    
//     nextAvailableSpace(node) {
        
//     }
    
// }