###※ 스프링 MVC 라이브러리와 테스트 라이브러리 추가

-> /pom.xml

```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>4.1.6.RELEASE</version>
</dependency>
```

```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>4.1.6.RELEASE</version>
</dependency>
```

# 스프링 설정하기(web.xml)

서블릿 컨테이너가 시작되면 web.xml을 읽는다. web.xml는 Web Application Deployment Descriptor(DD파일)로서 웹 어플리케이션의 환경설정파일이다.

-> /WEB-INF/jsp/web.xml

```
<listener>
	<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>

<context-param>
	<param-name>contextConfigLocation</param-name>
	<param-value>
    classpath:/applicationContext.xml
    </param-value>
</context-param>

<servlet>
	<servlet-name>guinness</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	<load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
	<servlet-name>guinness</servlet-name>
	<url-pattern>/</url-pattern>
</servlet-mapping>
```

web.xml에는 다음과 같은 정보를 설정할 수 있다.

##1. 리스너 정보 

특정 이벤트 발생 시 호출을 하게 한다.

- ServletContextListener : 웹컨테이너 시작/종료 시 호출
- ServletContextAttributeListener : 컨테이너에 저장된 속성 값 변경 시 호출
- HttpSessionListener : HTTP 세션 활성화/비활성화 시 호출 
- HttpSessionAttributeListener : HTTP 세션 속성 값 변경 시 호출

... (추후 업로드)

아래와 같이 등록 할 수 있다.

```
<listener>
	<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

###1-1. context param으로 전달하기
```
<context-param>
	<param-name>contextConfigLocation</param-name>
	<param-value>classpath:/applicationContext.xml</param-value>
</context-param>
```

ContextLoaderListener를 등록하면 ServletContextListener클래스의  contextInitialized method를 실행하여 부모 스프링 컨테이너를 생성한다. 이때 contextConfigLocation 설정을 변경하면 부모 스프링 컨테이너의 정보를 가지는 xml파일의 경로를 변경할 수 있다.(applicationContext.xml에 대한 설명은 다른 포스트에서 상세히)

org.springframework.web.context.ContextLoaderListener 클래스

```
public void contextInitialized(ServletContextEvent event) {
	ServletContext servletContext = event.getServletContext();
	String location = servletContext.getInitParameter("contextConfigLocation");
	if (location == null) {
	location = "/WEB-INF/applicationContext.xml";
	}
	...
}
```

##2. 서블릿 정보

모든경로("/")의 접근을 스프링에서 제공하는 DispatcherServlet으로 맵핑을 한다.

```
<servlet>
	<servlet-name>guinness</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	<load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
	<servlet-name>guinness</servlet-name>
	<url-pattern>/</url-pattern>
</servlet-mapping>
```

###2-1. load-on-startup 태그

'<servlet />' 설정 시 load-onstartup이 설정되어 있으면 HttpServlet.init method 실행하여 자식 스프링 컨테이너를 생성한다. 자식 스프링 컨테이너의 정보를 가지는 xml파일의 경로를 변경할 수 있다.(서블릿이름+-servlet.xml에 대한 설명은 다른 포스트에서 상세히)

org.springframework.web.servlet.DispatcherServlet 클래스

```
public void init() {
	String location = getInitParameter("contextConfigLocation");
	if (location == null) {
		location = "/WEB-INF/" + getServletName() + "-servlet.xml"
	}
}

```

##3. PostConstruct 사용 시 context:annotation-config 추가
```
<context:annotation-config />
```