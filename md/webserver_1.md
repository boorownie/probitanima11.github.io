# Embedded Tomcat을 쓰는 이유
WTP(Web Tools Platform)는 Eclipse에서 웹 개발을 하거나 Java EE 어플리케이션을 개발하기 위한 툴이다. WTP는 마법사와 built-in 어플리케이션을 통해 손쉽게 개발할 수 있게 해주고 개발한 어플리케이션을 배포, 실행, 테스트 하는데 필요한 툴과 API들을 포함하고 있다. 하지만 WTP는 JSP를 수정하였을 때 생기는 버그와 배포시 발생되는 버그 등 간혹 비정상적인 동작을 인해 불편함을 유발한다. 따라서 Embedded Tomcat 환경에서 개발하는 것을 추천 받아 사용해 보았다. 

# Embedded Tomcat 적용하기
- Maven이 적용된 프로젝트 : [slipp.net: embedded tomcat 연결](http://www.slipp.net/wiki/pages/viewpage.action?pageId=16711743) 참조
- Maven이 아닌 경우 jar파일로 된 embedded tomcat library를 추가한다.
 
# Embedded Tomcat 사용하기
- launcher class 생성 후 실행
```
public class Main {

    public static void main(String[] args) throws Exception {

        String webappDirLocation = "src/main/webapp/";
        Tomcat tomcat = new Tomcat();

        //The port that we should run on can be set into an environment variable
        //Look for that variable and default to 8080 if it isn't there.
        String webPort = System.getenv("PORT");
        if(webPort == null || webPort.isEmpty()) {
            webPort = "8080";
        }

        tomcat.setPort(Integer.valueOf(webPort));

        tomcat.addWebapp("/", new File(webappDirLocation).getAbsolutePath());
        System.out.println("configuring app with basedir: " + new File("./" + webappDirLocation).getAbsolutePath());

        tomcat.start();
        tomcat.getServer().await();
    }
}
```

[출처]
[slipp.net](http://www.slipp.net/wiki/pages/viewpage.action?pageId=16711743)
[Eclipse](http://projects.eclipse.org/projects/webtools)
[Devcenter](https://devcenter.heroku.com/articles/create-a-java-web-application-using-embedded-tomcat)