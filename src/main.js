'use strict';

var ReactComponent = require('./components/component');
var React = require('react');
var $ = require('jquery');
var TeamActionCreators = require ('./actions/TeamActionCreators')

function loginSuccess(json) {
    //console.log('success!!! Welcome, ' + json.author);
    TeamActionCreators.getTeams();
}

function loginFailed() {
    //console.log('failure...');
}

function logIn() {
    $.ajax({
        url: '/loginHandler',
        data: {},
        type: 'GET',
        dataType : 'json',
        success: loginSuccess,
        error: loginFailed
    });
}

React.renderComponent(
    new ReactComponent(),
    document.getElementById('mainContainer'),
    logIn
);