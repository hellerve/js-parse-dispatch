# parse-dispatch

A node type dispatcher for JavaScript.

## Rationale

Have you ever wished you could just rewrite your
fancy webapp in Brainfuck? Me neither! Now we can
do that anyway.

```javascript
aFancyInterpreter = function(program) {
  // evaluate the program
}
addImplementation("text/fancy", aFancyInterpreter);
// now we can write foreign code in script tags, à la
// <script type="text/fancy">Fancy code</script>
```

It even works with nodes that are inserted dynamically!

An example can be found in
[index.html](https://github.com/hellerve/js-parse-dispatch/blob/master/index.html).
It runs "Hello World" in Brainfuck.

## Installation

I did not make installation easy for you because I have
no idea how to make the distribution of JavaScript code
for the browser painless. Just download the script, I guess.

## FAQ

*Are you sure that is a good idea?*
I am pretty sure it is not. It is an awful hack, but
it works pretty well and if you really decide to build
anything with it I will gladly maintain this.

*Why?*
[Because it is there.](https://www.youtube.com/watch?v=jN3439l4HR0)

<hr/>

Have fun!
