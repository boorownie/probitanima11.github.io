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

|||
| :---| :--- |
|<c:out >|Like <%= ... >, but for expressions.|
|<c:set >|Sets the result of an expression evaluation in a 'scope'|
|<c:remove >|Removes a scoped variable (from a particular scope, if specified).|
|<c:catch>|Catches any Throwable that occurs in its body and optionally exposes it.|
|<c:if>|Simple conditional tag which evalutes its body if the supplied condition is true.|
|<c:choose>|Simple conditional tag that establishes a context for mutually exclusive conditional operations, marked by <when> and <otherwise>|
|<c:when>|Subtag of <choose> that includes its body if its condition evalutes to 'true'.|
|<c:otherwise >|Subtag of <choose> that follows <when> tags and runs only if all of the prior conditions evaluated to 'false'.|
|<c:import>|Retrieves an absolute or relative URL and exposes its contents to either the page, a String in 'var', or a Reader in 'varReader'.|
|<c:forEach >|The basic iteration tag, accepting many different collection types and supporting subsetting and other functionality .|
|<c:forTokens>|Iterates over tokens, separated by the supplied delimeters.|
|<c:param>|Adds a parameter to a containing 'import' tag's URL.|
|<c:redirect>|Redirects to a new URL.|
|<c:url>|Creates a URL with optional query parameters|

[출처]
[oracle](http://www.oracle.com/technetwork/java/index-jsp-135995.html)