# Getting Started with This project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



### You should not modify or delete any of the files in the directory, doing so will break the project

#### Common mistakes
- nodejs is not installed globally on your device
- if you run the command `npm start ` and the following message pops up:
    `Error: Cannot find module ....` here is what to do 
    1. assure that your are actually in the project directory,run the command `ls`, if only one name is returned , this means you are not in the directory and need to use `cd` to do this. The output of the `ls` command should be this : 
        ```README.md
        node_modules
        package-lock.json
        package.json
        public
        src
        yarn.lock 
    2. If your problem persits follow these next steps carefully
        - 1. delete the file `package-lock.json`
        - 2. on the terminal , run the command `npm install`, this will regenerate the file you just deleted and may take several minutes
        - 3. Run the `npm start` command
    3. you may have been tempted to run the command `yarn build`, Yarn is a very useful tool, but for the sake of consistancy , please stick to using npm, failing to do so could cause 1st and 2nd level dependancy conflicts between different machines. "But it runs on my machine.." if a common saying when this happens.  
