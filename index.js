
'use strict';

const Alexa = require('alexa-sdk');
const request = require('request-promise');
const healthcheck_url = process.env.healthcheck_url;
const google_url = process.env.google_url;
const APP_ID = process.env.app_id;
var _context, _event;

const handlers = {
	'googleStatus': function () {
		var message = { 'title': 'Google Status' };
		var options = {
			method: 'GET',
			uri: google_url,
		};
		request(options).then(function (response) {
			message.text = 'Hi, Google is up and working!';
			output(message, _context);
		}).catch(function (err) {
			message.text = 'Ops, Google is down!';
			output(message, _context);
		});
	},
	'LaunchRequest': function () {
		console.log('starting');
	},
	'Unhandled': function () {
		this.emit(':ask', 'Sorry I didnt understand that.');
	}
};

function output(message, context) {
	var response = {
		outputSpeech: {
			type: "SSML",
			ssml: message.text
		},
		card: {
			type: "Simple",
			title: message.title,
			content: message.text
		},
		shouldEndSession: true
	};
	context.succeed({ response: response });
}

exports.handler = function (event, context) {
	_context = context;
	_event = event;
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
