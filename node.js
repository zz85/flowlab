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

startNode.connectTo(nextNode);

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
      // draw nodes
      for (let target of node.connections) {
          drawConnection(node, target);
      }

      // draw bounds
      ctx.fillStyle = 'blue';
      const bounds = node.bounds;
      ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);

      // draw name
      ctx.fillStyle = 'yellow';
      ctx.fillText(node.name, bounds.x, bounds.y);
  }
}

function drawConnection(from, to) {
    from = from.bounds;
    to = to.bounds;
    drawLine({
        x: from.x + from.w / 2,
        y: from.y + from.h / 2,
    }, {
        x: to.x + to.w / 2,
        y: to.y + to.h / 2,
    });
}

function drawLine(from, to) {
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.beginPath()
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

function animate() {
    render(topo);
    setTimeout(animate, 30);
}

animate();

let nodeDown = null;

document.body.addEventListener('mousedown', (e) => {
  const mx = e.layerX;
  const my = e.layerY;
  const node = findNode(mx, my);
  if (node) {
      console.log('Node', node);
    nodeDown = {
        offset: {
            x: mx - node.bounds.x,
            y: my - node.bounds.y
        },
        node: node
    }
  }
})

document.body.addEventListener('mousemove', (e) => {
  const mx = e.layerX;
  const my = e.layerY;

  if (nodeDown) {
     const { node, offset } = nodeDown;
     const { bounds } = node;
     bounds.x = mx - offset.x;
     bounds.y = my - offset.y;
  }
  else {
      const node = findNode(mx, my);
      if (node) {
          canvas.style.cursor = 'pointer';
      }
      else {
          canvas.style.cursor = 'auto';
      }
  }
})

document.body.addEventListener('mouseup', (e) => {
  nodeDown = null;
})



function findNode(mx, my) {
    for (let node of topo.nodes) {
      const bounds = node.bounds;

      if (bounds.x <= mx &&
          mx <= bounds.x + bounds.w &&
          bounds.y <= my &&
          my <= bounds.y + bounds.h) {
        return node;
      }
  }
}

document.body.appendChild(canvas);
