# solution_enrique_gonzalez 

### Test Assignment

NodeJS, npm and javascript are the main components of this application.

### Requirements
Given an array of clicks, return the subset of clicks where:

1. For each IP within each one hour period, only the most expensive click is placed into the result set.
2. If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set. The result set should be stored in an array of hashes. Each hash should represent a click.
The expected result set should be a subset of the original array.

### Before starting
NodeJS and NPM must be installed in order to run this scripts

#### Test Cases
Jest has been used for basic unit testing

### List of Files Used

 1. `index.js` - Main file that will load json data, start dataset processing and download resultset.json file.
 2. `Click.js` - Entity that provides all the functionality related to Click items.
 3. `click.json` - Raw dataset.
 4. `test folder` - Contains all the necessary items for testing
    4.1. `test_data.js` - Test file input and output data
    4.2  `test.js` - File in charge of execute test cases
 5. `resultset.json` - Stores the final dataset.

 ### Installation 
1. Unzip the folder `solution_Enrique_Gonzalez.zip`.
2. Install dependencies using command `npm i`


 ### Execute the code
 Command to execute code and retrieve new dataset:
    `npm run solution`

 Command to run the test cases:
    `npm run test`