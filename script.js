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
    this.parserURL = "/parse";
    this.lexerURL = "/tokenize";
  }

  tokenize(sourceCode) {
    return fetch(this.lexerURL, {
      method: "POST",
      headers: {
        "Content-Type": "plain/text;charset=utf-8",
      },
      body: sourceCode,
    })
      .then(response => response.text())
      .then(text => (this.lexerOutput = text))
      .catch(e => { /* ignore */ });
  }

  parse(sourceCode) {
    return fetch(this.parserURL, {
      method: "POST",
      headers: {
        "Content-Type": "plain/text;charset=utf-8",
      },
      body: sourceCode,
    })
      .then(response => response.text())
      .then(text => (this.parserOutput = text))
      .catch(e => { /* ignore */ });
  }
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

  setViewTokensHighlightRange(f) {
    this.viewTokensHighlightRange = f;
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

        self.viewTokensHighlightRange(startRow, startCol, endRow, endCol);
        self.editorHighlightLines(startRow, endRow);

        if (startRow == endRow)
          self.editorHighlightText(startRow, startCol, startRow, endCol);
      });
    });
  }

  highlightRange(startRow, startCol, endRow, endCol) {
    this.clearHighlight();

    const inside = (sr, sc, er, rc) => {
      return sr >= startRow && sc >= startCol && er <= endRow && rc <= endCol;
    }

    let current = null;
    let elems = Array.prototype.slice.call($$(".tree-node"));

    elems.forEach(function (elem) {
      const sr = parseInt(elem.dataset.startRow);
      const sc = parseInt(elem.dataset.startCol);
      const er = parseInt(elem.dataset.endRow);
      const ec = parseInt(elem.dataset.endCol);

      if (!inside(sr, sc, er, ec))
        return;

      if (current == null) {
        current = elem;
        return;
      }

      const cur_sr = parseInt(current.dataset.startRow);
      const cur_sc = parseInt(current.dataset.startCol);
      const cur_er = parseInt(current.dataset.endRow);
      const cur_ec = parseInt(current.dataset.endCol);

      const     dr =     sr -     er;
      const     dc =     sc -     ec;
      const cur_dr = cur_sr - cur_er;
      const cur_dc = cur_sc - cur_ec;

      if (dr <= cur_dr)
        current = elem;
      else if (dr === cur_dr && dc <= cur_dc)
        current = elem;
    });

    this.highlightNode(current);
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

      compiler.tokenize(this.editorDoc.getValue())
        .then(_ => viewTokens.render());
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
      { className: "editor-highlight-range" }
    );
  }

  clearHighlight() {
    for (let i = 0; i <= 10000; i++)
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight");
  }
}

class ViewTokens {
  constructor(c) {
    this.container = c;
  }

  render() {
    let self = this;

    let tokens = null;

    try {
      tokens = JSON.parse(compiler.lexerOutput).tokens;
    } catch (e) {
      /* ignore errors for now */
    }

    if (!tokens)
      return;

    clearElem(this.container);

    tokens.forEach((e) => {
      let container = createElem("div", "token");
      let label = createElem("div", "label");
      let lexem = createElem("div", "lexem");

      label.innerHTML = e.type;
      lexem.innerHTML = e.lexem;

      container.dataset.col = e.col;
      container.dataset.row = e.row;
      container.dataset.lexem = e.lexem;

      container.appendChild(label);
      container.appendChild(lexem);

      container.classList.add(e.metatype);

      this.container.appendChild(container);
    });

    this.initHighlighting()
  }

  initHighlighting() {
    let self = this;

    let elems = Array.prototype.slice.call(
      $$("#lex-container .token")
    );

    elems.forEach(function (elem) {
      elem.addEventListener("mouseover", function () {
        const row = parseInt(elem.dataset.row);
        const col = parseInt(elem.dataset.col);
        const lexem = elem.dataset.lexem;

        self.clearHighlight();
        self.highlightRange(row, col, row, col + lexem.length);

        self.editorHighlightLines(row, row);
        self.editorHighlightText(row, col, row, col + lexem.length);
        self.CSTViewHighlightRange(row, col, row, col + lexem.length);
      });
    });
  }

  highlightRange(startRow, startCol, endRow, endCol) {
    let self = this;

    self.clearHighlight();

    const inside = (sr, sc, er, rc) => {
      if (startRow == endRow)
        return sr >= startRow && sc >= startCol && er <= endRow && rc <= endCol;

      if (sr >= startRow && er <= endRow)
        return true;

      return sr >= startRow && sc >= startCol && er <= endRow && rc <= endCol;
    }

    let elems = Array.prototype.slice.call(
      $$("#lex-container .token")
    );

    let insideElements = [];

    elems.forEach(function (elem) {
      const row = parseInt(elem.dataset.row);
      const col = parseInt(elem.dataset.col);
      const endCol = col + elem.dataset.lexem.length;

      if (inside(row, col, row, endCol))
        insideElements.push(elem);
    });

    insideElements.forEach(function (elem, i) {
      const first = i == 0;
      const last = insideElements.length - 1 == i;
      self.highlightNode(elem, {first: first, last: last});
    });
  }

  highlightNode(node, pos) {
    let highlight = createElem("div", "lex_high");

    if (pos.first)
      highlight.classList.add("lex_high_first");

    if (pos.last)
      highlight.classList.add("lex_high_last");

    const container_x = this.container.getBoundingClientRect().x;
    const node_x = node.getBoundingClientRect().x;
    const dx = Math.abs(container_x - node_x);

    highlight.style.marginLeft = `${-dx}px`;
    highlight.style.paddingLeft = `${dx}px`;

    wrap(node, highlight);
  }

  clearHighlight() {
    let a = Array.prototype.slice.call($$(".lex_high"));
    a.forEach(unwrap);
  }

  setEditorHighlightLinesCallback(f) {
    this.editorHighlightLines = f;
  }

  setEditorHighlightTextCallback(f) {
    this.editorHighlightText = f;
  }

  setCSTViewHighlightRange(f) {
    this.CSTViewHighlightRange = f;
  }
}

let viewCST = new ViewCST($("#cst-container"));
let compiler = new Compiler();
let codeEditor = new CodeEditor($("#code-editor"));
let viewTokens = new ViewTokens($("#lex-container"));

document.body.onload = () => {
  codeEditor.initOnChange(compiler, viewCST, viewTokens);

  viewCST.setViewTokensHighlightRange(viewTokens.highlightRange.bind(viewTokens));
  viewCST.setEditorHighlightLinesCallback(codeEditor.highlightLineRange.bind(codeEditor));
  viewCST.setEditorHighlightTextCallback(codeEditor.highlightRange.bind(codeEditor));

  viewTokens.setEditorHighlightLinesCallback(codeEditor.highlightLineRange.bind(codeEditor));
  viewTokens.setEditorHighlightTextCallback(codeEditor.highlightRange.bind(codeEditor));
  viewTokens.setCSTViewHighlightRange(viewCST.highlightRange.bind(viewCST));

  compiler.parse(codeEditor.getValue())
    .then(_ => viewCST.render());

  compiler.tokenize(codeEditor.getValue())
    .then(_ => viewTokens.render());
}
