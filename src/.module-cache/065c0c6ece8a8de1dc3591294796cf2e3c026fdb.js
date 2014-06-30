/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var picker = React.createClass({displayName: 'picker',
		render: function() {
			var style = {
				position: 'fixed',
				top: '150px'
			};

			return (
				React.DOM.div( {style:style}, 
					React.DOM.button( {onClick:this._handleClick}, "Whose Picking Lunch?"),
					React.DOM.p(null, this.props.currentPicker)
				)
			);
		},

		_handleClick: function() {
			var canPickMembers = []
			var teamMembers = this.props.teamMembers;
			for (var i = 0, len = teamMembers.length; i < len; i++) {
				var teamMember = teamMembers[i];
				if (!teamMember.hasPicked) {
					canPickMembers.push(teamMember);
				}
			}
			var pickerIndex = Math.floor(Math.random() * teamMembers.length);

			if (canPickMembers.length <= 1) {
				this.props.resetBucket();
			}

			this.props.onMemberPick(teamMembers[pickerIndex].name);
		}
	});


	return picker;
});