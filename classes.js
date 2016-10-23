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
      let i = 0;

      const col_last = [];

      for (let node of this.nodes) {
          traverseNode(node, visited, i, col_last);
      }
  }

  // TODO viz graph or some other kind of layouts

  // saves topo to some serailzable json form
  serialize() {
      const list = [];
      const uuid = new Map();
      let i = 0;
      for (var node of this.nodes) {
          uuid.set(node, Date.now() + '-' + i);
          i++;
      }

      for (var node of this.nodes) {
          const {
              name, bounds, connections
            } = node;
            const c = Array.from(connections).map(c => uuid.get(c));
          list.push({
              name, bounds, connections: c, uuid: uuid.get(node)
          });
      }
      return list;
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

    const x = 50 + i * 200;
    const y = 50 + col_last[i] * 100;

    node.bounds.set(x, y, w, h);
    i++;

    // children first
    for (let connection of node.connections) {
        traverseNode(connection, visited, i, col_last);
    }
}

function saveLayout() {
    localStorage.layout = JSON.stringify(topo.serialize());
}

function loadLayout(topo) {
    try {
        const json = JSON.parse(localStorage.layout);
        const uuid = new Map();

        topo.nodes = new Set();

        json.forEach(j => {
            console.log(j);
            const node = new BNode(j.name, topo);
            node.bounds = j.bounds;
            uuid.set(j.uuid, node);
        });

        json.forEach(j => {
            const node = uuid.get(j.uuid)
            j.connections.map(id => uuid.get(id)).forEach(n => {
                node.connections.add(n);
            })
        });

        // for (let [id, node] of uuid) {
        //   top.
        // } 
    }
    catch (e) {
        console.log('Cannot load localstorage json', e.stack);
    }
}