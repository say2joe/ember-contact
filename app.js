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
  },/*
  renderTemplate: function() {
    this.render('application');
    this.render('add');
  },*/
  events: {
    add: function() {
      console.log("Adding contact ...");
      var contacts = this.modelFor('application');
      this.transitionTo('viewContact',
        contacts.pushObject({ id: contacts.length })
      );
    }
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
  },
  events: {
    remove: function() {
      console.log("Deleting contact ...");
      this.modelFor('application').removeObject(
        this.modelFor('editContact')
      );
      this.transitionTo('application');
    },
    done: function() {
      console.log("Saving contact ...");
      this.transitionTo('viewContact',
        this.modelFor('editContact')
      );
    }
  }
});

App.EditContactController = Ember.ObjectController.extend({
  isEditing: false, isInvalid: false
});

App.sortContacts = function() {
  var l = App.Contacts.length,
      contacts = App.Contacts,
      getInitial = function(str) {
        return str.substr(0,1).toUpperCase();
      };
  contacts.sort(function(a, b) {
    a = getInitial(a.name);
    b = getInitial(b.name);
    return a > b;
  });
  App.ContactLists = {};
  for (var i = 0, contact, list; i < l; i++) {
    contact = contacts[i];
    list = getInitial(contact.name);
    if (App.ContactLists[list]) App.ContactLists[list].push(contact.id);
    else App.ContactLists[list] = [contact.id];
  }
};


/** Sample (seed) Data: **/
App.Contacts = [
  {
    id: 1,
    name: "Joe Johnson",
    phone: "657-464-HTML",
    email: "say2joe@gmail.com"
  }, {
    id: 2,
    name: "Ember Doe",
    phone: "123-123-1234",
    email: "help@emberjs.com"
  }, {
    id: 3,
    name: "Bobby the Barbarian",
    phone: "310-123-4567",
    email: "protector@somewhere.com"
  }
];


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