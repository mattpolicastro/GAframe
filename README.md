# GA-Frame

Quick and dirty demo for displaying Google Analytics Realtime API results in A-Frame.

# Next Steps

* Move everything to proper npm modules.
	* Wait to hear back about [Aframe #347](https://github.com/aframevr/aframe/issues/347), or submit PR to fix dependency inclusion/exclusion.
* Refactor entity creation:
	* Integrate React as a Google Embed API component?
	* Wait for Aframe templates to be rebuilt
	* Fix the weird flashing issue with bars; I suspect that the parent/box entity is rendered before the its animation child is, and jumps into place as a result. Could be handled with better animations/transitions, but I'd rather prepare the objects elsewhere and add to the scene when fully ready. Or, make sure the box's starting position matches that of the animation.
* Integrate [A-Frame text components](https://github.com/ngokevin/aframe-text-component).
* Make it more prettier.
* Make a decision with regards to 'use strict'; it's unevenly applied at the moment and appears to be duplicated in browserify output.
