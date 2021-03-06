# Range List

Range list is an aggregate of ranges with different sizes, where a range is defined as a pair of integers that represent its two boundaries. One can add or remove a range at a time, and print all the tracked ranges in the list. ([Repo](https://github.com/evan-ysj/Range-List/tree/master))

## Core files

The main class is defined in ```./src/models/RangeList.js```. 

## Install

This project uses [node](https://nodejs.org/en/download/) and [npm](https://nodejs.org/en/download/). Go check them out if you don't have them locally installed.
```bash
npm install
npm run build
```

## Usage

There is already a test case in the start script. You can run the program as follow.
```bash
npm start
```

## Test

The unit test report is generated by mochawesome and is placed under ```./mochawesome-report```. The unit test source file is under ```./test``` directory. You can run the test by following command.
```bash
# Run the test script
mocha
# Generate a test report with mochawesome
./node_modules/.bin/mocha --reporter mochawesome
```

## To Do

Setup a http server to accept input range from client, and display range list on browser.

## Contributing

PRs accepted.

## License

MIT