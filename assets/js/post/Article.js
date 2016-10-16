/**
 * 포스트 객체
 */

function Article(json) {
	this.type = json.type;
	this.idx = json.idx;
	this.name = json.name;
	this.date = json.date;
	this.desc = json.desc;
	this.image = json.image;
	this.tags = json.tags;
}

Article.prototype.getImageUrl = function() {
	if (this.image === "" || this.image === undefined) {
		return "/images/default" + (this.idx % 4) + ".jpg";
	}
	return this.image;
};

Article.prototype.checkIncludeTag = function(type) {
	for (var i = 0; i<this.tags.length; i++) {
		if(this.tags[i] == type) {
			return true;
		}
	}
	return false;
};

Article.prototype.getTagDivElement = function() {
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