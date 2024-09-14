# Bettermode Posts Clone

Welcome to the Bettermode Posts clone project! This repository contains a clone of the Bettermode Posts page done as part of the assignment mentioned at https://bettermode.notion.site/Senior-Front-End-Engineer-485a0725e4d940c3a01fafe2b5154598

You can check it out live at https://bettermode-posts-demo.onrender.com

## Getting Started

To get started with the project in developemt mode, follow these steps:

1. **Install Dependencies**

Use Yarn to install the required dependencies:

```bash
yarn
```

2. **Create a build**  

Use Yarn to create a build of the project:

```bash
yarn build
```

3. **Start the app**

```bash
yarn serve
```

The app would be running at http://localhost:5173

4. **CI/CD**

This project includes Continuous Integration (CI) and Continuous deployment (CD )to automate testing and deployment processes. The CI configuration ensures that every code change is automatically tested and built to maintain the project's integrity. Check the CI pipeline status to ensure that all builds and tests are passing.

Enhancements

- SSR (Server-Side Rendering): Renders HTML on the server for faster page loads and better SEO.
- Session Management with Cookies: Uses cookies for maintaining user sessions securely.
- Unit Tests: Verifies individual components and logic to ensure correctness. CI/CD for continuous ingegration and deployments.
- Code Splitting: Loads JavaScript code on demand to improve performance.
- Updating Apollo Cache: Manages client-side data for faster and consistent user experiences.
