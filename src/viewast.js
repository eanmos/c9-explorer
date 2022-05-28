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

        let icon = createElem("img");
        icon.width = '12';
        icon.height = '12';
        icon.style.marginRight = '4px';

        if (n.children && n.children.length > 0)
            icon.src = "/img/symbol-class.svg";
        else
            icon.src = "/img/symbol-method.svg";

        self.appendChild(icon);

        self.appendChild(label);

        let icon2 = createElem("img", "info-icon");
        icon2.src = "/img/question.svg";
        icon2.addEventListener("mouseover", function () {
            this.classList.toggle("hovered");
        });
        icon2.addEventListener("mouseout", function () {
            this.classList.toggle("hovered");
        });
        icon2.addEventListener("click", function () {
            this.classList.toggle("hovered");
        });

        let tooltipe = createElem("div", "ast-node-tooltip");
        tooltipe.innerHTML =
`<div class='head'>
    <div class='kind'>
        <img src='${icon.src}' />
        <span>${n.kind}</span>
    </div>
    ${(n.name) ? `<div class='ast-node-attribute name'>Name: <span class='identifier'>${n.name}</span></div>` : ""}
    ${(n.c_type) ? `<div class='ast-node-attribute type'>Type: <span class='ctype2'>${n.c_type}</span></div>` : ""}
    ${(n.storage_class) ? `<div class='ast-node-attribute storage-class-specifier'>Storage Class Specifier: <span class='keyword'>${n.storage_class}</span></div>` : ""}
</div>`;
/* <div class='body'>
        <div>
            <b><code>5.1.1.1(1)</code></b> A C program need not all be translated at the same
            time. The text of the program is kept in units called source files,
            (or preprocessing files) in this International Standard. A source
            file together with all the headers and source files included via the
            preprocessing directive include is known as a preprocessing
            translation unit.  After preprocessing, a preprocessing translation
            unit is called a translation unit. Previously translated translation
            units may be preserved individually or in libraries.

            The separate translation units of a program communicate by (for
            example) calls to functions whose identifiers have external linkage,
            manipulation of objects whose identifiers have external linkage, or
            manipulation of data files. 
        </div>
</div>`; */

        tippy(icon2, {content: tooltipe, allowHTML: true, theme: 'custom', interactive: true, arrow: null});

        self.appendChild(icon2);

        self.addEventListener("mouseover", function () {
            icon2.style.display = "inline";
        });
        self.addEventListener("mouseout", function () {
            icon2.style.display = "none";
        });

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
