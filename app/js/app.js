var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
App.Store = DS.Store.extend();
App.ApplicationSerializer = DS.ActiveModelSerializer.extend({});
