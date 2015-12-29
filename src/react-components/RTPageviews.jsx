'use strict';

function RTPageviews(props) {
	/* This is driving me mad, but I haven't been able to find a rule which
		 prevents an ESLint error being thrown on this variable. */
	let halfHeight = props.height / 2; // eslint-disable-line no-unused-vars
	return (
		<a-entity
			geometry="primitive: box;
								width: .75;
								height: {props.height};
								depth: 1"
		>
			<a-animation
				attribute="position"
				from="5 {halfHeight} 0"
				to="-5 {halfHeight} 0"
				dur="50000"
				easing="linear"
			></a-animation>
		</a-entity>
	);
}

export default RTPageviews;
