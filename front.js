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

//TIP: For new API, the context needs to be passed
Front.route = function(path, callback, context) {
  // matches from start to finish url except ^ or ?
  
  path = path.replace(/:\w+/g, '([^/?]+)') // :permalink => ([^/?]+)
  
  var regexp = new RegExp("^" + path + "$")
  Front.routes.push({
    regexp: regexp,
    callback: callback,
    context: context
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
    console.log(matches)
    if (matches) {
      route.callback.apply(route.context, matches.slice(1))  
      return
    }
  }
}


Front.Router = function (routes) {
  for(var path in routes) {
    var callback = routes[path]
    Front.route(path, callback, this)
  }
}


Front.Router.prototype.render = function(template, data) {
  var html = $("[data-template-name='" + template + "']").html()
  
  // TODO: cache compiledTemplate
  var compiledTemplate = Handlebars.compile(html)
  $("#content").html(compiledTemplate(data))
}