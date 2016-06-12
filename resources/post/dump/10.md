# Controller 클래스 구현

```
@Controller
public class UserController {
	@Autowired
	private UserDao userDao;
    @RequestMapping("/users/form")
    public String form() {
        return "users/form";
    @RequestMapping(value="/users" method=RequestMethod.POST)
    public String create(User user) {
    	userDao.create(user);
    	return "users/form";
    }
}
```

##1. 컨트롤러의 위치는 context:component-scan에 설정한 경로 안에 생성

##2. 컨트롤러 클래스에 @Controller 추가

##3. @Autowired로 UserDao필드 선언

private이라도 스프링 프래임워크에서는 코드량을 줄이기 위해서 private 필드에 대해서도 자바 리플렉션을 활용해서 인스턴스를 인젝트 할 수 있도록 지원한다.

참고로 세터메소드를 만들고 그 위에  Autowired를 선언해 사용할 수도 있다. 

```
UserDao userDao;

@Autowired
public void setUserDao(UserDao userDao) {
	this.userDao = userDao;
}
```

##4. @RequestMapping 맵핑을 하기 위한 어노테이션 추가
맵핑을 "/"로 주었기 때문에 최초 루트로 접근 시 home 메서드를 콜하게 된다. 이 때 return을 "home"으로 해주면 mint-servlet.xml에서 prefix와 suffix를 설정해 두었기 때문에 "WEB-INF/home.jsp"의 페이지를 응답한다.
# 

##5. 반복되는 URL제거

```
@Controller
@RequestMapping("/users")

public class UserController {
	@Autowired
	private UserDao userDao;
    @RequestMapping("/form")
    public String form() {
        return "users/form";
    @RequestMapping(value="" method=RequestMethod.POST)
    public String create(User user) {
    	userDao.create(user);
    	return "users/form";
    }
}
```

