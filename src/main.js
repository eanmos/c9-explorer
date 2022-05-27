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

function stringifyTokenType(t) {
  switch (t) {
    case "TOKEN_EOI": return "end of input";
    default: return t;
  }
}

let viewCST = new ViewCST($("#cst-container"));
let compiler = new Compiler();
let codeEditor = new CodeEditor($("#code-editor"));
let viewTokens = new ViewTokens($("#lex-container"));
let viewAST = new ViewAST();

document.body.onload = () => {
  codeEditor.initOnChange(compiler, viewCST, viewTokens, viewAST);
  console.log(viewAST);

  viewCST.setViewTokensHighlightRange(viewTokens.highlightRange.bind(viewTokens));
  viewCST.setEditorHighlightLinesCallback(codeEditor.highlightLineRange.bind(codeEditor));
  viewCST.setEditorHighlightTextCallback(codeEditor.highlightRange.bind(codeEditor));
  viewCST.setEditorHighlightCodeError(codeEditor.highlightError.bind(codeEditor));
  viewCST.setClearErrorHighlightCallback(codeEditor.clearErrorHighlight.bind(codeEditor));

  viewTokens.setEditorHighlightLinesCallback(codeEditor.highlightLineRange.bind(codeEditor));
  viewTokens.setEditorHighlightTextCallback(codeEditor.highlightRange.bind(codeEditor));
  viewTokens.setCSTViewHighlightRange(viewCST.highlightRange.bind(viewCST));
  viewTokens.setEditorHighlightCodeError(codeEditor.highlightError.bind(codeEditor));
  viewTokens.setClearErrorHighlightCallback(codeEditor.clearErrorHighlight.bind(codeEditor));

  compiler.tokenize(codeEditor.getValue())
    .then(_ => viewTokens.render())
    .then(success =>
        success && compiler.parse(codeEditor.getValue())
            .then(_ => viewCST.render())
            .then(success => 
                success && compiler.genast(codeEditor.getValue())
                    .then(_ => viewAST.render())));
}
