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
	for(var tag in tags) {
		if(tag.tag == type) {
			return true;
		}
	}
	return false;
};

Post.prototype.getTagDivElement = function() {
	var divTagEl = document.createElement("div");
	for (var i = 0; i<this.tags.length; i++) {
		var aTageEl = document.createElement("a");
		aTageEl.setAttribute("class", "tag_"+this.tags[i].tag);
		aTageEl.innerHTML = "#" + this.tags[i].tag;
		divTagEl.appendChild(aTageEl);
		var aSpaceEl = document.createElement("a");
		aSpaceEl.innerHTML = "&nbsp; &nbsp;"; 
		divTagEl.appendChild(aSpaceEl);
	}
	return divTagEl;
};