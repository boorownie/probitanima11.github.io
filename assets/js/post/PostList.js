/**
 * post 목록을 나타낸다.
 */
var PostList = PostList || {};

/*
 포스트페이지 > 포스트의 목록을 노출.
 */
PostList.getPostList = function(tag) {
	$.ajax({
		method : "get",
		dataType : 'json',
		url : "/article_list.json",
		success : function(data) {
			console.log("asdf");
			if (data === "" || data === undefined) {
				return;
			}
			PostList._appendPostList(data, tag);
		}
	});
};

/*
	포스트 목록 마크업을 만들어서 노출.
 */
PostList._appendPostList = function(data, tag) {
	var ePostList = $('.posts');
	ePostList.empty();

	for (var i = 0; i < data.length; i++) {
		var postObj = new Article(data[i])

		// 게시글 타입이 posts가 아닌 경우
		if (postObj.type !== "posts") {
			continue;
		}

		// 선택한 태그가 아닌 경우
		if (!(tag == "all" || postObj.checkIncludeTag(tag))) {
			continue;
		}

		ePostList.append(this._appendPost(postObj));
	}
}

/*
 포스트 마크업을 만들기
 (mustache로 변환 예정)
 */
PostList._appendPost = function(post) {
	var liEl = $('<li/>');
	var aEl = $('<a/>', {href: "/posts/" + post.idx, alt: '',}).appendTo(liEl);
	var articleEl = $('<article/>').appendTo(aEl);
	var headerEl = $('<header/>').appendTo(articleEl);
	$('<h3/>', {html: post.name}).appendTo(headerEl);
	$('<p/>', {html: post.desc}).appendTo(headerEl);
	$('<time/>', {class: "published", datetime : post.date, html : post.date}).appendTo(headerEl);
	$('<img/>', {class: 'image', src: post.getImageUrl(), alt: '',}).appendTo(articleEl);
	return liEl;
};

//------------------------------------------------------------------------------------------

/*
 포스트의 목록 버튼의 이벤트 설정
 */
PostList.initSubMenu = function() {
	$('#sub_menu').on("click", "li", function (e) {
		var tag = e.target.getAttribute("class").split(" ")[1];
		PostList.getPostList(tag);
	});
};

