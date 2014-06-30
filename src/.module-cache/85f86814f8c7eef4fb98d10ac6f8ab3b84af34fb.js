/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var picker = React.createClass({displayName: 'picker',
		render: function() {
			var style = {
				float: 'left',
				'padding-right': '100px'
			};
			var currentPicker = "Dominic Frost";

			return (
				React.DOM.div(null, 
					React.DOM.button(null, "Whose Picking Lunch?"),
					currentPicker
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


	return picker;
});