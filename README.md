# GA-Frame

Quick and dirty demo for displaying Google Analytics Realtime API results in A-Frame.

# How to Run

Once you've cloned the project into your directory of choice, you'll need to add a file for the configuration details. At this time, you'll only need a Google APIs Client ID and the necessary permissions (read-only access to the Analytics API), which you can do from Google's Developer Console. While there, make sure to configure redirects, etc. for however you'll be serving the page (e.g. localhost:8000). Once you've done that, you'll also need to request access to Analytics' Real Time API. [Details can be found here.](https://developers.google.com/analytics/devguides/reporting/realtime/v3/)

Client ID in hand, you'll create `config.js` in the root of the project, containing the following:

````
export const CLIENT_ID = 'your.client.id.here';
````

Once that's done, run the following to install and build the project and its dependencies:

````
npm install
npm run build
````

It's entirely possible you'll run into some problems here regarding missing dependencies—[it's a known issue](https://github.com/aframevr/aframe/issues/347)—so use workarounds if necessary to install missing second-level dependencies.

Once the project has sucessfully generated `/build/bundle.js`, serve `index.html` however you'd like. However, I've included SimpleHTTPServer as the default, if you have Python handy:

````
npm start
````

Once it's running, you'll have a barebones auth flow and some ugly VR. Congrats!

# Next Steps

* Move everything to proper npm modules.
	* Wait to hear back about [Aframe #347](https://github.com/aframevr/aframe/issues/347), or submit PR to fix dependency inclusion/exclusion.
* Refactor entity creation:
	* Integrate React as a Google Embed API component?
	* Wait for Aframe templates to be rebuilt.
	* Fix the weird flashing issue with bars; I suspect that the parent/box entity is rendered before the its animation child is, and jumps into place as a result. Could be handled with better animations/transitions, but I'd rather prepare the objects elsewhere and add to the scene when fully ready. Or, make sure the box's starting position matches that of the animation.
* Integrate [A-Frame text components](https://github.com/ngokevin/aframe-text-component).
* Make it more prettier.
* Make a decision with regards to 'use strict'; it's unevenly applied at the moment and appears to be duplicated in browserify output.
