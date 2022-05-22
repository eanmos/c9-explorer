const lex_out = '{"tokens":[{"type":"TOKEN_INT","lexem":"int","row":0,"col":0},{"type":"TOKEN_IDENTIFIER","lexem":"foo","row":1,"col":0},{"type":"TOKEN_LPAREN","lexem":"(","row":1,"col":3},{"type":"TOKEN_INT","lexem":"int","row":1,"col":4},{"type":"TOKEN_IDENTIFIER","lexem":"a","row":1,"col":8},{"type":"TOKEN_COMMA","lexem":",","row":1,"col":9},{"type":"TOKEN_INT","lexem":"int","row":1,"col":11},{"type":"TOKEN_IDENTIFIER","lexem":"b","row":1,"col":15},{"type":"TOKEN_RPAREN","lexem":")","row":1,"col":16},{"type":"TOKEN_LCURLY","lexem":"{","row":2,"col":0},{"type":"TOKEN_INT","lexem":"int","row":3,"col":1},{"type":"TOKEN_IDENTIFIER","lexem":"a","row":3,"col":5},{"type":"TOKEN_ASSIGN","lexem":"=","row":3,"col":7},{"type":"TOKEN_DECIMAL_CONST","lexem":"5","row":3,"col":9},{"type":"TOKEN_SEMICOLON","lexem":";","row":3,"col":10},{"type":"TOKEN_RETURN","lexem":"return","row":4,"col":1},{"type":"TOKEN_IDENTIFIER","lexem":"a","row":4,"col":8},{"type":"TOKEN_PLUS","lexem":"+","row":4,"col":10},{"type":"TOKEN_DECIMAL_CONST","lexem":"5","row":4,"col":12},{"type":"TOKEN_SEMICOLON","lexem":";","row":4,"col":13},{"type":"TOKEN_RCURLY","lexem":"}","row":5,"col":0}]}';
let cst_out = '{"name":"TranslationUnit","type":"nonterminal","nchildren":3,"start":{"row":0,"col":0},"end":{"row":5,"col":1},"children":[{"name":"ExternalDeclaration","type":"nonterminal","nchildren":1,"start":{"row":0,"col":0},"end":{"row":5,"col":1},"children":[{"name":"FunctionDefinition","type":"nonterminal","nchildren":3,"start":{"row":0,"col":0},"end":{"row":5,"col":1},"children":[{"name":"DeclarationSpecifiers","type":"nonterminal","nchildren":1,"start":{"row":0,"col":0},"end":{"row":0,"col":3},"children":[{"name":"TypeSpecifier","type":"nonterminal","nchildren":1,"start":{"row":0,"col":0},"end":{"row":0,"col":3},"children":[{"name":"TOKEN_INT","type":"terminal","lexem":"int","start":{"row":0,"col":0},"end":{"row":0,"col":3}}]}]},{"name":"Declarator","type":"nonterminal","nchildren":1,"start":{"row":1,"col":0},"end":{"row":1,"col":17},"children":[{"name":"DirectDeclarator","type":"nonterminal","nchildren":2,"start":{"row":1,"col":0},"end":{"row":1,"col":17},"children":[{"name":"TOKEN_IDENTIFIER","type":"terminal","lexem":"foo","start":{"row":1,"col":0},"end":{"row":1,"col":3}},{"name":"DirectDeclaratorPrime","type":"nonterminal","nchildren":3,"start":{"row":1,"col":3},"end":{"row":1,"col":17},"children":[{"name":"TOKEN_LPAREN","type":"terminal","lexem":"(","start":{"row":1,"col":3},"end":{"row":1,"col":4}},{"name":"ParameterTypeList","type":"nonterminal","nchildren":2,"start":{"row":1,"col":4},"end":{"row":1,"col":16},"children":[{"name":"ParameterList","type":"nonterminal","nchildren":2,"start":{"row":1,"col":4},"end":{"row":1,"col":16},"children":[{"name":"ParameterDeclaration","type":"nonterminal","nchildren":2,"start":{"row":1,"col":4},"end":{"row":1,"col":9},"children":[{"name":"DeclarationSpecifiers","type":"nonterminal","nchildren":1,"start":{"row":1,"col":4},"end":{"row":1,"col":7},"children":[{"name":"TypeSpecifier","type":"nonterminal","nchildren":1,"start":{"row":1,"col":4},"end":{"row":1,"col":7},"children":[{"name":"TOKEN_INT","type":"terminal","lexem":"int","start":{"row":1,"col":4},"end":{"row":1,"col":7}}]}]},{"name":"Declarator","type":"nonterminal","nchildren":1,"start":{"row":1,"col":8},"end":{"row":1,"col":9},"children":[{"name":"DirectDeclarator","type":"nonterminal","nchildren":1,"start":{"row":1,"col":8},"end":{"row":1,"col":9},"children":[{"name":"TOKEN_IDENTIFIER","type":"terminal","lexem":"a","start":{"row":1,"col":8},"end":{"row":1,"col":9}}]}]}]},{"name":"ParameterListPrime","type":"nonterminal","nchildren":3,"start":{"row":1,"col":9},"end":{"row":1,"col":16},"children":[{"name":"TOKEN_COMMA","type":"terminal","lexem":",","start":{"row":1,"col":9},"end":{"row":1,"col":10}},{"name":"ParameterDeclaration","type":"nonterminal","nchildren":2,"start":{"row":1,"col":11},"end":{"row":1,"col":16},"children":[{"name":"DeclarationSpecifiers","type":"nonterminal","nchildren":1,"start":{"row":1,"col":11},"end":{"row":1,"col":14},"children":[{"name":"TypeSpecifier","type":"nonterminal","nchildren":1,"start":{"row":1,"col":11},"end":{"row":1,"col":14},"children":[{"name":"TOKEN_INT","type":"terminal","lexem":"int","start":{"row":1,"col":11},"end":{"row":1,"col":14}}]}]},{"name":"Declarator","type":"nonterminal","nchildren":1,"start":{"row":1,"col":15},"end":{"row":1,"col":16},"children":[{"name":"DirectDeclarator","type":"nonterminal","nchildren":1,"start":{"row":1,"col":15},"end":{"row":1,"col":16},"children":[{"name":"TOKEN_IDENTIFIER","type":"terminal","lexem":"b","start":{"row":1,"col":15},"end":{"row":1,"col":16}}]}]}]},{"name":"ParameterListPrime","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]}]},{"name":"ParameterTypeListPrime","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"TOKEN_RPAREN","type":"terminal","lexem":")","start":{"row":1,"col":16},"end":{"row":1,"col":17}}]}]}]},{"name":"CompoundStatement","type":"nonterminal","nchildren":3,"start":{"row":2,"col":0},"end":{"row":5,"col":1},"children":[{"name":"TOKEN_LCURLY","type":"terminal","lexem":"{","start":{"row":2,"col":0},"end":{"row":2,"col":1}},{"name":"BlockItemList","type":"nonterminal","nchildren":2,"start":{"row":3,"col":1},"end":{"row":4,"col":14},"children":[{"name":"BlockItem","type":"nonterminal","nchildren":1,"start":{"row":3,"col":1},"end":{"row":3,"col":11},"children":[{"name":"Declaration","type":"nonterminal","nchildren":3,"start":{"row":3,"col":1},"end":{"row":3,"col":11},"children":[{"name":"DeclarationSpecifiers","type":"nonterminal","nchildren":1,"start":{"row":3,"col":1},"end":{"row":3,"col":4},"children":[{"name":"TypeSpecifier","type":"nonterminal","nchildren":1,"start":{"row":3,"col":1},"end":{"row":3,"col":4},"children":[{"name":"TOKEN_INT","type":"terminal","lexem":"int","start":{"row":3,"col":1},"end":{"row":3,"col":4}}]}]},{"name":"InitDeclaratorList","type":"nonterminal","nchildren":2,"start":{"row":3,"col":5},"end":{"row":3,"col":10},"children":[{"name":"InitDeclarator","type":"nonterminal","nchildren":3,"start":{"row":3,"col":5},"end":{"row":3,"col":10},"children":[{"name":"Declarator","type":"nonterminal","nchildren":1,"start":{"row":3,"col":5},"end":{"row":3,"col":6},"children":[{"name":"DirectDeclarator","type":"nonterminal","nchildren":1,"start":{"row":3,"col":5},"end":{"row":3,"col":6},"children":[{"name":"TOKEN_IDENTIFIER","type":"terminal","lexem":"a","start":{"row":3,"col":5},"end":{"row":3,"col":6}}]}]},{"name":"TOKEN_ASSIGN","type":"terminal","lexem":"=","start":{"row":3,"col":7},"end":{"row":3,"col":8}},{"name":"Initializer","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"AssignmentExpression","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"ConditionalExpression","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"LogicalOrExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"LogicalAndExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"InclusiveOrExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"ExclusiveOrExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"AndExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"EqualityExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"RelationalExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"ShiftExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"AdditiveExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"MultiplicativeExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"CastExpression","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"UnaryExpression","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"PostfixExpression","type":"nonterminal","nchildren":2,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"PrimaryExpression","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"Constant","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"IntegerConstant","type":"nonterminal","nchildren":1,"start":{"row":3,"col":9},"end":{"row":3,"col":10},"children":[{"name":"TOKEN_DECIMAL_CONST","type":"terminal","lexem":"5","start":{"row":3,"col":9},"end":{"row":3,"col":10}}]}]}]},{"name":"PostfixExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]}]}]},{"name":"MultiplicativeExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"AdditiveExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"ShiftExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"RelationalExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"EqualityExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"AndExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"ExclusiveOrExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"InclusiveOrExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"LogicalAndExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"LogicalOrExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]}]}]}]}]},{"name":"InitDeclaratorListTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"TOKEN_SEMICOLON","type":"terminal","lexem":";","start":{"row":3,"col":10},"end":{"row":3,"col":11}}]}]},{"name":"BlockItemListPrime","type":"nonterminal","nchildren":1,"start":{"row":4,"col":1},"end":{"row":4,"col":14},"children":[{"name":"BlockItem","type":"nonterminal","nchildren":1,"start":{"row":4,"col":1},"end":{"row":4,"col":14},"children":[{"name":"Statement","type":"nonterminal","nchildren":1,"start":{"row":4,"col":1},"end":{"row":4,"col":14},"children":[{"name":"JumpStatement","type":"nonterminal","nchildren":3,"start":{"row":4,"col":1},"end":{"row":4,"col":14},"children":[{"name":"TOKEN_RETURN","type":"terminal","lexem":"return","start":{"row":4,"col":1},"end":{"row":4,"col":7}},{"name":"Expression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"AssignmentExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"ConditionalExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"LogicalOrExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"LogicalAndExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"InclusiveOrExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"ExclusiveOrExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"AndExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"EqualityExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"RelationalExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"ShiftExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"AdditiveExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":13},"children":[{"name":"MultiplicativeExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":9},"children":[{"name":"CastExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":8},"end":{"row":4,"col":9},"children":[{"name":"UnaryExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":8},"end":{"row":4,"col":9},"children":[{"name":"PostfixExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":8},"end":{"row":4,"col":9},"children":[{"name":"PrimaryExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":8},"end":{"row":4,"col":9},"children":[{"name":"TOKEN_IDENTIFIER","type":"terminal","lexem":"a","start":{"row":4,"col":8},"end":{"row":4,"col":9}}]},{"name":"PostfixExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]}]}]},{"name":"MultiplicativeExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"AdditiveExpressionTail","type":"nonterminal","nchildren":3,"start":{"row":4,"col":10},"end":{"row":4,"col":13},"children":[{"name":"TOKEN_PLUS","type":"terminal","lexem":"+","start":{"row":4,"col":10},"end":{"row":4,"col":11}},{"name":"MultiplicativeExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":12},"end":{"row":4,"col":13},"children":[{"name":"CastExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":12},"end":{"row":4,"col":13},"children":[{"name":"UnaryExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":12},"end":{"row":4,"col":13},"children":[{"name":"PostfixExpression","type":"nonterminal","nchildren":2,"start":{"row":4,"col":12},"end":{"row":4,"col":13},"children":[{"name":"PrimaryExpression","type":"nonterminal","nchildren":1,"start":{"row":4,"col":12},"end":{"row":4,"col":13},"children":[{"name":"Constant","type":"nonterminal","nchildren":1,"start":{"row":4,"col":12},"end":{"row":4,"col":13},"children":[{"name":"IntegerConstant","type":"nonterminal","nchildren":1,"start":{"row":4,"col":12},"end":{"row":4,"col":13},"children":[{"name":"TOKEN_DECIMAL_CONST","type":"terminal","lexem":"5","start":{"row":4,"col":12},"end":{"row":4,"col":13}}]}]}]},{"name":"PostfixExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]}]}]},{"name":"MultiplicativeExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"AdditiveExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]}]},{"name":"ShiftExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"RelationalExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"EqualityExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"AndExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"ExclusiveOrExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"InclusiveOrExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"LogicalAndExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"LogicalOrExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]}]}]},{"name":"ExpressionTail","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}}]},{"name":"TOKEN_SEMICOLON","type":"terminal","lexem":";","start":{"row":4,"col":13},"end":{"row":4,"col":14}}]}]}]}]}]},{"name":"TOKEN_RCURLY","type":"terminal","lexem":"}","start":{"row":5,"col":0},"end":{"row":5,"col":1}}]}]}]},{"name":"TranslationUnitPrime","type":"nonterminal","nchildren":0,"start":{"row":0,"col":0},"end":{"row":0,"col":0}},{"name":"TOKEN_EOI","type":"nonterminal","nchildren":0,"start":{"row":5,"col":1},"end":{"row":5,"col":1}}]}';

var myCodeMirror = CodeMirror(document.getElementById("code-editor"), {
  lineNumbers: true,
  value: `int
foo(int a, int b)
{
	int a = 5;
	return a + 5;
}`,
  mode: "text/x-csrc",
  keyMap: "vim"
});

var doc = myCodeMirror.getDoc();
var text_mark = null;

myCodeMirror.on("change", () => {
  console.log(doc.getValue())

  let response = fetch('http://localhost:9000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: doc.getValue()
  }).then(response => response.text()).then(text => {cst_out = text; renderCST();})
});

// doc.markText({line: 0, ch: 0}, {line: 0, ch: 5}, {className: "editor-highlight", inclusiveLeft: true, inclusiveRight: true, selectRight: true, selectLeft: true, startStyle: "editor-highlight", endStyle: "editor-highlight"})

var cur_src_start_row = -1;
var cur_src_end_row = -1;

function src_highligh_range(start, end)
{
  for (var i = 0; i <= 1000; i++) {
  doc.removeLineClass(i, "wrap", "editor-highlight");
  }
  for (var i = start; i <= end; i++) {
    doc.addLineClass(i, "wrap", "editor-highlight")
  }
}

function src_highligh_text_range(line, start, end)
{
    if (text_mark) text_mark.clear();
    text_mark = doc.markText({line: line, ch: start}, {line: line, ch: end}, {className: "editor-highlight", inclusiveLeft: true, inclusiveRight: true, selectRight: true, selectLeft: true, startStyle: "editor-highlight", endStyle: "editor-highlight"})
}

function initHighlightingCST() {
  let elements = document.querySelectorAll(".tree-node .self .label");
  let elementsArray = Array.prototype.slice.call(elements);

  elementsArray.forEach(function(elem) {
    elem.addEventListener("mouseover", function(){
      let selfNode = this.parentNode;
      let treeNode = selfNode.parentNode;

      const start_row = parseInt(treeNode.querySelector('.start-row-info').innerHTML)
      const end_row = parseInt(treeNode.querySelector('.end-row-info').innerHTML)
      const start_col = parseInt(treeNode.querySelector('.start-col-info').innerHTML)
      const end_col = parseInt(treeNode.querySelector('.end-col-info').innerHTML)

      ClearHighlightCST();
      HighlightNodeCST(treeNode);

      if (start_row == end_row) {
        src_highligh_text_range(start_row, start_col, end_col);
      }
      src_highligh_range(start_row, end_row);
    });
  });

  function toggleElementVisibility(node) {
    node.style.display =
      node.style.display === "none" ? "block" : "none";
  }
}

function initTreeFolding() {
  let handler = function(){
      let selfNode = this.parentNode;
      let treeNode = selfNode.parentNode;
      let childrenNode = treeNode.querySelector(".children");

      if (childrenNode) {
        toggleElementVisibility(childrenNode);

        let arrowNode = selfNode.querySelector(".arrow");

        if (arrowNode)
          arrowNode.classList.toggle("visible");
      }
  };

  let elements = document.querySelectorAll(".tree-node .self .arrow");
  let elementsArray = Array.prototype.slice.call(elements);

  elementsArray.forEach(function(elem) {
    elem.addEventListener("click", handler);
  });

  let elements2 = document.querySelectorAll(".tree-node .self .label");
  let elementsArray2 = Array.prototype.slice.call(elements2);

  elementsArray2.forEach(function(elem) {
    elem.addEventListener("click", handler);
  });

  function toggleElementVisibility(node) {
    node.style.display =
      node.style.display === "none" ? "block" : "none";
  }
}

function foldAllCST() {
  let elements = document.querySelectorAll(".tree-node .children");
  let elementsArray = Array.prototype.slice.call(elements);

  elementsArray.forEach(function(elem) {
    elem.style.display = "none";
  });
}

function renderCST() {
  var cst = JSON.parse(cst_out);
  var container = document.getElementById('cst-container');
  container.innerHTML = "";
  var nodediv = renderCSTNode(cst, null);

  container.appendChild(nodediv);
initTreeFolding();
  initHighlightingCST();
  // foldAllCST();
}

function renderCSTNode(node, par) {
  var node_div = document.createElement('div');
  var self_div = document.createElement('div');
  var label_div = document.createElement('div');

  const start_row = node.start.row;
  const end_row = node.end.row;
  const start_col = node.start.col;
  const end_col = node.end.col;

  var start_row_div = document.createElement('div');
  start_row_div.classList.toggle("start-row-info");
  start_row_div.innerHTML = start_row

  var end_row_div = document.createElement('div');
  end_row_div.classList.toggle("end-row-info");
  end_row_div.innerHTML = end_row

  var start_col_div = document.createElement('div');
  start_col_div.classList.toggle("start-col-info");
  start_col_div.innerHTML = start_col

  var end_col_div = document.createElement('div');
  end_col_div.classList.toggle("end-col-info");
  end_col_div.innerHTML = end_col

  node_div.appendChild(start_row_div);
  node_div.appendChild(end_row_div);
  node_div.appendChild(start_col_div);
  node_div.appendChild(end_col_div);

  label_div.classList.toggle("label");
  label_div.innerHTML = node.name;

  self_div.classList.toggle("self");
  if (node.type == "nonterminal" && node.nchildren > 0) {
    var arrdiv = document.createElement('div');
    arrdiv.classList.toggle("arrow");
    self_div.appendChild(arrdiv);
  }

  self_div.appendChild(label_div);

  node_div.classList.toggle("tree-node");
  node_div.appendChild(self_div);

    if (node.type == "nonterminal" && node.nchildren > 0) {
    var children_div = document.createElement('div');
    children_div.classList.toggle("children");

    for (var i = 0; i < node.nchildren; i++) {
      var child = node.children[i];
      renderCSTNode(child, children_div);
    }

    node_div.appendChild(children_div);
  }

  if (par)
    par.appendChild(node_div);

  return node_div;
}

function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

function unwrap(el) {
el.replaceWith(...el.childNodes)
}

function HighlightNodeCST(div)
{
  var highlight = document.createElement('div');
  highlight.classList.toggle("cst_high");

var cst_container = document.getElementById("cst-container")
  var cst_con_x = cst_container.getBoundingClientRect().x
  var div_x = div.getBoundingClientRect().x
  var dx = Math.abs(cst_con_x - div_x)

  highlight.style.marginLeft = `${-dx}px`;
  highlight.style.paddingLeft = `${dx}px`;
  wrap(div, highlight);
}

function ClearHighlightCST()
{
  let elements = document.querySelectorAll(".cst_high");
  let elementsArray = Array.prototype.slice.call(elements);

  elementsArray.forEach(function(elem) {
    unwrap(elem);
  });

}

renderCST();

