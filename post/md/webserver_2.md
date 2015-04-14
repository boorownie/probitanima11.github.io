# JSTL 이란
JSTL(JavaServer Pages Standard Tag Library)은 JSP에서 간단한 태그를 이용해 반복문이나 조건문과 같은 공통적이고 구조적인 작업을 도와주는 라이브러리이다.
JSTL을 사용하지 않으면 HTML 소스에 스크립틀릿을 이용한 자바 소스가 혼재되고 가독성이 떨어지는 문제점이 생긴다. JSTL을 이용하면 자바소스를 사용하지 않고도 깔끔한 코드를 작성 할 수 있다.

# 사용법 예시

```
<c:forEach items="${questions}" var="each">
  <div class="post">
      <h2 class="post-title">
          <a href="/show.next?questionId=${each.questionId}">${each.title}</a>
      </h2>
  </div>
</c:forEach>
```

# 함수 태그

- `<c:out > : 변수 출력, <%= "변수" >와 같음`
- `<c:set > : 변수 할당 `
- `<c:remove > : 변수 해제`
- `<c:catch> : 문제 발생 시 예외처리`
- `<c:if> : IF문 `
- `<c:choose> : switch문과 비슷, <when>과 <otherwise>을 사용`
- 자세한 사용법 및 예시: [tutorialspoint](http://www.tutorialspoint.com/jsp/jsp_standard_tag_library.htm)

[출처]
[oracle](http://www.oracle.com/technetwork/java/index-jsp-135995.html)
[tutorialspoint](http://www.tutorialspoint.com/jsp/jsp_standard_tag_library.htm)