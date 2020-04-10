### Prerequisites: 
* You have already forked the repository and cloned your fork to your local machine. More information on this, and the fork and pull model in general, see the [gist post](https://gist.github.com/Chaser324/ce0505fbed06b947d962) on the subject. 
* You have the following installed: 

  * [Java JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
  * [Yarn](https://classic.yarnpkg.com/en/docs/install)
  * [Node.js](https://nodejs.org/en/)
  * [Maven](https://maven.apache.org/install.html)

### Getting Started:

#### Command Line: 
1. Copy and paste the `application.properties` file in `server/src/main/resources/` to the same location with a new name: `application-dev.properties`. NOTE: **Do not commit `application-dev.properties`** to the project. 
2. Populate each field in `application-dev.properties` with the appropriate login credentials. To get a sample set of credentials, please contact your project team. If your project team does not 
have any credentials see section [Creating new credentials](#creating-new-credentials-for-`application-dev.properties`)
3. Run `mvn install` in the `server` directory
4. Navigate to `server/target` (`cd target`) 
5. Launch the server using `java -jar -Dspring.profiles.active=dev server-0.0.1-SNAPSHOT.jar`

#### IntelliJ:
1. Copy and paste the `application.properties` file in `server/src/main/resources/` to the same location with a new name: `application-dev.properties`. NOTE: **Do not commit `application-dev.properties`** to the project. 
2. Populate each field in `application-dev.properties` with the appropriate login credentials. To get a sample set of credentials, please contact your project team. If your project team does not have any credentials see section [Creating new credentials](#Creating-new-credentials-for-application-dev.properties)
3. Create a new project from existing sources (File>New>Project from existing sources) using the `pom.xml` file in the server folder of the cloned repo. 
4. Set your run configuration to be a Spring Boot configuration with `ServerApplication.java` as the main class (this should happen automatically).
5. Edit the run configuration to have `-Dspring.profiles.active=dev` in VM Options under Environment. This makes Spring use `application-dev.properties` instead of `application.properties`.
6. Run the `ServerApplication` configuration to launch the server. 

#### Creating new credentials for `application-dev.properties`
- **Twitter** - These attributes can be obtained from the Twitter Developer console after creating a new app [here](https://developer.twitter.com/en/apps). *Note that getting access to the Twitter API may take a day or more.* 
- **Reddit** - These attributes can be obtained after creating an app [here](https://www.reddit.com/prefs/apps). Choose a `script` app type. Use the username and password of the account that created the app. 
- **Github** - [Basic authentication](https://developer.github.com/v3/auth/#basic-authentication) is used, so use the username and password of a newly created GitHub account.
- **HackerNews** - Since HackerNews has a public API only, authentication is not required.
- **Weather** - An api key must be retrieved from [OpenWeatherApp](https://openweathermap.org/api)
> Note: It is recommended you do not use personal accounts for the above credentials. Also, it is more convenient if your team 
shares a set of credentials.