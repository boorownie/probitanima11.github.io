# 스프링 프레임워크를 통해 DI 설정.

##1. applicationContext.xml 파일을 생성하여 bean을 선언한다.

-> /src/main/resources/applicationContext.xml
```
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource"
	p:driverClassName="${database.driverClassName}" p:url="${database.url}"
	p:username="${database.username}" p:password="${database.password}" />
<bean id="UserDao" class="org.nhnnext.guinness.model.dao.UserDao"
	p:dataSource-ref="dataSource" />
```

##2. bean 객체에 정보 전달하기

property 태그를 이용하여 bean으로 지정해준 객체에 값을 전달할 수 있다. name 속성을 입력할 때 code assistance를 이용하면 setter메서드에 해당하는 부분을 자동으로 찾아서 지정해준다. value는 문자열 값을 전달할 때 사용할 수 있고 ref는 레퍼런스를 전달 할 수 있다. 

##3. 자바코드에서 사용하기

```
ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
UserDao userDao = ac.getBean("UserDao");
```