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
    this.currentErrorHighlight = null;
    this.errorWidget = null;
  }

  highlightError(row, col, msg) {
    this.clearErrorHighlight();

    this.currentErrorHighlight = this.editorDoc.markText(
      { line: row, ch: col },
      { line: row, ch: col + 1},
      { className: "editor-highlight-error" }
    );

    this.highlightErrorLineRange(row, row);

    let errmsg = createElem("div", "error-message");
    errmsg.innerHTML = msg;
    this.errorWidget = this.editorDoc.addLineWidget(row, errmsg, {className: "error-message"});
  }

  addBordersToHighlight() {
    for (let i = 0; i < this.editorDoc.lineCount(); i++) {
      if (!this.lineIsHighlighted(i))
        continue;

      if (!this.lineIsHighlighted(i - 1))
        this.editorDoc.addLineClass(i, "wrap", "editor-highlight-first");

      if (!this.lineIsHighlighted(i + 1))
        this.editorDoc.addLineClass(i, "wrap", "editor-highlight-last");
    }
  }

  lineIsHighlighted(n) {
    const info = this.editorDoc.lineInfo(n);
    if (!info || !info.wrapClass) return false;
    return info.wrapClass.includes("editor-highlight");
  }

  initOnChange(compiler, viewCST) {
    this.codemirror.on("change", () => {
      compiler.tokenize(codeEditor.getValue())
        .then(_ => viewTokens.render())
        .then(success => success
          ? compiler.parse(codeEditor.getValue()).then(_ => viewCST.render())
          : false);
    });
  }

  getValue() {
    return this.editorDoc.getValue();
  }

  highlightErrorLineRange(start, end) {
    // this.clearErrorHighlight();

    for (let i = start; i <= end; i++)
      this.editorDoc.addLineClass(i, "wrap", "editor-highlight-error");
  }

  highlightLineRange(start, end) {
    this.clearHighlight();

    for (let i = start; i <= end; i++)
      this.editorDoc.addLineClass(i, "wrap", "editor-highlight");

    this.addBordersToHighlight()
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

  clearErrorHighlight() {
    for (let i = 0; i <= this.editorDoc.lineCount(); i++) {
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight-error");
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight-error-first");
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight-error-last");
    }

    if (this.errorWidget)
      this.errorWidget.clear();

    if (this.currentErrorHighlight)
      this.currentErrorHighlight.clear();
  }

  clearHighlight() {
    for (let i = 0; i <= this.editorDoc.lineCount(); i++) {
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight");
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight-first");
      this.editorDoc.removeLineClass(i, "wrap", "editor-highlight-last");
    }
  }
}
