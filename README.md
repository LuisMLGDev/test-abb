
# Shopify - DevOps Technical Assignment

![CI/CD Status](https://github.com/LuisMLGDev/test-abb/actions/workflows/ci-cd.yml/badge.svg)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![Security: Trivy](https://img.shields.io/badge/security-trivy-red)

This repository contains the solution for the **ABB DevOps Assignment**. The goal was to containerize a React eCommerce application and implement a secure, automated CI/CD pipeline using DevOps best practices.

## 🚀 Deployment & DevOps Architecture

### Pipeline Workflow
The solution implements a GitHub Actions pipeline that ensures code quality, security, and automated delivery.

```mermaid
graph LR
    Push[Push to Main] --> CI_Start
    
    subgraph CI ["Continuous Integration (CI)"]
        direction TB
        CI_Start(Install & Lint) --> CI_Build(Build & Test)
        CI_Build --> Security{Trivy Scan}
    end
    
    subgraph CD ["Continuous Delivery (CD)"]
        direction TB
        Security -- Pass --> DeployWeb[Deploy to GH Pages]
        Security -- Pass --> DeployImg[Push Image to GHCR]
    end
    
    Security -- Fail --> Stop[Stop Pipeline]
    
    %% Estilos corregidos con texto negro forzado para alto contraste
    style Security fill:#ff9999,stroke:#333,stroke-width:2px,color:#000000
    style CI fill:#e1f5fe,stroke:#01579b,stroke-dasharray: 5 5,color:#000000
    style CD fill:#e8f5e9,stroke:#2e7d32,stroke-dasharray: 5 5,color:#000000

```

### Architecture Decisions

| Component | Choice | Rationale & Benefits |
| --- | --- | --- |
| **CI/CD** | GitHub Actions | Native integration, zero-overhead setup, and immediate feedback loop. |
| **Hosting** | GitHub Pages | Acts as the **Test Environment**. Perfect for SPA (Single Page Applications), cost-effective, and supports HTTPS automatically. |
| **Container** | Docker Multi-stage | **Efficiency**: Separates build tools (Node) from runtime (Nginx) to minimize image size.<br>

<br>**Security**: Runs Nginx Alpine to reduce attack surface. |
| **Registry** | GHCR | Keeps artifacts close to the code. Images are versioned by commit SHA for traceability. |
| **Security** | Trivy | Scans the final Docker image for OS/Library vulnerabilities (Critical severity blocks deployment). |

---

## 🛠️ How to Run

### Prerequisites

* Docker & Docker Compose

### Run with Docker

This uses the optimized multi-stage Dockerfile with Nginx to serve the production build.

```bash
# 1. Build and start the container
docker compose up --build
```

**2. Access the application at: [http://localhost:8080](http://localhost:8080)**

### Stopping Docker Containers

To stop the running Docker containers:

```bash
# Stop and remove containers
docker compose down

# Stop containers without removing them
docker compose stop
```

---

## ✅ Verification Links

Once the pipeline finishes successfully, you can verify the deployment here:

* **Live Test Environment:** [https://luismlgdev.github.io/test-abb/](https://luismlgdev.github.io/test-abb/)
* **Docker Registry:** `ghcr.io/luismlgdev/test-abb`
* **Pipeline Logs:** [View Actions Tab](https://github.com/LuisMLGDev/test-abb/actions)

---

## 📦 Application Features

*Based on the Simple React eCommerce application.*

This project is a dummy e-commerce application built using React, Tailwind CSS, Vite, TypeScript, and Redux Toolkit.

* **Homepage:** Banners, featured products, and navigation.
* **Product Page:** Detailed information, images, and pricing.
* **Cart:** Add products, view contents, and checkout simulation.
* **User Simulation:** Login simulation for wishlist and account features.
* **Testing:** End-to-End testing with **Cypress**.

## 📄 License

This project is part of a technical assignment. Original application code is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).


