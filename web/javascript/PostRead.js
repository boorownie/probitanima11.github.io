($(document).ready(function () {
    // 메뉴
    $('header').load('/web/html/include/menu.html');
    // 내용
    $.ajax({
        method : "get",
        dataType : 'text',
        url : location.pathname+".md",
        success : function(data) {
            // showdown.js 적용
            var converter = new showdown.Converter({extensions: ['table']}),
                html = converter.makeHtml(data);
            document.querySelector('#content').innerHTML = html;

            // highlight.js 적용
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        }
    });
}));