/* global gapi */
'use strict';
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
			var aFrame = document.body.getElementsByTagName('a-scene')[0];
			var gaBlock = document.createElement('a-entity');

			var blockHeight = ((pageviews - this.get().baseline) / 5) + 1;
			var halfBlockHeight = blockHeight / 2;

			var gaBlockGeometry = [
				'primitive: box',
				'width: .75',
				'height: ' + blockHeight,
				'depth: 1'
			];


			gaBlock.clicked = false;
			gaBlock.toggle = function() {
				if (this.clicked == false) {
					this.setAttribute('material', 'color: #FFF');
					this.clicked = true;
				} else {
					this.setAttribute('material', 'color: #f7991c');
					this.clicked = false;
				}
			};

			gaBlock.setAttribute('geometry', gaBlockGeometry.join('; '));
			gaBlock.setAttribute('material', 'color: #f7991c');
			gaBlock.addEventListener('click', function() {
				gaBlock.toggle();
			});

			var animation = document.createElement('a-animation');
			animation.setAttribute('attribute', 'position');
			animation.setAttribute('from', '5 ' + halfBlockHeight + ' 0');
			animation.setAttribute('to', '-5 ' + halfBlockHeight + ' 0');
			animation.setAttribute('dur', '50000');
			animation.setAttribute('easing', 'linear');

			animation.addEventListener('animationend', function() {
				this.parentNode.parentNode.removeChild(this.parentNode);
			});

			gaBlock.appendChild(animation);
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
