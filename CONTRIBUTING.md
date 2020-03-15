# Contributing Guidelines

:tada: Thank you for choosing to contribute to the project! :tada:

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./.github/code_of_conduct.md).

## How Can I Contribute?

### Issues

Create a bug report or feature request by following these steps:

1. Ensure an issue does not already exist for it by searching [here](https://github.com/softeng-701-group-5/softeng-701-assignment-1/issues?q=is%3Aissue)
2. If creating a bug report, follow all instructions in the [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md)
3. If creating a feature request, follow all instructions in the [feature request template](./.github/ISSUE_TEMPLATE/feature_request.md)
4. If creating a user story, follow all instructions in the [user story template](./.github/ISSUE_TEMPLATE/user_story.md)

### Pull Requests

Create a pull request by follwing these steps:

1. Use the fork and pull workflow to make your pull requests, see [here](https://gist.github.com/Chaser324/ce0505fbed06b947d962) for more information
2. Follow all instructions in the [pull request template](./.github/pull_request_template.md)
3. Follow the [style guides](#style-guides)

## Style Guides

### Git Commit Messages

- For larger changes split commit messages into a subject line and a body

  For example:

```
  $ git commit -m "Subject line, contains a brief summary of the changes
  >
  > The body, describes what has changed and why"
```

- One-line messages are appropriate for small changes
- Use the present tense e.g. ("Add button" not "Added button")
- Use the imperative mood e.g. ("Move button to..." not "Moves button to...")
- For more in-depth guidelines (but not required) see [here](https://chris.beams.io/posts/git-commit/)

### Coding Conventions

#### Java

Follow [Google Java style guide](https://google.github.io/styleguide/javaguide.html).
The server maven project has been setup to auto-format during the build lifecycle.
You can manually reformat by running the following commands:

```
mvn fmt:format // Reformats Java code
mvn fmt:check  // Check formatting is corret
```

#### Javascript

Follow the code style defined by `/client/.prettierrc` (which is applied on top of the recommended Prettier style).
The client project has been configured to auto-format by running Prettier using the 'pre-commit' git hook. You can manually format staged files with the following command:

```
yarn lint-staged
```
