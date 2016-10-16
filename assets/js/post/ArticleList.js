/**
 * Article 목록을 나타낸다.
 */
var ArticleList = ArticleList || {};

/*
 메인페이지 > 최근 게시글 목록을 노출.
 */
ArticleList.getRecentArticleList = function(listNum) {
	$.ajax({
		method : "get",
		dataType : 'json',
		url : "/article_list.json",
		success : function(data) {
			if (data === "" || data === undefined) {
				return;
			}
			var showNum = data.length < listNum ? data.length : listNum;
			ArticleList._appendRecentArticleList(data, showNum);
		}
	});
};

/*
 게시글 목록 마크업을 만들어서 노출.
 */
ArticleList._appendRecentArticleList = function(data, showNum) {
	var eArticleList = $('.mini-posts');

	for (var i = 0; i < showNum; i++) {
		var articleObj = new Article(data[i]);

		eArticleList.append(this._appendRecentArticle(articleObj));
	}
};

/*
 게시글 마크업을 만들기
 (mustache로 변환 예정)
 */
ArticleList._appendRecentArticle = function(article) {
	var aEl = $('<a/>', {href: ArticleList._makeArticleUrl(article), alt: '',});
	var articleEl = $('<article/>', {class: "mini-post"}).appendTo(aEl);
	var headerEl = $('<header/>').appendTo(articleEl);
	$('<h3/>', {html: article.name}).appendTo(headerEl);
	$('<p/>', {html: article.desc}).appendTo(headerEl);
	$('<time/>', {class: "published", datetime : article.date, html : article.date}).appendTo(headerEl);
	$('<img/>', {class: 'image', src: article.getImageUrl(), alt: '',}).appendTo(articleEl);
	return aEl;
};

ArticleList._makeArticleUrl = function(article) {
	return "/" + article.type + "/" + article.idx
};