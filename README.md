# testme
custom build test framework

Features
1. It is a Node-based CLI framework
2. It is able to test browser-based javascript apps!
3. It requires very little setup
4. It is able to test a whole application, not just one little widget
5. the CLI has a 'watch mode' for changes so we don't need to restart it over and over
6. the CLI will automatically find and run all files in a project that end on '*.test.js'

======================================= Usage ========================================
This tool is intended to be used in other projects.
Go to the project directory and then run tme from the command line.
It will gather all the .test.js files from your project and run the tests inside them
======================================================================================

======================== CLI ========================
To run the project as a CLI from anywhere on the machine follow these steps below:
1. "sudo npm init -y" => creates your package.json config file
2. at the end of the package.json file add a new section (tme is the command to execute index.js)
    "bin":{
        "tme": "index.js"
    }
3. in the index.js file at the very top write this
    #!/usr/bin/env node
4. open a command prompt in the root project directory and run "sudo npm link"
======================== done ========================
