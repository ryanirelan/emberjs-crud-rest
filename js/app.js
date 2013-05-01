App = Ember.Application.create({ LOG_TRANSITIONS: true});

App.Router.map(function() {
  this.route("index", { path: "/" });
  this.route("about", { path: "/about" });


 //this.route("locations", { path: "/locations" });
  
  this.resource("locations", function(){
      console.log("Inside locations....");
      this.route("new", {path:"/new"});
      this.route("edit", {path: "/:location_id" });
  });

  //this.route("locations/edit", { path: "/locations/:location_id" });

});

App.ApplicationController = Ember.Controller.extend({
  
  // some property of our controller.
  globalString: 'this is the application string',

});

App.Adapter = DS.RESTAdapter.extend({
  serializer: DS.RESTSerializer.extend({
    primaryKey: function (type){
      return '_id';
   }
  })
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'App.Adapter'
});

DS.RESTAdapter.reopen({
  url: 'http://localhost:3000'
});


App.Location = DS.Model.extend({
    latitude: DS.attr('string'),
    longitude: DS.attr('string'),
    accuracy: DS.attr('string')

});

App.LocationsIndexRoute = Ember.Route.extend({
  
  model: function() {
    return App.Location.find();
  },

  renderTemplate: function() {
    this.render('locations.index',{into:'application'});
  }

});

App.LocationsEditRoute = Ember.Route.extend({

  renderTemplate: function() {
    console.log("Rendering template...");
    this.render('locations.edit',{into:'application'});
  }

});



