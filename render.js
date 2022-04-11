const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async (filename) => {
	const filePath = path.join(process.cwd(), filename);

	const dom = await JSDOM.fromFile(filePath, {
		runScripts : 'dangerously',
		resources  : 'usable'
	});

	return new Promise((resolve, reject) => {
		//this event will be triggered AFTER the DOM loads all the scripts
		//this way we are sure our code will be ran before the tests
		dom.window.document.addEventListener('DOMContentLoaded', () => {
			//console.log('done loading');
			resolve(dom); //dom will be returned when all scripts have been loaded
		});
	});
};

module.exports = render;
