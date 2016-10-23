const BG = '#333';

// Biz Logic

class BNode {
  constructor(name, topo) {
    this.name = name;
    this.connects = new Set();
    top.add(this);
//     this.bounds = {x, y, w, h};
  }
  
  connectTo(node) {
    this.connects.add(node);
  }
}

class Topo {
  constructor() {
    this.nodes = new Set();    
  }

  add(node) {
      this.nodes.add(node);
  }
  
  layout() {
    for (let n of this.nodes) {
      console.log(n);
    }
  }
}

// 
let topo = new Topo();
let startNode = new BNode('start', topo);
let nextNode = new BNode('next', topo);
let endnode = new BNode('end', topo);

topo.layout();

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

render();

document.body.appendChild(canvas);
