/**
 * post 목록을 나타낸다.
 */
var PostList = PostList || {};

/*
	포스트의 목록 버튼의 이벤트 설정
 */
PostList.initSubMenu = function() {
	$('.sub_menu').on("click", "li", function (e) {
		var type = e.target.getAttribute("class").split(" ")[1];
		PostList.getPostList(type);
	});
};

/*
	포스트의 목록을 노출.
 */
PostList.getPostList = function(type) {
	$.ajax({
		method : "get",
		dataType : 'json',
		url : "/posts/post_list.json",
		success : function(data) {
			if (data === "" || data === undefined) {
				return;
			}

			var list = new Array();
			for(var i=0; i<data.length; i++) {
				var postObj = new Post(data[i]);
				if(type == "all" || postObj.checkIncludeTag(type)) {
					list.push(postObj);
				}
			}
			PostList._appendPostList(list);
		}
	});
};

/*
	포스트 목록 마크업을 만들어서 노출.
	(mustache로 변환 예정)
 */
PostList._appendPostList = function(postList) {
	var el = document.querySelector("#post_list");
	el.innerHTML = "";
	for(var i=0; i<postList.length; i++) {
		var aEl = document.createElement("a");
		aEl.setAttribute("href", "/posts/" + postList[i].idx);
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