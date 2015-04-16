# 스프링 MVC 라이브러리 추가

```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>4.1.6.RELEASE</version>
</dependency>
```

## 스프링 테스트 라이브러리

```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>4.1.6.RELEASE</version>
</dependency>
```

# 스프링 파일설정 순서

## 1. web.xml
	<servlet>
		<servlet-name>mint</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>mint</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
모든경로("/")의 접근을 스프링에서 제공하는 DispatcherServlet으로 맵핑을 한다.

## 2. 설정파일 
WEB-INF파일 아래에 서블릿이름이 포함된 xml파일을 통해 설정을 할 수 있다 (서블릿 명이 mint라면 WEB-INF/mint-servlet.xml).
 
###2-1. WEB-INF파일 안에 Spring Bean Configuration File형태의 파일을 생성
###2-2. 파일의 네임스페이스(버전 정보 없는 context, mvc, p)를 선택
###2-3. 특정 경로에 있는 컨트롤러에 해당하는 클래스들만 로딩하기 위해 경로를 설정

```
<context:component-scan base-package="경로" />
```

###2-4. 컨트롤러를 인식할 때 어노테이션 기반으로 지정하기
```
<mvc:annotation-driven />
```

###2-5 리소스 경로 지정하기
```
<mvc:resources location="/image/" mapping="/image/**" />
<mvc:resources location="/stylesheets/" mapping="/stylesheets/**" />
<mvc:resources location="/javascripts/" mapping="/javascripts/**" />
```

###2-6. 컨트롤러에서 뷰 이름을 결정할때 자동으로 연결이 되어 물리적인 접근을 함
```
<bean id="viewResolver" class="org.springframework.web.servler.view.InternalResourceViewResolver"
    p:prefix="/"
    p:suffix=".jsp" />
```

###2-7. 파일로 직접 접근하는것을 막기
jsp파일들을  WEB-INF폴더안에 넣고 p:prefix를 "/" 에서 "/WEB-INF/"로 변경해주면 클라이언트에서 파일로 직접 접근한 경우 접근을 막을 수 있음

#컨트롤러 생성
```
@Controller
public HomeController {
    @RequestMapping("/")
    public String home() {
        return "home";
}
```

##1. 컨트롤러의 위치는 context:component-scan에 설정한 경로 안에 생성
##2. @Controller 라는 어노테이션을 추가해 주어야 컨트롤러로 인식
##3. @RequestMapping 맵핑을 하기 위한 어노테이션 추가
맵핑을 "/"로 주었기 때문에 최초 루트로 접근 시 home 메서드를 콜하게 된다. 이 때 return을 "home"으로 해주면 mint-servlet.xml에서 prefix와 suffix를 설정해 두었기 때문에 "WEB-INF/home.jsp"의 페이지를 응답한다.