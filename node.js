const BG = '#333';

// Biz Logic

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
    this.connects = new Set();
    topo.add(this);
    this.bounds = new Bounds();
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
    var x = 0;
    for (let node of this.nodes) {
        x += 100;
        node.bounds.set(x, 50, 60, 20);
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

function render(topo) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let node of topo.nodes) {
      ctx.fillStyle = 'blue';
      const bounds = node.bounds;
      ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
      
      ctx.fillStyle = 'yellow';
      ctx.fillText(node.name, bounds.x, bounds.y);
  }
}

render(topo);

document.body.appendChild(canvas);
