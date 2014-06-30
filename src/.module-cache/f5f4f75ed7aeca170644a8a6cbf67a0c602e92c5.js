/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var teamList = React.createClass({displayName: 'teamList',
		render: function() {
			var p1Style = {
				position: 'fixed',
				left: '200px'
			};

			var p2Style = {
				position: 'fixed',
				left: '400px'
			};

			var noFloatStyle = {
				clear: 'both'
			};

			var canPick = this.props.teamMembers.map(function(teamMember, index) {
				if (!teamMember.hasPicked) {
					return React.DOM.li(null, teamMember.name)
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return React.DOM.li(null, teamMember.name)
				}
			});

			// for (var i = 0, len = this.props.teamMembers.length; i < len; i++) {
			// 	if (this.props.teamMembers[i].hasPicked) {
			// 		canNotPick.push(teamMembers[i]);
			// 	} else {
			// 		canPick.push(teamMembers[i]);
			// 	}
			// }

			return (

				React.DOM.div(null, 
					React.DOM.p( {style:p1Style},  " Can Choose " ),
					React.DOM.ul(null,  " ", canPick, " " ),
					React.DOM.p( {style:p2Style},  " Already Chosen " ),
					React.DOM.ul(null,  " ", canNotPick, " " )
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


	return teamList;
});