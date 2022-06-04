class Compiler {
  constructor() {
    this.lexerOutput = null;
    this.parserOutput = null;
    this.genastOutput = null;
    this.codegenOutput = null;
    this.parserURL = "/parse";
    this.lexerURL = "/tokenize";
    this.genastURL = "/genast";
    this.codegenURL = "/codegen";
  }

  tokenize(sourceCode) {
    console.assert(sourceCode !== undefined && sourceCode !== null);
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
    console.assert(sourceCode !== undefined && sourceCode !== null);
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

  genast(sourceCode) {
    console.assert(sourceCode !== undefined && sourceCode !== null);
    return fetch(this.genastURL, {
      method: "POST",
      headers: {
        "Content-Type": "plain/text;charset=utf-8",
      },
      body: sourceCode,
    })
      .then(response => response.text())
      .then(text => (this.genastOutput = text))
      .catch(e => console.error(e));
  }

  codegen(sourceCode) {
    console.assert(sourceCode !== undefined && sourceCode !== null);
    return fetch(this.codegenURL, {
      method: "POST",
      headers: {
        "Content-Type": "plain/text;charset=utf-8",
      },
      body: sourceCode,
    })
      .then(response => response.text())
      .then(text => (this.codegenOutput = text))
      .catch(e => console.error(e));
  }
}
