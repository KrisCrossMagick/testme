const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

//here we add a list of DIRs we do not want to search through
const forbiddenDirs = [ 'node-modules' ];
class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTests() {
		for (let file of this.testFiles) {
			const beforeEaches = [];
			console.log(chalk.bgBlueBright(`==> Running: ${file.shortName}`));
			global.beforeEach = (fn) => {
				beforeEaches.push(fn);
			};
			//before we can call the testfile and execute it
			//we need to define the "it" function like "mocha" uses
			//we will define it globally over all files in this project
			global.it = (desc, fn) => {
				beforeEaches.forEach((func) => func());
				try {
					fn();
					console.log(chalk.green(`\t==> OK - ${desc}`));
				} catch (err) {
					const message = err.message.replace(/\n/g, '\n\t\t');
					console.log(chalk.red(`\t==> X - ${desc}`));
					console.log(chalk.red('\t', message));
				}
			};

			//in order to execute the testfile we just need to require it
			//when we do, node will load the file and execute whatever is inside of it
			try {
				require(file.name);
			} catch (err) {
				console.log(chalk.red(err));
			}
		}
	}

	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(targetPath);

		for (let file of files) {
			const filepath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filepath);

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({ name: filepath, shortName: file });
			}
			else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
				const childFiles = await fs.promises.readdir(filepath);

				//childFiles is an array so we need to spread it before adding it
				//next we need the full path to the file or dir
				//we use map to join the path of parent directories to the current one
				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}
}

module.exports = Runner;
