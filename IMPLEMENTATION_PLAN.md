# Implementation Plan - DevOps Assignment

This plan outlines the steps to containerize the React application and set up a CI/CD pipeline using GitHub Actions, fulfilling the requirements of the ABB DevOps Assignment.

## User Review Required

> [!IMPORTANT]
> **Deployment Strategy**: I propose using **GitHub Pages** as the "test environment" for the frontend application, as it serves static sites effectively and is integrated with GitHub. Additionally, I will configure the pipeline to build and push the **Docker image** to GitHub Container Registry (GHCR) as a deployment artifact.

## Proposed Changes

### Docker Configuration
Create files to containerize the application.

#### [NEW] [nginx.conf](file:///home/lupy/Documentos/CV/tech_test_ABB/test-abb/nginx.conf)
- **SPA Routing**: Configure `try_files $uri $uri/ /index.html;` to prevent 404s on refresh.

#### [NEW] [Dockerfile](file:///home/lupy/Documentos/CV/tech_test_ABB/test-abb/Dockerfile)
- **Multi-stage build**:
    1.  **Build Stage**: Use `node:20-alpine`, install dependencies, and run `yarn build`.
    2.  **Production Stage**: Use `nginx:alpine`, copy built assets and **custom nginx.conf**.
- **Expose Port**: 80

#### [NEW] [docker-compose.yml](file:///home/lupy/Documentos/CV/tech_test_ABB/test-abb/docker-compose.yml)
- **Service**: `web`
- **Build**: Context `.`
- **Ports**: Map host 8080 to container 80.

### CI/CD Pipeline
Configure GitHub Actions.

#### [NEW] [.github/workflows/ci-cd.yml](file:///home/lupy/Documentos/CV/tech_test_ABB/test-abb/.github/workflows/ci-cd.yml)
- **Triggers**: `push` to main, `pull_request`.
- **Jobs**:
    1.  **CI (integration)**:
        -   Checkout code.
        -   Setup Node.js.
        -   Install dependencies (`yarn install --frozen-lockfile`).
        -   **Lint**: `yarn lint`.
        -   **Build**: `yarn build`.
        -   **Test (Cypress)**:
            -   *Note: Using Cypress as there are no existing unit tests in the repo.*
            -   Run application in background (`yarn preview --port 5173`).
            -   Wait for application to be ready.
            -   Run `npx cypress run`.
    2.  **Security Scan**:
        -   **Tool**: Trivy
        -   **Action**: Scan the built Docker image for vulnerabilities.
        -   **Severity**: Fail on CRITICAL.
    3.  **CD (Deployment)**:
        -   **Condition**: Only on `push` to `main` and successful CI & Security.
        -   **Deploy to GitHub Pages**: Use `actions/upload-pages-artifact` and `actions/deploy-pages` (requires repo settings update).
        -   **Docker Push**: Build and push Docker image to GHCR.

### Documentation

#### [MODIFY] [README.md](file:///home/lupy/Documentos/CV/tech_test_ABB/test-abb/README.md)
- Add sections for:
    -   **Prerequisites**: Docker, Node.js.
    -   **Local Development**: How to run with `yarn`.
    -   **Docker deployment**: How to build and run with Docker Compose.
    -   **CI/CD**: Explanation of the pipeline.

## Verification Plan

### Automated Tests
- **CI Pipeline**: The GitHub Actions workflow will automatically run Lint, Build, and Cypress tests.
- **Local Verification**:
    -   Run `docker compose up --build` and verify the app runs at `http://localhost:8080`.
    -   Run `yarn lint` and `yarn build` locally.
    -   Run `npx cypress run` locally (ensure dev server is running).

### Manual Verification
- **Browser Check**: Open the locally running container and verify the UI loads.
- **Pipeline Check**: Push changes to GitHub and verify the Actions tab shows a green build.
