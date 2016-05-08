# Free Code Camp Chart Stock Market Application
This application allows users to enter stock ticker symbol which will then display a graph of that stocks price over time. Application uses MongoDB, Node.JS and Express.js.

# Technology Stack
- Mongo
- Express.js
- Node.js
- Grunt
- Mocha

## Installation
```bash
git clone https://github.com/ratracegrad/fcc-chart-stock-market
npm install
bower install
node server.js
```

## How to Use
To get started with the application just enter a stock stymbol into the form and click the "Add" button. The history of that stock's price over time will be shown on the graph. 

The name of stocks that are on the graph are listed individually below the form. 

To delete any stock from the chart just click on the X button next to the stocky symbol you want deleted.

You may add as many stock symbols as you want to the chart.

## Live Demonstration
[You can view this app in production here](https://jb-fcc-chart-stock-market.herokuapp.com/)

## Tests
The application comes with test that can be run with
```
npm test
```

## Grunt Commands
This application uses Grunt for a task runner. There are several Grunt commands that are available.

```bash
grunt test
```
This command will run the tests.

```bash
grunt lint
```
This command will check all code in all javascript files for linting errors. If any are found then it will attempt to fix them automatically. Any errors that it cannot fix automatically will be reported.

```bash
grunt server
```
This command will actually start the server and the application.

```bash
grunt
```
This is the default grunt command. This command will run the tests, followed by eslint and then will start the server.
