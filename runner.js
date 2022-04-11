const fs = require('fs');
const path = require('path');

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTests() {
		for (let file of this.testFiles) {
			//in order to execute the testfile we just need to require it
			//when we do, node will load the file and execute whatever is inside of it
			require(file.name);
		}
	}

	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(targetPath);

		for (let file of files) {
			const filepath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filepath);

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({ name: filepath });
			}
			else if (stats.isDirectory()) {
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
