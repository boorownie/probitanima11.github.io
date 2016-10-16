/**
 * post 내용을 나타낸다.
 */
var PostRead = PostRead || {};

/*
 포스트의 내용 로드
 */
PostRead.init = function() {

    $.ajax({
        method : "get",
        dataType : 'json',
        url : "/article_list.json",
        success : function(data) {
            if (data === "" || data === undefined) {
                return;
            }

            var index = location.pathname.split('/')[2].split('.')[0];

            for(var i=0; i<data.length; i++) {
                if(data[i].idx == index) {
                    $('header h2').html(data[i].name);
                    $('header p').html(data[i].desc);
                    $('header time').html(data[i].date);
                    return;
                }
            }
        }
    });

    $.ajax({
        method: "get",
        dataType: 'text',
        url: this._makeUrl(location.pathname),
        success: function (data) {
            // showdown.js 적용
            var converter = new showdown.Converter({extensions: ['table']});
            var html = converter.makeHtml(data);

            document.querySelector('article').innerHTML += html;

            // highlight.js 적용
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        }
    });
};

/*
    내용을 로드할 url을 추출한다
 */
PostRead._makeUrl = function(path) {
    return "/" + path.split('/')[1] + "/md/" + path.split('/')[2].split('.')[0] + ".md";
};