var posts = [
  {
    permalink: 'introducing-front',
    title: '10 reasons Front is the best framework ever',
    content: "<ol><li>Front is really the best of the bests, no doubts about it.</li><li>Have you used it? Then you don't know.</li><li>It's super incredibly amazing. Like double what you'd expect from a framework but even better, at the same time.</li><li>Try it now... Please!</li><li>Not sure I can list 10 reasons actually...</li><li>It's good.</li><li>No bugs.</li><li>OK, I give up.</li></ol>"
  },
  {
    permalink: 'how-to-use-front',
    title: 'How to use the Front framework like a boss',
    content: '<p>Just RTFM already.</p><p><em>(TODO write manual)</em></p>'
  },
]

// Define the routes
Front.route('/', function () {
  var html = $("[data-template-name='index'").html()
  var template = Handlebars.compile(html)
  $("#content").html(template({ posts: posts}))
})

Front.route('/introducing-front', function () {
  var html = $("[data-template-name='post'").html()
  var post = _.findWhere(posts, { permalink: 'introducing-front'})
  var template = Handlebars.compile(html)
  $("#content").html(template(post))
})

Front.route('/how-to-use-front', function () {
  var html = $("[data-template-name='post'").html()
  var post = _.findWhere(posts, { permalink: 'how-to-use-front'})
  var template = Handlebars.compile(html)
  $("#content").html(template(post))
})




$(document).on("click", "a", function () {
  
  Front.navigate(this.href)
  return false  // prevent default event
})

Front.start()  // start the framework
