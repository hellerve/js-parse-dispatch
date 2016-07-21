// This interpreter was shamelessly stolen from https://github.com/skilldrick/brainfuck-js/blob/master/js/brainfuck.js
var brainfuck = (function () {
  var input;
  var data;
  var ptr;
  var debug = false;
  var output = "";

  var log = function(chr) {
    if (chr == "\n") {
      console.log(output);
      output = "";
    } else {
      output += chr
    }
  };

  var ops = {
    '+': function () {
      data[ptr] = data[ptr] || 0;
      data[ptr]++;
      debug && console.log('+', data[ptr], ptr);
    },

    '-': function () {
      data[ptr] = data[ptr] || 0;
      data[ptr]--;
      debug && console.log('-', data[ptr], ptr);
    },

    '<': function () {
      ptr--;
      if (ptr < 0) {
        ptr = 0; //Don't allow pointer to leave data array
      }
      debug && console.log('<', ptr);
    },

    '>': function () {
      ptr++;
      debug && console.log('>', ptr);
    },

    '.': function () {
      var c = String.fromCharCode(data[ptr]);
      log(c);
      debug && console.log('.', c, data[ptr]);
    },

    ',': function () {
      var c = input.shift();
      if (typeof c == "string") {
        data[ptr] = c.charCodeAt(0);
      }
      debug && console.log(',', c, data[ptr]);
    },
  };

  function program(nodes) {
    return function (inputString) {
      data = [];
      ptr = 0;

      input = inputString && inputString.split('') || [];

      nodes.forEach(function (node) {
        node();
      });

      return data[ptr];
    }
  }

  function loop(nodes) {
    return function () {
      var loopCounter = 0;

      while(data[ptr] > 0) {
        if (loopCounter++ > 10000) { throw "Infinite loop detected"; }

        nodes.forEach(function (node) {
          node();
        });
      }
    };
  }



  var programChars;

  function parseProgram() {
    var nodes = [];
    var nextChar;

    while (programChars.length > 0) {
      nextChar = programChars.shift();
      if (ops[nextChar]) {
        nodes.push(ops[nextChar]);
      } else if (nextChar == '[') {
        nodes.push(parseLoop());
      } else if (nextChar == ']') {
        throw "Missing opening bracket";
      } else {
        // ignore it
      }
    }

    return program(nodes);
  }

  function parseLoop() {
    var nodes = [];
    var nextChar;

    while (programChars[0] != ']') {
      nextChar = programChars.shift();
      if (nextChar == undefined) {
        throw "Missing closing bracket";
      } else if (ops[nextChar]) {
        nodes.push(ops[nextChar]);
      } else if (nextChar == '[') {
        nodes.push(parseLoop());
      } else {
        // ignore it
      }
    }
    programChars.shift(); //discard ']'

    return loop(nodes);
  }

  function parse(str) {
    programChars = str.split('');
    return parseProgram();
  }

  return parse;
})();

// pretend there is no input
addImplementation("text/brainfuck", function(prog) {return brainfuck(prog)();});
