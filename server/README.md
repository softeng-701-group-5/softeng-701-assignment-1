### Prerequisites: 
* You have already forked the repository and cloned your fork to your local machine. More information on this, and the fork and pull model in general, can be found at https://gist.github.com/Chaser324/ce0505fbed06b947d962
* You have the following installed: 
  * IntelliJ Community/Ultimate https://www.jetbrains.com/idea/download/
  * Java JDK 11 https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
  * Yarn https://classic.yarnpkg.com/en/docs/
  * Node.js https://nodejs.org/en/

### Getting Started in IntelliJ:
1. Create a new project from existing sources (File>New>Project from existing sources) using the `pom.xml` file in the server folder of the cloned repo. 
2. Copy and paste the `application.properties` file in `server/src/main/resources/` to the same location with a new name: `application-dev.properties`. NOTE: **Do not commit `application-dev.properties`** to the project. 
3. Edit your current run configuration to have `-Dspring.profiles.active=dev` in VM Options. This makes Spring use `application-dev.properties` instead of `application.properties`.
4. Populate each value with the sensitive data. To get a sample set of data, please contact the project team.
5. Run `server/src/main/java/com/feeder/server/ServerApplication.java`.
