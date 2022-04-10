#!/usr/bin/env node
//the code above needed to make it run as a CLI

const Runner = require('./runner');
const runner = new Runner();

const run = async () => {
	const results = await runner.collectFiles(process.cwd());
	console.log(results);
};

run();
