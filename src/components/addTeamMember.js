/** @jsx React.DOM */
'use strict';
var Reflux = require('reflux');
var React = require('react');

var TeamStore = require('../stores/teamStore');
var TextAreaValuesStore = require('../stores/textAreaValuesStore');
var TeamMemberStore = require('../stores/teamMemberStore');

var TeamMemberActionCreators = require('../actions/teamMemberActionCreators');
var TextAreaValueActionCreators = require('../actions/textAreaValueActionCreators');

var addUser = React.createClass({
    mixins: [
        Reflux.listenTo(TeamStore, '_onTeamStoreChange'),
        Reflux.listenTo(TextAreaValuesStore, '_onTextAreaValuesStoreChange'),
        Reflux.listenTo(TeamMemberStore, '_onTeamMemberStoreChange')
    ],

    getInitialState: function() {
        return {
            textAreaDisabled: true,
            buttonDisabled: true,
            newMemberValue: '',
            currentTeam: ''
        };
    },

    render: function() {

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Team-Member Manager</h3>
                </div>
                <div className="panel-body">
                    <form role="form">
                        <input
                            type="text"
                            value={this.state.newMemberValue}
                            className="form-group form-control"
                            disabled={this.state.textAreaDisabled}
                            placeholder='Insert User Name...'
                            onChange={this._handleTextChange}
                        />
                        <button
                            type="button"
                            className="form-group btn btn-md btn-primary"
                            disabled={this.state.buttonDisabled}
                            onClick={this._handleClick}>

                            Add User
                        </button>
                    </form>
                </div>
            </div>
        );
    },

    _handleClick: function() {
        var newMember = {
            name: this.state.newMemberValue,
            hasPicked: false,
            lastPicked: new Date(0),
            team: this.state.currentTeam.name
        };
        TeamMemberActionCreators.createTeamMember(newMember);
    },

    _handleTextChange: function(event) {
        TextAreaValueActionCreators.handleNewTeamMemberValueChange(event.target.value);
    },

    _onTeamStoreChange: function(payload) {
        this.setState({
            textAreaDisabled: payload.currentTeam === 'Pick Your Team...',
            buttonDisabled: payload.currentTeam === 'Pick Your Team...',
            currentTeam: payload.currentTeam 
        })
    },

    _onTextAreaValuesStoreChange: function(payload) {
        this.setState({
            newMemberValue: payload.newTeamMemberValue
        });
    },

    _onTeamMemberStoreChange: function(payload) {
        buttonDisabled: payload.newTeamMemberDisabled
    }
});


module.exports = addUser;