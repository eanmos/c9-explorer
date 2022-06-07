class ViewTokens {
  constructor(c) {
    this.container = c;
    this.highlightCodeError = null;
  }

  render() {
    let self = this;

    let result = null;
    let tokens = null;

    try {
      result = JSON.parse(compiler.lexerOutput);
    } catch (e) {
      console.error(e);
      return;
    }

    console.assert(compiler.lexerOutput);
    console.assert(result);

    if (result.tokens) {
      tokens = result.tokens;
      self.clearCodeErrorHighlight();
    } else {
      if (result.errcode == "LEX_BADTOK") {
        let msg = '';
        let pad = "";
        for (let i = 0; i <= result.col; i++) pad += "&nbsp;";
        msg = pad + "⌃ <span class=\"error-message-title\">Lexical Error</span>: unrecognized token."
        self.highlightCodeError(result.row, result.col, msg);
        return;
      }
    }

    if (!tokens)
      return;

    clearElem(this.container);

    let top = createElem("div", "lex-root");

    tokens.forEach((e) => {
      let container = createElem("div", "token");
      let label = createElem("div", "label");
      let lexem = createElem("div", "lexem");

      label.innerHTML = e.type;
      lexem.innerHTML = e.lexem;

      container.dataset.col = e.col;
      container.dataset.row = e.row;
      container.dataset.lexem = e.lexem;

      let icon = createElem("img");
      icon.width = '12';
      icon.height = '12';
      icon.style.marginRight = '4px';
      icon.src = "/img/symbol-field.svg";

      container.appendChild(icon);

      container.appendChild(label);
      container.appendChild(lexem);

      container.classList.add(e.metatype);

      top.appendChild(container);
    });

    this.container.appendChild(top);

    let banner = createElem("div", "banner");
    banner.innerHTML = "LEX";
    this.container.appendChild(banner);

    this.initHighlighting()
    return true;
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

  setEditorHighlightCodeError(f) {
    this.highlightCodeError = f;
  }

  setClearErrorHighlightCallback(f) {
    this.clearCodeErrorHighlight = f;
  }
}
