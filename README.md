# Oranum Automation Framework

### Table of Contents

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Environment Prerequisites](#environment-prerequisites)
4. [Running Tests](#running-tests)
    - [Run Specific Scenario](#run-specific-scenario)
    - [Run All Tests](#run-all-tests)
5. [Viewing Reports](#viewing-reports)
    - [Generate Allure Report](#generate-allure-report)
    - [Open Allure Report](#open-allure-report)
    - [Manually Open Report](#manually-open-report)

---

### Overview
This project automates Oranum application use cases using CodeceptJS and Playwright for browser automation. It follows the BDD approach for behavior-driven testing.

---

### Setup Instructions
To set up this project locally, follow the steps below:

---

### Installation

Clone the repository:
```bash 
git clone https://github.com/masand24/Byborg.git
```
Install dependencies:
```bash
npm install -g npm
npm init -y
npm install @codeceptjs/ui --save
npm install codeceptjs-chai --save-dev
npm install codeceptjs playwright --save-dev
npm install -g allure-commandline 
npx playwright install
```
### Environment prerequisites:
-Node.js version 18 or later is required
-Java Development Kit (JDK) - needed for Allure
-Ensure Java is accessible from the command line by running java -version
-Add Java to the system's PATH environment variable

## Run the tests and view reports:

### To run a specific scenario with specific tags:
```bash 
npx codeceptjs run --features --grep '@tagName' --steps
```
    
### To run all tests at once:
```bash
npx codeceptjs run --steps
```
	
### Generate the Allure report:
```bash
npm run allure-report
```
### Manually open the report:
report can be opened manually from allure-report directory with the index.html in a browser