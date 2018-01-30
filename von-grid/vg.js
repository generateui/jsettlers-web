var vg = { // eslint-disable-line
	PI: Math.PI,
	TAU: Math.PI * 2,
	DEG_TO_RAD: 0.0174532925,
	RAD_TO_DEG: 57.2957795,
	SQRT3: Math.sqrt(3), // used often in hex conversions

	// static function for utility
	generateID: function() {
		return Math.random().toString(36).slice(2) + Date.now();
	}
};