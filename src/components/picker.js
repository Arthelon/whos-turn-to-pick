/** @jsx React.DOM */
'use strict';
var Reflux = require('reflux');
var React = require('react');
var TeamMemberStore = require('../stores/teamMemberStore');
var TeamMemberActionCreators = require('../actions/teamMemberActionCreators');

var picker = React.createClass({
    mixins: [
        Reflux.listenTo(TeamMemberStore, '_onTeamMemberStoreChange')
    ],

    getInitialState: function() {
        return {
            teamMembers: [],
            currentPicker: 'n/a',
            disabled: true
        };
    },

    render: function() {
        var lastPickerDate = '';
        for (var i = 0, len = this.state.teamMembers.length; i < len; i++) {
            if (this.state.currentPicker && this.state.currentPicker.name === this.state.teamMembers[i].name) {
                lastPickerDate = this.formatDate(this.state.teamMembers[i].lastPicked);
                break;
            }
        }

        var currentPicker = this.state.currentPicker ? this.state.currentPicker.name : '';

        return (
            <div>
                <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    disabled={this.state.disabled}
                    onClick={this._handleClick}>
                    {"Whose Picking Lunch?"}
                </button>
                <h4>Last To Choose: {currentPicker} {lastPickerDate}</h4>
            </div>
        );
    },

    _handleClick: function() {
        var canPickMembers = [];
        var teamMembers = this.state.teamMembers;
        for (var i = 0, len = teamMembers.length; i < len; i++) {
            var teamMember = teamMembers[i];
            if (!teamMember.hasPicked && teamMember.active !== false) {
                canPickMembers.push(teamMember);
            }
        }
        var pickerIndex = Math.floor(Math.random() * canPickMembers.length);

        TeamMemberActionCreators.pickTeamMember(canPickMembers[pickerIndex]);
    },

    formatDate: function(dateString) {
        var date = new Date(dateString);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getYear() - 100);
    },

    _onTeamMemberStoreChange: function(payload) {
        this.setState({
            teamMembers: payload.teamMembers,
            currentPicker: payload.currentPicker,
            disabled: payload.pickerDisabled
        });
    }
});

module.exports =  picker;
