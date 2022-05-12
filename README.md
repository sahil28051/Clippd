## Test Suite

## Setup

1. CD to the root of this project.
1. Duplicate `cypress.env.json.example` file to `cypress.env.json`
1. Run `yarn install` to install dependencies.
1. Run `yarn start` to start the automation test suite.


## Available scripts

- `yarn start` (and `yarn cy:run`) to start cypress automation test suite.
- `yarn record {key}` to record the result in cypress dashboard, provide the key in command.
- `yarn percy` to run t

### Environment variables

This project is configured to pick environment variables from `cypress.env.json`. Currently these variables are being used

- `host` hostUrl & baseUrl used for project to test against, e.g. `https://dev.clippd.com`.
- `DEFAULT_USER_EMAIL` & `DEFAULT_USER_PASSWORD` the user credentials to run all test.
- `WHS_USER_EMAIL` & `WHS_USER_PASSWORD` the user credentials to run WHS test.

other required environment variables

- `PERCY_TOKEN` to run percy test suite.
## TODO

1. Add linting.


Touch - Shankar for CI.