var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
App.Store = DS.Store.extend();
App.ApplicationSerializer = DS.ActiveModelSerializer.extend({});

App.Router.map(function() {
  this.route('players');
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('players');
  }
});


App.Player = DS.Model.extend({
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  full_name: DS.attr('string'),
  position: DS.attr('string'),
  rank: DS.attr('number'),
  team: DS.attr('string'),
  total: DS.attr('number'),
  ppg: DS.attr('number'),
  on_team: DS.attr('boolean'),
  available: DS.attr('boolean')
});

App.PlayersController = Ember.Controller.extend({
  queryParams: ['positionFilter', 'teamFilter', 'fullNameFilter', 'availableFilter'],
  positionFilter: "",
  fullNameFilter: "",
  teamFilter: "",
  availableFilter: 'All',
  availableFilterOptions: ['All', 'Not-Drafted'],
  possiblePositions: ["", "qb", "rb", "te", "wr", "de"],

  actions: {
    draft: function(player){
      player.set("on_team", true);
      player.set("available", false);
      player.save();
    },

    draftOther: function(player){
      player.set("on_team", false);
      player.set("available", false);
      player.save();
    }
  },

  onTeam: function(){
    return this.get('content').filterBy('on_team', true);
  }.property('content.@each.on_team'),


  filteredPlayers: function() {
    var chosenPosition = this.get('positionFilter');
    var chosenName = this.get('fullNameFilter');
    var chosenTeam = this.get('teamFilter');
    var chosenAvailable = this.get('availableFilter');

    return this.get('content').filter(function(contact){
      var foundPosition = true;
      var foundName = true;
      var foundTeam = true;
      var foundAvailable = true;


      if (!Ember.empty(chosenPosition)){
        foundPosition = contact.get('position') === chosenPosition;
      }

      if (!Ember.empty(chosenName)){

        var nameIndex = contact.get("full_name").toLowerCase().indexOf(chosenName.toLowerCase());
        foundName = ( nameIndex >= 0);

      }

      if (!Ember.empty(chosenTeam)){
        var teamIndex = contact.get("team").toLowerCase().indexOf(chosenTeam.toLowerCase());
        foundName = ( teamIndex >= 0);
      }

      if (chosenAvailable !== 'All') {
        foundAvailable = contact.get('available');
      }

      return foundPosition && foundName && foundTeam && foundAvailable;

    });

  }.property('positionFilter', 'fullNameFilter', 'teamFilter', 'availableFilter')



});

App.PlayersRoute = Ember.Route.extend({

  model: function(params){
    return this.store.find('player');
  }

});
