Front = {}

Front.usePushState = !!(window.history && window.history.pushState)

Front.navigate = function (path) {
  if (Front.usePushState) {
    window.history.pushState({}, "ignore", path)
  }
  else {
    // IF THE URL is absolute make it relative
    path = path.replace(/(\/\/|[^\/])*/, "")
    window.location.hash = "#" + path
  }
  // TODO: load the page
  Front.load()
}


Front.start = function () {
  if (Front.usePushState) {
    $(window).on("popstate",Front.load)
  } else {
    $(window).on("hashchange", Front.load)
  }
  
  // Load the page 1st time
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
  if (Front.usePushState) {
    var url = location.pathname
  } else {
    var url = location.hash.slice(1) || "/"
  }
  
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

