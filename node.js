const BG = '#333';


//
let topo = new Topo();
let startNode = new BNode('start', topo);
let nextNode = new BNode('next', topo);
let endnode = new BNode('end', topo);

startNode.connectTo(nextNode);
nextNode.connectTo(endnode);


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
