var Reflux = require('reflux');

var ServerActionCreators = require('../actions/serverActionCreators');
var TeamActionCreators = require('../actions/TeamActionCreators');

var EndpointAPIUtils = require('../utils/endpointAPIUtils');

var data = {
    teams: [],
    currentTeam: {
        name: ''
    }
};

function removeTeam(team) {
    var teamName = team.name;
    for (var i = 0; i < data.teams.length; i++) {
        if (data.teams[i].name === teamName) {
            data.teams.splice(i, 1);
            break;
        }
    }
}

function _getTeamsSuccess(action) {
    data.teams = action.teams || [];
    this.trigger(data);
}

function _teamRemoveSuccess(action) {
    removeTeam(action.team);
    data.currentTeam = {
        name: ''
    }; 
    this.trigger(data);
}

function _teamCreatedSuccess(action) {
    data.teams.push(action.team);
    data.currentTeam = action.team;
    this.trigger(data);
}

function _selectTeam(name) {
    data.currentTeam.name = name;
    this.trigger(data);
}

module.exports = Reflux.createStore({
    init: function() {
        this.listenTo(ServerActionCreators.getTeamsSuccess, _getTeamsSuccess);
        this.listenTo(ServerActionCreators.teamRemoveSuccess, _teamRemoveSuccess);
        this.listenTo(ServerActionCreators.teamCreatedSuccess, _teamCreatedSuccess);
        this.listenTo(TeamActionCreators.selectTeam, _selectTeam);
    }
});
