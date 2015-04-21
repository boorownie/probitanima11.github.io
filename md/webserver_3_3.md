# 자식 스프링 설정하기(guinness-servlet.xml)

##1. WEB-INF파일 안에 Spring Bean Configuration File형태의 파일을 생성

WEB-INF파일 아래에 서블릿이름이 포함된 xml파일을 통해 설정을 할 수 있다 (서블릿 명이 guinness라면 WEB-INF/guinness-servlet.xml).

##2. 파일의 네임스페이스(버전 정보 없는 context, mvc, p)를 선택

Code Assistance를 이용해 실수를 방지 할 수 있다.

##3. 아래의 코드 작성(예시)

-> /WEB-INF/guinness-servlet.xml

```
<context:component-scan base-package="org.nhnnext.guinness.controller" />
<mvc:annotation-driven />
<mvc:resources location="/img/" mapping="/img/**" />
<mvc:resources location="/favicon/" mapping="/favicon/**" />
<mvc:resources location="/fonts/" mapping="/fonts/**" />
<mvc:resources location="/js/" mapping="/js/**" />
<mvc:resources location="/css/" mapping="/css/**" />
<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver"
    p:prefix="/WEB-INF/jsp/"
    p:suffix=".jsp" />
```

- `<context:component-scan base-package="경로" />` 
 : 특정 경로에 있는 컨트롤러에 해당하는 클래스들만 로딩하기 위해 경로를 설정

- `<mvc:annotation-driven />`
 : 컨트롤러를 인식할 때 어노테이션 기반으로 지정

- `<mvc:resources location="위치" mapping="매핑할 문구" />`
 : 리소스 경로 지정

- viewResolver 빈 설정
 : 컨트롤러에서 뷰 이름을 결정할때 자동으로 연결이 되어 물리적인 접근을 함

##4. 파일로 직접 접근하는것을 막기
jsp파일들을  WEB-INF폴더안에 넣고 p:prefix를 "/" 에서 "/WEB-INF/"로 변경해주면 클라이언트에서 파일로 직접 접근한 경우 접근을 막을 수 있음