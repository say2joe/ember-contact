var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('application', {
    path: '*:'
  });
  this.resource('viewContact', {
    path: '/contacts/:contact_id'
  });
  this.resource('editContact', {
    path: '/contacts/:contact_id/edit'
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

App.ViewContactRoute = Ember.Route.extend({
  model: function(params) {
    return App.Contacts[params.contact_id];
  },
  renderTemplate: function() {
    this.render('view');
  }
});

App.EditContactRoute = Ember.Route.extend({
  model: function(params) {
    return App.Contacts[params.contact_id];
  },
  renderTemplate: function() {
    this.render('edit');
  }
});

App.EditContactController = Ember.ObjectController.extend({
  isAdding: true,
  isEditing: false,
  isInvalid: false,

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

App.sortContacts = function() {
  function getInitial(str) {
    return str.substr(0,1).toUpperCase();
  }
  App.Contacts.sort(function(a, b) {
    a = getInitial(a.name);
    b = getInitial(b.name);
    return a > b;
  });
};


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
