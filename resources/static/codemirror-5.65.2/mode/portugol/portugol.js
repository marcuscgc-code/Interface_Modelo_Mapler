(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
      mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
      define(["../../lib/codemirror"], mod);
    else // Plain browser env
      mod(CodeMirror);
  })(function(CodeMirror) {
    "use strict";
  
    CodeMirror.defineMode("portugol", function(config) {
      var keywords = {
        "inicio": "keyword", "fim": "keyword", "variaveis": "keyword",
        "se": "keyword", "senao": "keyword", "enquanto": "keyword",
        "para": "keyword", "faca": "keyword", "retorne": "keyword",
        "funcao": "keyword"
      };
  
      var types = {
        "inteiro": "builtin", "real": "builtin", "cadeia": "builtin",
        "logico": "builtin", "caractere": "builtin"
      };
  
      var builtins = {
        "escrever": "keyword", "ler": "keyword", "verdadeiro": "atom",
        "falso": "atom"
      };
  
      var isOperatorChar = /[+\-*&%=<>!|]|<-/;

  
      function tokenBase(stream, state) {
        var ch = stream.next();
        
        // modificaçao do termo "<-"
        if (ch === "<" && stream.eat("-")) {
            return "assignment"; 
        }
        
        if (ch === "/" && stream.eat("/")) {
          stream.skipToEnd();
          return "comment";
        }
        if (ch === '"' || ch === "'") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        }
        if (/[;,]/.test(ch)) {
            return "operator"; // Branco para vírgulas e ponto e vírgula
        }
        
        if (/:/.test(ch)) {
            return "punctuation"; // Azul para dois pontos
        }
        
        if (/[{}\[\]()]/.test(ch)) {
            return null; // Não modifica outros caracteres
        }
        if (/\d/.test(ch)) {
          stream.eatWhile(/[\d.]/);
          return "number";
        }
        if (isOperatorChar.test(ch)) {
          stream.eatWhile(isOperatorChar);
          return "operator";
        }
        if (/[\w_]/.test(ch)) {
          stream.eatWhile(/[\w_]/);
          var cur = stream.current();
          if (keywords.hasOwnProperty(cur)) return keywords[cur];
          if (types.hasOwnProperty(cur)) return types[cur];
          if (builtins.hasOwnProperty(cur)) return builtins[cur];
          return "variable";
        }
  
        return null;
      }
  
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, next;
          while ((next = stream.next()) != null) {
            if (next === quote && !escaped) break;
            escaped = !escaped && next === "\\";
          }
          if (!escaped) state.tokenize = null;
          return "string";
        };
      }
  
      return {
        startState: function() {
          return {tokenize: null};
        },
        token: function(stream, state) {
          if (state.tokenize) {
            return state.tokenize(stream, state);
          }
          return tokenBase(stream, state);
        },
        lineComment: "//"
      };
    });
  
    CodeMirror.defineMIME("text/x-portugol", "portugol");
  });
  