Front = {}

Front.navigate = function (path) {
  window.history.pushState({}, "ignore", path)
  
  // TODO: load the page
  Front.load()
}


Front.start = function () {
  $(window).on("popstate",Front.load)
  
  // Load the page
  Front.load()
}


Front.routes = [];
Front.route = function(path, callback) {
  // matches from start to finish url except ^ or ?
  
  path = path.replace(/:\w+/g, '([^/?]+)') // :permalink => ([^/?]+)
  
  var regexp = new RegExp("^" + path + "$")
  Front.routes.push({
    regexp: regexp,
    callback: callback
  })
}

Front.load = function () {
  var url = location.pathname
  console.log(url)
  
  // match the route
  for(var i = 0; i < Front.routes.length; i++){
    var route = Front.routes[i]
    var matches = url.match(route.regexp)
    
    if (matches) {
      // apply: covert array to list of arguments
      route.callback.apply(null, matches.slice(1))  // ["permalink"]
      return
    }
  }
}

