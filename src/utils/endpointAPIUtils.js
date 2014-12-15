var Reflux = require('reflux');

var ServerActionCreators = require('../actions/serverActionCreators');
var TeamActionCreators = require('../actions/TeamActionCreators');
var TeamMemberActionCreators = require('../actions/TeamMemberActionCreators');
var ServerActionCreators = require('../actions/serverActionCreators');

function failedRequest(e) {
    console.log('your request failed! :(\n' + e);
}


function _removeTeam(teamName) {
    var oldTeam = {
        name: teamName
    };

    $.ajax({
        url: '/removeTeamHandler',
        data: JSON.stringify(oldTeam),
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.teamRemoveSuccess,
        error: failedRequest
    });
}

function _getTeams() {
    $.ajax({
        url: '/getTeamsHandler',
        data: {},
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.getTeamsSuccess,
        error: failedRequest
    });
}

function _createTeam(teamName) {
    var newTeam = {
        name: teamName
    };

    $.ajax({
        url: '/createTeamHandler',
        data: JSON.stringify(newTeam),
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.teamCreatedSuccess,
        error: failedRequest
    });
}

function _createTeamMember(newTeamMember) {
    $.ajax({
        url: '/addTeamMemberHandler',
        data: JSON.stringify(newTeamMember),
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.teamMemberCreatedSuccess,
        error: failedRequest
    });
}

function _removeTeamMember(oldTeamMember) {
    $.ajax({
        url: '/removeTeamMemberHandler',
        data: JSON.stringify(oldTeamMember),
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.teamMemberRemovedSuccess,
        error: failedRequest
    });
}

function _getTeamMembers(teamName) {
    var team = {
        name: teamName
    };

    $.ajax({
        url: '/getTeamMembersHandler',
        data: JSON.stringify(team),
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.getTeamMembersSuccess,
        error: failedRequest
    });
}

function _pickTeamMember(currentPicker) {
    currentPicker.hasPicked = true;
    var now = new Date();
    currentPicker.lastPicked = now.toString();
    var teamMembers = [currentPicker];
    $.ajax({
        url: '/updateTeamMembersHandler',
        data: JSON.stringify(teamMembers),
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.teamMembersUpdateSuccess,
        error: failedRequest
    });
}

function _updateTeamMembers(teamMembers) {
    $.ajax({
        url: '/updateTeamMembersHandler',
        data: JSON.stringify(teamMembers),
        type: 'POST',
        dataType : 'json',
        success: ServerActionCreators.teamMembersUpdateSuccess,
        error: failedRequest
    });
}


module.exports = Reflux.createStore({
    init: function() {
        this.listenTo(TeamActionCreators.removeTeam, _removeTeam);
        this.listenTo(TeamActionCreators.getTeams, _getTeams);
        this.listenTo(TeamActionCreators.createTeam, _createTeam);
        this.listenTo(TeamMemberActionCreators.createTeamMember, _createTeamMember);
        this.listenTo(TeamMemberActionCreators.removeTeamMember, _removeTeamMember);
        this.listenTo(TeamMemberActionCreators.getTeamMembers, _getTeamMembers);
        this.listenTo(TeamMemberActionCreators.pickTeamMember, _pickTeamMember);
        this.listenTo(TeamMemberActionCreators.updateTeamMembers, _updateTeamMembers);
        this.listenTo(TeamActionCreators.selectTeam, _getTeamMembers);
    }
});