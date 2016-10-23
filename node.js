const BG = '#333';


//
let topo = new Topo();
let startNode = new BNode('start', topo);
let nextNode = new BNode('next', topo);
let anotherNode = new BNode('another', topo);
let yetAnotherNode = new BNode('yet another', topo);
let endnode = new BNode('end', topo);

startNode.connectTo(nextNode);
startNode.connectTo(anotherNode);
nextNode.connectTo(endnode);
nextNode.connectTo(yetAnotherNode);

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
    // drawLine
    drawBezier({
        x: from.x + from.w / 2,
        y: from.y + from.h / 2,
    }, {
        x: to.x + to.w / 2,
        y: to.y + to.h / 2,
    });
}

function drawBezier(from, to) {
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 4;

    const midx = from.x * 0.5 + to.x * 0.5;
    const midy = from.y * 0.5 + to.y * 0.5;
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    
    let x0, x1, y0, y1;
    if (dx > dy) {
        // for horizontal connections
        x0 = midx; y0 = from.y;
        x1 = midx; y1 = to.y;
        // debugPoint(midx, from.y);
        // debugPoint(midx, to.y);
    }
    else {
        // for vertical connections
        x0 = from.x; y0 = midy;
        x1 = to.x; y1 = midy;
        // debugPoint(from.x, midy);
        // debugPoint(to.x, midy);
    }

    ctx.beginPath()
    ctx.moveTo(from.x, from.y);

    ctx.bezierCurveTo(    
        x0, y0,
        x1, y1,
        to.x, to.y);
    ctx.stroke();
}

function debugPoint(x, y) {
    ctx.fillStyle = 'pink'
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
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

let click = new ClickHandler()

animate();

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
