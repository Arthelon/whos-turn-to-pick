/** @jsx React.DOM */
'use strict';
var Reflux = require('reflux');
var React = require('react');

var TeamActionCreators = require('../actions/teamActionCreators');
var TextAreaActionCreators = require('../actions/textAreaValueActionCreators');

var TeamStore = require('../stores/teamStore');
var TextAreaValuesStore = require('../stores/textAreaValuesStore');

var uniqueKey = 0;

var teamList = React.createClass({
    mixins: [
        Reflux.listenTo(TeamStore, '_onTeamStoreChange'),
        Reflux.listenTo(TextAreaValuesStore, '_onTextAreaValuesStoreChange')
    ],

    getInitialState: function() {
        return {
            teams: [],
            value: '',
            textValue: ''
        };
    },

    render: function() {
        var self = this;

        var teamsList = this.state.teams.map(function(team) {

            function handleClick() {
                self._handleSelectionChange(team);
            }
            return  <li role="presentation" key={'team_' + uniqueKey++} onClick={handleClick}>
                        <a role="menuitem" tabindex="-1">{team.name}</a>
                    </li>
        });

        var floatRight = {
            float: "right"
        };

        var name = this.state.textValue;
        var createTeamDisabled = name === '' || this.teamExists(name);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Team Manager</h3>
                </div>
                <div role="form" className="panel-body">
                    <input className="form-group form-control" placeholder="Insert Team Name..." ref="textarea" onChange={this._handleTextChange} value={this.state.textValue}></input>
                    <button type="button" className="btn btn-md btn-primary" disabled={createTeamDisabled} onClick={this._handleClick}>Create Team</button>
                    <div className="dropdown" style={floatRight}>
                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                            {this.state.value === '' ? 'Pick Your team...  ' : this.state.value + '  '}
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                            {teamsList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    },

    _handleTextChange: function(event) {
        TextAreaActionCreators.handleNewTeamValueChange(event.target.value);
    },

    _handleClick: function() {
        TeamActionCreators.createTeam(this.state.textValue);
    },

    _handleSelectionChange: function(team) {
        TeamActionCreators.selectTeam(team.name);
    },

    teamExists: function(teamName) {
        for (var i = 0; i < this.state.teams.length; i++) {
            if (this.state.teams[i].name === teamName) {
                return true;
            }
        }
        return false;
    },

    _onTeamStoreChange: function(payload) {
        this.setState({
            teams: payload.teams,
            value: payload.currentTeam.name
        });
    },

    _onTextAreaValuesStoreChange: function(payload) {
        this.setState({
            textValue: payload.newTeamValue
        });
    }
});

module.exports =  teamList;
