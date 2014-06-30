/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var mainComponent = React.createClass({displayName: 'mainComponent',
		render: function() {
			return (
				React.DOM.div(null, 
					"Add User:",
					React.DOM.textarea( {onChange:this._handleChange},  " " )
				)
			);
		},

		_handleChange: function() {
			console.log('changed');
		}
	});


	return mainComponent;
});