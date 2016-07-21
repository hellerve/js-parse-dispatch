var addImplementation = (function() {
  let parsers = {};

  map = function(fun, l) {
    let newL = [];

    for (elem of l) newL.push(fun(elem));

    return newL;
  }

  handleMutation = function(mutations) {
    mutations.forEach(mutation => {
      map(handleDom, mutation.addedNodes);
    });
  }

  handleDom = function(node) {
    if (node.nodeName != "SCRIPT" || !parsers.hasOwnProperty(node.type)) {
      return null;
    }
    return parsers[node.type](node.innerHTML);
  }

  window.onload = () => {
    let scripts = document.getElementsByTagName("script");
    map(handleDom, scripts);

    let observer = new MutationObserver(handleMutation);
    observer.observe(document, {childList: true, subtree: true});
  }

  return function(name, fun) {
    parsers[name] = fun;
  };
})();
