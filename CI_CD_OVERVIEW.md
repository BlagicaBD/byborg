## CI/CD pipeline configuration overview

This document provides setup instructions for the project's Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions and Allure Reporting.

### Prerequisites
 - GitHub Account
 - Git installed on local machine
 - Node.js (version 18.x recommended)
 - npm (Node Package Manager)

## GitHub Actions Workflow Configuration
### Workflow File Location
 - File Name: Node.js CI
 - Path: .github/workflows/node.js.yml

### Workflow Triggers
The pipeline automatically runs on:
 - Pushes to the main branch
 - Pull requests targeting the main branch

### Pipeline Steps
1.	Checkout Code - Uses actions/checkout@v3 to retrieve the latest code
2.	Node.js Setup - Configures Node.js version 18.x environment

3.	Dependency Installation - Installs project dependencies (uses --legacy-peer-deps to resolve potential dependency conflicts)
```bash 
npm install --legacy-peer-deps
```
4.	Playwright Browser Setup - Installs required Playwright browsers
```bash 
npx playwright install --with-deps
```
5.	CodeceptJS Test Execution - Runs automated tests using CodeceptJS
```bash 
npm run codeceptjs --legacy-peer-deps
```
6.	Allure Report Generation - Creates detailed test execution reports
```bash 
npm run allure-report
``` 
7.	Report Artifact Upload 
- Uploads Allure report as a GitHub Actions artifact
- Available for download and review after each workflow run

8.	GitHub Pages Deployment 
- Publishes test reports to the gh-pages branch
- Accessible via GitHub Pages

## Accessing Allure Reports
### During Workflow Execution
1.	Navigate to your GitHub repository
2.	Go to "Actions" tab
3.	Select the specific workflow run
4.	Find "Allure Report" artifact and download

### Via GitHub Pages
1.	Go to repository settings
2.	Navigate to "Pages" section
3.	Find the deployed Allure report URL (https://[username].github.io/[repository-name]/) 
4.	Open the URL to view the test reports

## Troubleshooting
Common Issues
 - Dependency Conflicts: Use --legacy-peer-deps
 - Missing Browsers: Ensure npx playwright install --with-deps runs successfully
 - Test Failures: Check individual test logs in GitHub Actions

Best Practices
 - Commit small, frequent changes
 - Ensure all tests pass before merging pull requests
 - Regularly update dependencies
 - Monitor Allure reports for test trends and issues

