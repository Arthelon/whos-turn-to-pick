/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddUser = require('addTeamMember');
	var TeamList = require('teamList');

	var mainComponent = React.createClass({displayName: 'mainComponent',
		render: function() {

			var style = {
				float: 'left'
			}
			return (
				React.DOM.div(null, 
					AddUser(null),
					TeamList(null)
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