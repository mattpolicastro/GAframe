/* global gapi */
'use strict';
import { CLIENT_ID } from '../config.js';
import './components/components_index.js';

gapi.analytics.ready(function() {

  // Step 3: Authorize the user.

	gapi.analytics.auth.authorize({
		container: 'ga-auth',
		clientid: CLIENT_ID
	});

	var realTime = new gapi.analytics.ext.RealTime();
	var viewSelector = new gapi.analytics.ViewSelector({
		container: 'ga-view-selector'
	});

  // Step 6: Hook up the components to work together.

	gapi.analytics.auth.on('success', function() {
		viewSelector.execute();
	});

	viewSelector.on('change', function(data) {
		realTime.set({ids: data, baseline: null}).execute();
	});

});
