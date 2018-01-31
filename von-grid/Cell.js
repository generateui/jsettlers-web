/*
	Simple structure for holding grid coordinates and extra data about them.

	@author Corey Birnbaum https://github.com/vonWolfehaus/
*/
vg.Cell = function(q, r, s) {
	this.q = q || 0; // x grid coordinate (using different letters so that it won't be confused with pixel/world coordinates)
	this.r = r || 0; // y grid coordinate
	this.s = s || 0; // z grid coordinate
	this.tile = null; // optional link to the visual representation's class instance
	this.userData = {}; // populate with any extra data needed in your game
	// rest of these are used by the pathfinder and overwritten at runtime, so don't touch
	this._priority = 0;
	this.uniqueID = vg.generateID();
};

vg.Cell.prototype = {
	set: function(q, r, s) {
		this.q = q;
		this.r = r;
		this.s = s;
		return this;
	},

	copy: function(cell) {
		this.q = cell.q;
		this.r = cell.r;
		this.s = cell.s;
		this.tile = cell.tile || null;
		this.userData = cell.userData || {};
		return this;
	},

	add: function(cell) {
		this.q += cell.q;
		this.r += cell.r;
		this.s += cell.s;
		return this;
	},

	equals: function(cell) {
		return this.q === cell.q && this.r === cell.r && this.s === cell.s;
	}
};

vg.Cell.prototype.constructor = vg.Cell;
