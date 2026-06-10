# PetStore API

Playwright API test suite for the [Swagger PetStore API](https://petstore.swagger.io).

## Description

15 test cases covering:
- **Pet** — add, get, update, find by status, 404 handling, delete
- **Store** — inventory, place order, get order, 404 handling
- **User** — create, get by username, login, 404 handling, delete

## Installation

```bash
npm install
npx playwright install chromium
```

## Running the Tests

```bash
# Run all tests
npx playwright test

# Run by resource
npx playwright test tests/pet.spec.js
npx playwright test tests/store.spec.js
npx playwright test tests/user.spec.js
```

## Tech Stack

- [Playwright](https://playwright.dev/)
- Node.js
- Swagger PetStore API (`https://petstore.swagger.io/v2`)

## Author

William Yarian
