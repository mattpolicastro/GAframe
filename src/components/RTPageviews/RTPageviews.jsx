/* global gapi */
'use strict';
// Need to import React for browserify
import React from 'react'; //eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';

gapi.analytics.ready(function () {
	gapi.analytics.createComponent('RealTime', {
		initialize: function() {
			gapi.analytics.auth.once('signOut', this._handleSignOut.bind(this));
		},

		execute: function() {
			if (this._polling) {
				this.stop();
			}

			if (gapi.analytics.auth.isAuthorized()) {
				this._pollActiveUsers();
			}
			else {
				gapi.analytics.auth.once('signIn', this._pollActiveUsers.bind(this));
			}
		},

		stop: function() {
			clearTimeout(this._timeout);
			this._polling = false;
			this.emit('stop', {activeUsers: this.activeUsers});
		},

		_pollActiveUsers: function() {
			var options = this.get();
			var pollingInterval = (options.pollingInterval || 5) * 1000;

			if (isNaN(pollingInterval) || pollingInterval < 5000) {
				throw new Error('Polling frequency must be five seconds or longer.');
			}

			this._polling = true;
			gapi.client.analytics.data.realtime
				// Heimdall ID: ga:101360224
				.get({
					ids: 'ga:101360224',
					//ids: options.ids,
					metrics:'rt:pageviews'
				})
				.then(function(response) {

					var pageviews = 'rows' in response.result ? (
						response.result.rows[0][0]
					) : (
						0
					);

					this._render(pageviews);

					if (this._polling == true) {
						this._timeout = setTimeout(
							this._pollActiveUsers.bind(this),
							pollingInterval
						);
					}
				}
				.bind(this));
		},

		_render: function(pageviews) {

			if (this.get().baseline == null) {
				this.set({baseline: pageviews});
				console.log(this.get().baseline);
			}
			console.log('pageviews: ', pageviews);
			let aFrame = document.body.getElementsByTagName('a-scene')[0];
			let gaBlock = document.createElement('a-entity');

			ReactDOM.render(<RTPageviews key={pageviews} height={pageviews} />, gaBlock);
			aFrame.appendChild(gaBlock);
		},

		_handleSignOut: function() {
			this.stop();
			gapi.analytics.auth.once('signIn', this._handleSignIn.bind(this));
		},

		_handleSignIn: function() {
			this._pollActiveUsers();
			gapi.analytics.auth.once('signOut', this._handleSignOut.bind(this));
		}
	});
});

function RTPageviews(props) {
	/* This is driving me mad, but I haven't been able to find a rule which
		 prevents an ESLint error being thrown on this variable. */
	let boxHeight = props.height / 100;
	let geom = 'primitive: box; width: .75; height: ' + boxHeight + '; depth: 1';
	let animStart = '5 ' + (boxHeight / 2) + ' 0';
	let animEnd = '-5 ' + (boxHeight / 2) + ' 0';
	return (
		<a-entity
			geometry={geom}
			key={new Date()}
		>
			<a-animation
				attribute="position"
				from={animStart}
				to={animEnd}
				dur="50000"
				easing="linear"
			></a-animation>
		</a-entity>
	);
}
