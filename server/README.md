### Prerequisites: 
* You have already forked the repository and cloned your fork to your local machine. More information on this, and the fork and pull model in general, can be found at https://gist.github.com/Chaser324/ce0505fbed06b947d962
* You have the following installed: 
  * IntelliJ Community/Ultimate https://www.jetbrains.com/idea/download/
  * Java JDK 11 https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
  * Yarn https://classic.yarnpkg.com/en/docs/install
  * Node.js https://nodejs.org/en/

### Getting Started in IntelliJ:
1. Create a new project from existing sources (File>New>Project from existing sources) using the `pom.xml` file in the server folder of the cloned repo. 
2. Copy and paste the `application.properties` file in `server/src/main/resources/` to the same location with a new name: `application-dev.properties`. NOTE: **Do not commit `application-dev.properties`** to the project. 
3. Set your run configuration to be a Spring Boot configuration with `ServerApplication.java` as the main class (this should happen automatically).
4. Edit the run configuration to have `-Dspring.profiles.active=dev` in VM Options under Environment. This makes Spring use `application-dev.properties` instead of `application.properties`.
5. Populate each field in `application-dev.properties` with the sensitive data. To get a sample set of data, please contact the project team.
6. Run the `ServerApplication` configuration to launch the server. 
