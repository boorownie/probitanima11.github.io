# JDBC 적용하기 

##1. h2 dependency 추가(maven)

```
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>1.4.187</version>
</dependency>
```

##2. JDBC설정파일 생성(application-properties.xml)

데이터베이스에 대한 JDBC설정을 스프링 프레임워크를 통해 따로 관리할 수 있어 기존에 자바소스에서 하던 작업을 분리 할 수 있다.

```
<entry key="database.driverClassName">org.h2.Driver</entry>
<entry key="database.url">jdbc:h2:~/slipp-user</enrty>
<entry key="database.username">sa</entry>
<entry key="database.password"></entry>
```

##3. connection pool 추가(maven)

```
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>dbcp</artifactId>
    <version>6.0.43</version>
</dependency>
```

##4. Spring 설정파일 추가(applicationContext.xml)
Spring Configuation file을 생성하여 아래의 코드를 작성한다.

```
<context:property-placeholder location="classpath*:application-properties.xml" />
	<bean id="dataSource" class="BasicDataSource" 
		p:driverClassName="${database.driverClassName}"
		p:url="${database.url}" 
		p:username="${database.username" 
		p:password="${database.password" />
</context:property-placeholder>
```

###4.1 context:property-placeholder

location에 지정된 경로의 property정보를 읽어 key-value형태로 가지고 있으라 설정.
(location : classpath에 지정된 모든 application-properties.xml을 의미)

###4.2 bean id="dataSource" class="BasicDataSource"

- 사용할 커넥션 풀을 이미 java에서 dataSource라는 이름의 인터페이스로 추상화 함.
- apache common의 dbcp 커넥션 풀의 구현체 클래스는 BasicDataSource.
- p 네임스페이스를 사용하면 아래와 같이 값을 받아올 수 있음.
p:driverClassName="${database.driverClassName}"
- BasicDataSource 인스턴스에 setDriverClassName()에 이 키에 해당하는 값을 전달 할 수 있음