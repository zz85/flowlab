class ClickHandler {
    constructor() {
        this.nodeDown = null;
        this.handles = {};
        this.handle();
    }
    
    bind(k, f) {
        this.handles[k] = f.bind(this);
        document.body.addEventListener(k, this.handles[k]);
    }
    
    unbind(k) {
        document.body.removeEventListener(k, this.handles[k]);
    }
    
    handle() {
        this.bind('mousedown', this.onmousedown)
        this.bind('mousemove', this.onmousemove)
        this.bind('mouseup', this.onmouseup)
    }
    
    unhandle() {
        for (let k in this.handles) {
            this.unbind(k);
        }
    }

    onmousedown(e) {
        const mx = e.layerX;
        const my = e.layerY;
        const node = findNode(mx, my);
        if (node) {
            console.log('Node', node);
            this.nodeDown = {
                offset: {
                    x: mx - node.bounds.x,
                    y: my - node.bounds.y
                },
                node: node
            }
        }
    }
    
    onmousemove(e) {
        const mx = e.layerX;
        const my = e.layerY;

        if (this.nodeDown) {
            const { node, offset } = this.nodeDown;
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
    }
    
    onmouseup(e) {
        this.nodeDown = null;
    }
}