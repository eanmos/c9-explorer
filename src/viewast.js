function foldNode(n) {
    console.log(n)
    let self = n.parentNode;
    let node = self.parentNode;
    let children = node.querySelector(".children");

    if (children) {
        children.classList.toggle("hidden");

        let arrow = self.querySelector(".arrow");
        arrow.classList.toggle("visible");
    }
}

function highlight(viewer, node) {
    let overlay = document.createElement("div");
    overlay.classList.toggle("highlighter");

    const container_x = viewer.container.getBoundingClientRect().x;
    const node_x = node.getBoundingClientRect().x;
    const dx = Math.abs(container_x - node_x);

    overlay.style.marginLeft = `${-dx}px`;
    overlay.style.paddingLeft = `${dx}px`;

    wrap(node, overlay);
}

class ViewAST {
    constructor(c) {
        console.assert(c);
        this.container = c;
        this.highlightCallbacks = [];
    }

    render() {
        console.assert(compiler.genastOutput);

        let result = null;

        try {
            if(compiler.genastOutput === "error") return;
            result = JSON.parse(compiler.genastOutput);
        } catch (e) {
            return console.error(e);
        }

        console.assert(result);

        this.display(this.build(result));
    }

    build(n) {
        console.assert(n);
        console.assert(n.kind);
        console.assert(n.start_row !== undefined);
        console.assert(n.start_col !== undefined);
        console.assert(n.end_row !== undefined);
        console.assert(n.end_col !== undefined);

        let node = createElem("div", "ast-node");

        node.dataset.kind = n.kind;
        node.dataset.startRow = n.start_row;
        node.dataset.startCol = n.start_col;
        node.dataset.endRow = n.end_row;
        node.dataset.endCol = n.end_col;

        let self = createElem("div", "self");
        let label = createElem("div", "label");

        label.innerHTML = n.kind;

        if (n.name) {
            label.innerHTML += `<span class='name'>${n.name}</span>`;
        }

        if (n.c_type) {
            label.innerHTML += `<span class='ctype'>${n.c_type}</span>`;
        }

        self.addEventListener("click", function () {
            foldNode(this);
        });

        let viewer = this;
        self.addEventListener("mouseover", function () {
            viewer.clearHighlight();
            highlight(viewer, this);

            for (let c of viewer.highlightCallbacks)
                c(n.start_row, n.start_col, n.end_row, n.end_col);
        });

        if (n.children && n.children.length > 0)
            self.appendChild(createElem("div", "arrow"));

        self.appendChild(label);
        node.appendChild(self);

        if (n.children && n.children.length > 0) {
            let children = createElem("div", "children");

            n.children.forEach(c =>
                children.appendChild(this.build(c))
            );

            node.appendChild(children);
        }

        return node;        
    }

    // root is a DOM node that represents the whole AST
    display(root) {
        this.container.innerHTML = "";
        this.container.appendChild(root);
    }

    addHighlightCallback(f) {
        this.highlightCallbacks.push(f);
    }

    clearHighlight() {
        let h = Array.prototype.slice.call($$("#ast-container .highlighter"));
        h.forEach(unwrap);
    }
}
