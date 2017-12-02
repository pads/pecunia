[![Build Status](https://travis-ci.org/pads/pecunia.svg?branch=master)](https://travis-ci.org/pads/pecunia)

# Pecunia

An alternative Monzo app.

## Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

### Setup

    nvm use
    npm install

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Server

### Setup

    nvm use
    npm install

Create a `.env` file with the following:

```bash
CACHE_HOST=localhost:11211
CACHE_SECRET=cachesecret
CLIENT_ID=<client ID from Monzo>
CLIENT_SECRET=<client secret from Monzo>
COOKIE_DOMAIN=localhost
REDIRECT_URI=http://localhost:3000/oauth/callback
SESSION_SECRET=sessionsecret
```

### Running

Run `npm start` and navigate to `http://localhost:3000`

### Build

Run `npm run build`

### Running unit tests

Run `npm test`