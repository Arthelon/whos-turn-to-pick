/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddUser = require('addTeamMember');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var mainComponent = React.createClass({displayName: 'mainComponent',
		render: function() {

			return (
				React.DOM.div(null, 
					AddUser(null),
					TeamList(null),
					Picker(null)
				)
			);
		},

		_handleChange: function() {
			console.log('changed');
		},

		_handleClick: function() {
			console.log('clicked');
		}
	});

	return mainComponent;
});