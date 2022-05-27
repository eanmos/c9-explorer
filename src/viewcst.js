class ViewCST {
  constructor(elemDOM) {
    this.container = elemDOM;

    this.editorHighlightLines = null;
    this.editorHighlightText = null;
  }

  render() {
    let self = this;
    let cst = null;

    try {
      cst = JSON.parse(compiler.parserOutput);
    } catch (e) {
      console.error(e);
    }

    if (!cst)
      return;

    if (cst.err == "UNEXPECTED_TOKEN") {
      self.clearCodeErrorHighlight();
    
      let pad = "";
      for (let i = 0; i <= cst.col; i++) pad += "&nbsp;";

      let msg = '';

      if (cst.got.type === "TOKEN_EOI") {
        msg = pad + `⌃ <span class=\"error-message-title\">Syntax Error</span>: expected <span class="${cst.expected}">${stringifyTokenType(cst.expected)}</span> here.`;
      } else {
        msg = pad + `⌃ <span class=\"error-message-title\">Syntax Error</span>: expected <span class="${cst.expected}">${stringifyTokenType(cst.expected)}</span> but got <span class="${cst.got.type}">${cst.got.type}</span> <span class="lexem">${cst.got.lexem}</span>.`;
      }

      self.highlightCodeError(cst.row, cst.col, msg);
      return;
    } else if (cst.err == "UNEXPECTED_EOI") {
      self.clearCodeErrorHighlight();
    
      let msg = '';
      let pad = "";
      for (let i = 0; i <= cst.col; i++) pad += "&nbsp;";
      msg = pad + "⌃ <span class=\"error-message-title\">Syntax Error</span>: unxpected end of input.";
      self.highlightCodeError(cst.row, cst.col, msg);
      return;
    } else {
      console.assert(cst.errcode === undefined);
      console.assert(cst.err === undefined);
    }

    clearElem(this.container);
    this.container.appendChild(this.build(cst));

    this.initFolding();
    this.initHighlighting();
  
    return true;
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

  setEditorHighlightCodeError(f) {
    this.highlightCodeError = f;
  }

  setClearErrorHighlightCallback(f) {
    this.clearCodeErrorHighlight = f;
  }

  build(cst, parentContainer) {
    let node = createElem("div", "tree-node");
    var self = createElem("div", "self");
    var label = createElem("div", "label");

    console.assert(cst.start !== undefined);

    node.dataset.name = cst.name;
    node.dataset.type = cst.type;
    if (cst.lexem)
      node.dataset.lexem = cst.lexem;
    node.dataset.startRow = cst.start.row;
    node.dataset.startCol = cst.start.col;
    node.dataset.endRow = cst.end.row;
    node.dataset.endCol = cst.end.col;
    node.dataset.nchildren = cst.nchildren;

    label.classList.add(cst.name);

    label.innerHTML = cst.name;

    if (cst.type == "terminal")
      label.innerHTML += `<span class="lexem">${cst.lexem}</span>`;

    if (cst.nchildren > 0)
      self.appendChild(createElem("div", "arrow"));

    let icon = createElem("img");
    icon.width = '12';
    icon.height = '12';
    icon.style.marginRight = '4px';

    if (cst.nchildren > 0)
        icon.src = "/img/more.svg";
    else
        icon.src = "/img/symbol-field.svg";

    if (cst.type === "terminal")
    self.appendChild(icon);

    self.appendChild(label);
    node.appendChild(self);

    if (cst.nchildren > 0) {
      let children = createElem("div", "children");
      cst.children.forEach(c => this.build(c, children));
      node.appendChild(children);
    }

    if (cst.type === "terminal" || cst.nchildren > 0)
    if (parentContainer)
      parentContainer.appendChild(node);

    return node;
  }

  highlightNode(node) {
    console.assert(node);

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
