let $ = (s) => document.querySelector(s);
let $$ = (s) => document.querySelectorAll(s);

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

function unwrap(el) {
  el.replaceWith(...el.childNodes);
}

function createElem(el, cls) {
  let e = document.createElement(el);
  e.classList.add(cls);
  return e;
}

function clearElem(n) {
  n.innerHTML = "";
}

/*
===========================================================

Compiler

===========================================================
*/

class Compiler {
  constructor() {
    this.lexerOutput = null;
    this.parserOutput = null;
    this.url = "http://localhost:9000";
  }

  parse(sourceCode) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "plain/text;charset=utf-8",
      },
      body: sourceCode,
    })
      .then(response => response.text())
      .then(text => (this.parserOutput = text))
      .catch(e => { /* ignore */ });
  };
}

/*
===========================================================

ViewCST

===========================================================
*/

class ViewCST {
  constructor(elemDOM) {
    this.container = elemDOM;

    this.editorHighlightLines = null;
    this.editorHighlightText = null;
  }

  render() {
    let cst = null;

    try {
      cst = JSON.parse(compiler.parserOutput);
    } catch (e) {
      /* ignore errors for now */
    }

    if (!cst)
      return;

    clearElem(this.container);
    this.container.appendChild(this.build(cst));

    this.initFolding();
    this.initHighlighting();
  }

  setEditorHighlightLinesCallback(f) {
    this.editorHighlightLines = f;
  }

  setEditorHighlightTextCallback(f) {
    this.editorHighlightText = f;
  }

  build(cst, parentContainer) {
    let node = createElem("div", "tree-node");
    var self = createElem("div", "self");
    var label = createElem("div", "label");

    node.dataset.startRow = cst.start.row;
    node.dataset.startCol = cst.start.col;
    node.dataset.endRow = cst.end.row;
    node.dataset.endCol = cst.end.col;

    label.innerHTML = cst.name;

    if (cst.nchildren > 0)
      self.appendChild(createElem("div", "arrow"));

    self.appendChild(label);
    node.appendChild(self);

    if (cst.nchildren > 0) {
      let children = createElem("div", "children");
      cst.children.forEach(c => this.build(c, children));
      node.appendChild(children);
    }

    if (parentContainer)
      parentContainer.appendChild(node);

    return node;
  }

  highlightNode(node) {
    let highlight = document.createElement("div");
    highlight.classList.toggle("cst_high");

    const container_x = this.container.getBoundingClientRect().x;
    const node_x = node.getBoundingClientRect().x;
    const dx = Math.abs(container_x - node_x);

    highlight.style.marginLeft = `${-dx}px`;
    highlight.style.paddingLeft = `${dx}px`;

    wrap(node, highlight);
  }

  clearHighlight() {
    let a = Array.prototype.slice.call($$(".cst_high"));
    a.forEach(unwrap);
  }

  fold() {
    let elems = Array.prototype.slice.call($$(".tree-node .children"));

    elems.forEach(function (e) {
      e.classList.add("hidden");
    });
  }

  initFolding() {
    let arrows = Array.prototype.slice.call($$(".tree-node .self .arrow"));
    let labels = Array.prototype.slice.call($$(".tree-node .self .label"));
    let elems = arrows.concat(labels);

    elems.forEach(function (e) {
      e.addEventListener("click", function () {
        let self = this.parentNode;
        let tree = self.parentNode;
        let children = tree.querySelector(".children");

        if (children) {
          children.classList.toggle("hidden");

          let arrow = self.querySelector(".arrow");
          arrow.classList.toggle("visible");
        }
      });
    });
  }

  initHighlighting() {
    let self = this;

    let elems = Array.prototype.slice.call(
      $$(".tree-node .self .label")
    );

    elems.forEach(function (elem) {
      elem.addEventListener("mouseover", function () {
        let selfNode = this.parentNode;
        let treeNode = selfNode.parentNode;

        const startRow = parseInt(treeNode.dataset.startRow);
        const endRow = parseInt(treeNode.dataset.endRow);
        const startCol = parseInt(treeNode.dataset.startCol);
        const endCol = parseInt(treeNode.dataset.endCol);

        self.clearHighlight();
        self.highlightNode(treeNode);

        self.editorHighlightLines(startRow, endRow);

        if (startRow == endRow)
          self.editorHighlightText(startRow, startCol, startRow, endCol);
      });
    });
  }
}

class CodeEditor {
  constructor(container) {
    const DEFAULT_CODE = `int
foo(int a, int b)
{
	int a = 5;
	return a + 5;
}`;

    this.codemirror = CodeMirror(container, {
      lineNumbers: true,
      value: DEFAULT_CODE,
      mode: "text/x-csrc",
      keyMap: "vim",
    });

    this.editorDoc = this.codemirror.getDoc();
    this.currentHighlight = null;
  }

  initOnChange(compiler, viewCST) {
    this.codemirror.on("change", () => {
      compiler.parse(this.editorDoc.getValue())
        .then(_ => viewCST.render());
    });
  }

  getValue() {
    return this.editorDoc.getValue();
  }

  highlightLineRange(start, end) {
    this.clearHighlight();

    for (let i = start; i <= end; i++)
      this.editorDoc.addLineClass(i, "wrap", "editor-highlight");
  }

  highlightRange(startRow, startCol, endRow, endCol) {
    if (this.currentHighlight)
      this.currentHighlight.clear();

    this.currentHighlight = this.editorDoc.markText(
      { line: startRow, ch: startCol },
      { line: endRow, ch: endCol },
      { className: "editor-highlight" }
    );
  }

  clearHighlight() {
    for (let i = 0; i <= 10000; i++)
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight");
  }
}

let viewCST = new ViewCST($("#cst-container"));
let compiler = new Compiler();
let codeEditor = new CodeEditor($("#code-editor"));

document.body.onload = () => {
  codeEditor.initOnChange(compiler, viewCST);
  viewCST.setEditorHighlightLinesCallback(codeEditor.highlightLineRange.bind(codeEditor));
  viewCST.setEditorHighlightTextCallback(codeEditor.highlightRange.bind(codeEditor));

  compiler.parse(codeEditor.getValue())
    .then(_ => viewCST.render());
}