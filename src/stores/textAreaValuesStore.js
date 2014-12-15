var Reflux = require('reflux');

var TextAreaValueActionCreators = require('../actions/TextAreaValueActionCreators');
var ServerActionCreators = require('../actions/ServerActionCreators');

var data = {
    newTeamMemberValue: '',
    newTeamValue:''
};

function _handleNewTeamMemberValueChange(value) {
    data.newTeamMemberValue = value;
    this.trigger(data);
}

function _handleNewTeamValueChange(name) {
    data.newTeamValue = name.length > 20 ? data.newTeamValue : name;
    this.trigger(data);
}

function _teamMemberCreatedSuccess() {
    data.newTeamMemberValue = '';
    this.trigger(data);
}

function _teamCreatedSuccess() {
    data.newTeamValue = '';
    this.trigger(data);
}

module.exports = Reflux.createStore({
    init: function() {
        this.listenTo(TextAreaValueActionCreators.handleNewTeamMemberValueChange, _handleNewTeamMemberValueChange);
        this.listenTo(TextAreaValueActionCreators.handleNewTeamValueChange, _handleNewTeamValueChange);
        this.listenTo(ServerActionCreators.teamMemberCreatedSuccess, _teamMemberCreatedSuccess);
        this.listenTo(ServerActionCreators.teamCreatedSuccess, _teamCreatedSuccess);
    }
});