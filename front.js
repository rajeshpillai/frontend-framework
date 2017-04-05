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
  Front.routes.push({
    path: path,
    callback: callback
  })
}

Front.load = function () {
  var url = location.pathname
  console.log(url)
  
  // match the route
  for(var i = 0; i < Front.routes.length; i++){
    var route = Front.routes[i]
    if (url === route.path) {
      route.callback()
      return
    }
  }
}

