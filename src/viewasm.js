class ViewASM {
    constructor(c) {
        console.assert(c);
        this.container = c;
        this.highlightCallbacks = [];
    }

    render() {
        console.assert(compiler.codegenOutput);

        let result = null;

        try {
            result = JSON.parse(compiler.codegenOutput);
        } catch (e) {
            return console.error(e);
        }

        console.assert(result);

        this.display(this.build(result));
    }

    build(n) {
        let div = createElem("div", "asm-root");

        for (const snippet of n) {
            let escaped = snippet.asm.replaceAll("\\n", "\n");

            let idiv = createElem("pre");
            idiv.innerHTML += hljs.highlight(escaped, {language: 'x86asm'}).value;
            idiv.dataset.startRow = snippet.start.row;
            idiv.dataset.endRow = snippet.end.row;
            idiv.dataset.startCol = snippet.start.col;
            idiv.dataset.endCol = snippet.end.col;
            
            let viewer = this;
            idiv.addEventListener("mouseover", function () {
                viewer.clearHighlight();
                viewer.highlight(idiv);

                for (let c of viewer.highlightCallbacks)
                    c(idiv.dataset.startRow, idiv.dataset.startCol, idiv.dataset.endRow, idiv.dataset.endCol);
            });

            div.appendChild(idiv);
        }

        return div;
    }

    // root is a DOM node that represents the whole AST
    display(root) {
        this.container.innerHTML = "";
        this.container.appendChild(root);

        let banner = createElem("div", "banner");
        banner.innerHTML = "ASM";
        this.container.appendChild(banner);
    }

    addHighlightCallback(f) {
        this.highlightCallbacks.push(f);
    }

    highlight(h) {
        h.classList.add('highlighted');
    }

    clearHighlight() {
        let h = Array.prototype.slice.call($$("#asm-container .highlighted"));
        h.forEach(t => t.classList.remove('highlighted'));
    }
}

