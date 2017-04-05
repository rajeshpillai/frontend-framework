Front = {}

Front.navigate = function (path) {
  window.history.pushState({}, "ignore", path)
  
  // TODO: load the page
  Front.load()
}


Front.start = function () {
  $(window).on("popstate",Front.load)
}


Front.load = function () {
  var url = location.pathname
  console.log(url)
}
