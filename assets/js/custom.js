$(document).ready(function() {

 

  var app = $.spapp({
    pageNotFound : 'error_404', 
    templateDir: "./views/"
  }); // initialize

  // define routes
  app.route({
    view: 'home',
   load: "viewss/home.html"
  });
  app.route({view: 'katalog', load: 'katalog.html' });

  // run app
  app.run();

});