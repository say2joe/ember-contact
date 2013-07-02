var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('application', {
    path: '*:'
  });
  this.resource('contact', {
    path: '/contacts/:contact_id'
  });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    App.sortContacts();
    return App.Contacts;
  },
  renderTemplate: function() {
    this.render({
      outlet: 'add'
    });
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return App.Contacts[params.contact_id];
  },
  renderTemplate: function() {
    this.render('view');
  }
});

App.sortContacts = function() {
  App.Contacts.sort(function(a, b) {
    return a.name.substr(0, 1).toUpperCase() > b.name.substr(0, 1).toUpperCase();
  });
};

App.ContactController = Ember.ObjectController.extend({
  isAdding: true,
  isEditing: false,

  add: function() {
    this.set('isAdding', true);
  },

  save: function() {
    this.set('isAdding', false);
    this.set('list', 'j'.toUpperCase());
  },

  edit: function() {
    this.set('isEditing', true);
  },

  remove: function() {
    //
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.set('list', 'j'.toUpperCase());
  }
});

/** Sample (seed) Data: **/
App.Contacts = [{
  id: 1,
  list: 'J',
  name: "Joe Johnson",
  phone: "657-464-HTML",
  email: "say2joe@gmail.com"
}, {
  id: 2,
  list: 'E',
  name: "Ember Doe",
  phone: "123-123-1234",
  email: "help@emberjs.com"
}];

/** Miscellany: (To be removed in production) **/
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context:");
  console.log("====================");
  console.log(this);
  if (optionalValue) {
    console.log("Value:");
    console.log("====================");
    console.log(optionalValue);
  }
});
