var Reflux = require('reflux');

var Constants = require('../constants/constants');

var TextAreaValueStore = require('../stores/textAreaValuesStore');

var ServerActionCreators = require('../actions/serverActionCreators');
var TextAreaValueActionCreators = require('../actions/textAreaValueActionCreators');
var TeamMemberActionCreators = require('../actions/teamMemberActionCreators');

var PICK_THRESHOLD = Constants.PICK_THRESHOLD;
var data = {
    teamMembers: [],
    currentPicker: 'n/a',
    newMemberButtonDisabled: true
}

function getPickerDisabled() {
    var noEligiblePickers = true;
    for (var i = 0; i < data.teamMembers.length; i++) {
        if (!(data.teamMembers[i].active === false || data.teamMembers[i].hasPicked)) {
            noEligiblePickers = false;
            break;
        }
    }
    return data.currentPicker !== 'n/a' && new Date() - new Date(data.currentPicker.lastPicked) < PICK_THRESHOLD ||
            data.teamMembers.length === 0 || noEligiblePickers;
}

function updateCurrentPicker() {
    var recentPick = 0;
    var memberPicked;
    data.currentPicker = 'n/a';

    for (var i = 0; i < data.teamMembers.length; i++) {
        memberPicked = new Date(data.teamMembers[i].lastPicked);
        if (recentPick < memberPicked) {
            recentPick = memberPicked;
            data.currentPicker = data.teamMembers[i];
        }
    }
}

function processTeamMembers(teamMembers) {
    data.teamMembers = teamMembers || [];
    updateCurrentPicker();
}

function removeTeamMember(teamMember) {
    for (var i = 0; i < data.teamMembers.length; i++) {
        if (teamMember.name === data.teamMembers[i].name) {
            data.teamMembers.splice(i, 1);
            break;
        }
    }
    updateCurrentPicker();
}

function updateTeamMember(updatedMembers) {
    for (var i = 0; i < updatedMembers.length; i++) {
        for (var j = 0; j < data.teamMembers; j++) {
            if (updatedMembers[i].name === data.teamMembers[j].name) {
                data.teamMembers[j] = updatedMembers[i];
                break;
            }
        }
    }
    updateCurrentPicker();
}

function checkBucketsForReset() {
    var needReset = true;
    for (var i = 0; i < data.teamMembers.length; i++) {
        if (!data.teamMembers[i].hasPicked) {
            needReset = false;
        }
    }
    if (needReset) {
        for (var j = 0; j < data.teamMembers.length; j++) {
            data.teamMembers[j].hasPicked = false;
        }
        TeamMemberActionCreators.updateTeamMembers(data.teamMembers);
    }
}


function _getTeamMembersSuccess(action) {
    processTeamMembers(action.teamMembers);
    triggerChange(this);
}

function _teamMemberCreatedSuccess(action) {
    data.teamMembers.push(action.teamMember);
    data.newMemberButtonDisabled = true;
    triggerChange(this);
}

function _teamMemberRemovedSuccess(action) {
    removeTeamMember(action.teamMember);
    checkBucketsForReset();
    triggerChange(this);
}

function _teamMembersUpdateSuccess(action) {
    checkBucketsForReset();
    updateTeamMember(action.teamMembers);   
    triggerChange(this);
}

function _handleNewTeamMemberValueChange(newValue) {
    if (newValue === '') {
        data.newMemberButtonDisabled = true;
    } else {
        data.newMemberButtonDisabled = false;
        for (var i = 0; i < data.teamMembers.length; i++) {
            if (newValue === data.teamMembers[i].name) {
                data.newMemberButtonDisabled = true;
                break;
            }
        }
    }
    triggerChange(this);
}

function _teamCreatedSuccess() {
    data.teamMembers = [];
    data.currentPicker = 'n/a';  
    triggerChange(this);
}

function _teamRemoveSuccess() {
    data.teamMembers = [];
    data.currentPicker = 'n/a';
    triggerChange(this);
}

function _toggleActiveUserState(teamMember) {
    var name = teamMember.name;
    for (var i = 0; i < data.teamMembers.length; i++) {
        if (data.teamMembers[i].name === name) {
            data.teamMembers[i].active = data.teamMembers[i].active === undefined ? false : !data.teamMembers[i].active;
            break;
        }
    }
    triggerChange(this);
}

function triggerChange(store) {
    data.pickerDisabled = getPickerDisabled();
    store.trigger(data);
}

module.exports = Reflux.createStore({
    init: function() {
        this.listenTo(ServerActionCreators.getTeamMembersSuccess, _getTeamMembersSuccess);
        this.listenTo(ServerActionCreators.teamMemberCreatedSuccess, _teamMemberCreatedSuccess);
        this.listenTo(ServerActionCreators.teamMemberRemovedSuccess, _teamMemberRemovedSuccess);
        this.listenTo(ServerActionCreators.teamMembersUpdateSuccess, _teamMembersUpdateSuccess);
        this.listenTo(TextAreaValueActionCreators.handleNewTeamMemberValueChange, _handleNewTeamMemberValueChange);
        this.listenTo(ServerActionCreators.teamCreatedSuccess, _teamCreatedSuccess);
        this.listenTo(ServerActionCreators.teamRemoveSuccess, _teamRemoveSuccess);
        this.listenTo(TeamMemberActionCreators.toggleActiveUserState, _toggleActiveUserState);
    }
});
