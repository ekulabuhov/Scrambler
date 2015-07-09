Array.prototype.firstOrDefault = function(func) {
	var elements = this.filter(func)
	if (elements.length > 0)
		return elements[0]
	else
		return undefined
}

Array.prototype.except = function(filter) {
	var elements = this.filter(function(element) {
		return element != filter
	});
	return elements
}

/**
  * Removes specified element from an array.
  */
Array.prototype.remove = function(element) {
	this.splice(this.indexOf(element), 1)
}

Array.prototype.first = function() {
	return this[0];
}

Array.prototype.last = function() {
	return this[this.length - 1];
}