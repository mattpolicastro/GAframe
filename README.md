# GAframe

Quick and dirty demo for displaying Google Analytics Realtime API results in A-Frame.

# How to Run

You'll need a Google APIs Client ID with read-only access to the Analytics API, which you can get from [Google's Developer Console](https://console.developers.google.com). While there, make sure to configure redirects, etc. for however you'll be serving the page (by default, GAframe serves on http://localhost:8000). Once you've done that, you'll also need to request access to Analytics' Real Time API. [Details can be found here.](https://developers.google.com/analytics/devguides/reporting/realtime/v3/)

Create `config.js` in the root of the project with your client ID:

````
export const CLIENT_ID = 'your.client.id.here';
````

Once that's done, run the following to install dependencies and build the project files:

````
npm install
npm run build
````

Once the project has successfully generated `/build/bundle.js`, you can serve the files:

````
npm start
````

By default, GAframe uses Python's SimpleHTTPServer. However, any static file server will work. Once it's running, you'll have a barebones auth flow and some ugly VR. Congrats!

# Next Steps

* Refactor entity creation:
	* React-ify everything (split out the views/controllers)
	* Wait for Aframe templates to be rebuilt
	* Fix the weird flashing issue with bars; I suspect that the parent/box entity is rendered before the its animation child is, and jumps into place as a result. Could be handled with better animations/transitions, but I'd rather prepare the objects elsewhere and add to the scene when fully ready. Or, make sure the box's starting position matches that of the animation.
* Add [A-Frame text components](https://github.com/ngokevin/aframe-text-component) as labels.
* Make it more prettier.
* Remove redundant `'use strict';` directives in the final bundle (Browserify transform?)
