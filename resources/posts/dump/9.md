# Dao 클래스 구현하기

##1. spring JDBC 메이븐 추가

##2. UserDao에 JdbcDataSupport를 상속

##3. UserDao의 인스턴스 생성

```
<bean id="userDao" class="org.probit.UserDao"
	p:dataSource-ref="dataSource"
/>
```

ApplicationContext.xml파일에서 UserDao Bean을 선언하고 그 인자의 레퍼런스로 dataSource를 선언한다.

##4. @PostConstruct 선언

```
@PostConstruct
public void initialize() {
	ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
	populator.addScript(new ClassPathResource("sql파일"));
	DatabasePopulatorUtils.execute(populator, getDataSource());
```

클래스가 스프링에 의해서 인스턴스가 생성이 될 때, PostConstruct가 선언된 메소드를 호출하면서 초기화 작업을 수행한다.
 
##5. RowMapper

```
RowMapper<User> rowMapper = new RowMapper<User>() {
	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new User(rs.getString("userId")
					, rs.getString("password")
					, rs.getString("name")
					, rs.getString("email"));
	}
}
```

ResultSet에 담겨있는 데이터를 해당 클래스로 매핑한다.

##6. getJdbcTemplate.query

(추후 업로드)
update: 리턴이 없는 쿼리 실행
queryForObject를 이용하면 오브젝트로 리턴 받을 수 있다.
query: 
queryForList: 