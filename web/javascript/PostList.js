/**
 *
 */
var PostList = PostList || {};

PostList.init = function() {
	$('.sub_menu').on("click", "li", function (e) {
		var type = e.target.getAttribute("class").split(" ")[1];
		PostList.getPostList(type);
	});
};

PostList.getPostList = function(type) {
	$.ajax({
		method : "get",
		url : "post/post_list.json",
		success : function(req) {
			var jsonArray = JSON.parse(req);
			if (jsonArray === "" || jsonArray === undefined) {
				return;
			}

			var list = new Array();
			for(var i=0; i<jsonArray.length; i++) {
				var postObj = new Post(jsonArray[i]);
				if(type == "all" || postObj.checkIncludeTag(type)) {
					list.push(postObj);
				}
			}
			PostList._appendPostList(list);
		}
	});
};

//mustache로 변환 예정
PostList._appendPostList = function(postList) {
	var el = document.querySelector("#post_list");
	el.innerHTML = "";
	for(var i=0; i<postList.length; i++) {
		var aEl = document.createElement("a");
		aEl.setAttribute("href", "/post/" + postList[i].idx);
		var liEl = document.createElement("li");
		var divEl = document.createElement("div");
		divEl.setAttribute("class", "post_card");
		var divTagEl = postList[i].getTagDivElement();
		divEl.appendChild(divTagEl);
		var h3El = document.createElement("h3");
		h3El.setAttribute("class", "post_name");
		h3El.innerHTML = "_" + postList[i].name;
		divEl.appendChild(h3El);
		if (postList[i].desc !== undefined) {
			var pEl = document.createElement("p");
			pEl.setAttribute("class", "post_desc");
			pEl.innerHTML = postList[i].desc;
			divEl.appendChild(pEl);
		}
		var spanEl = document.createElement("span");
		spanEl.setAttribute("class", "post_date");
		spanEl.innerHTML = postList[i].date;
		divEl.appendChild(spanEl);
		liEl.appendChild(divEl);
		aEl.appendChild(liEl);
		el.appendChild(aEl);
	}
};