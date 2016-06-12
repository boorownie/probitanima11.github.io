/**
 * 
 */

function Post(json) {
	this.idx = json.idx;
	this.name = json.name;
	this.date = json.date;
	this.tags = json.tags;
}

Post.prototype.checkIncludeTag = function(type) {
	for (var i = 0; i<this.tags.length; i++) {
		if(this.tags[i] == type) {
			return true;
		}
	}
	return false;
};

Post.prototype.getTagDivElement = function() {
	var divTagEl = document.createElement("div");
	for (var i = 0; i<this.tags.length; i++) {
		var aTageEl = document.createElement("a");
		aTageEl.setAttribute("class", "tag "+this.tags[i]);
		aTageEl.innerHTML = "#" + this.tags[i];
		divTagEl.appendChild(aTageEl);
		var aSpaceEl = document.createElement("a");
		aSpaceEl.innerHTML = "&nbsp; &nbsp;"; 
		divTagEl.appendChild(aSpaceEl);
	}
	return divTagEl;
};