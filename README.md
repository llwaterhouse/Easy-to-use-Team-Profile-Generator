# Easy-to-use Team Profile Generator
## Author
- [@LindaWaterhouse](https://www.github.com/llwaterhouse)


## Description
* This application uses a command line interface to ask the user for information about team members.  Each team must have one manager and then may have as many engineers or interns as the user chooses.

* The user runs 'node index.js' and then will be prompted for information for one manager and then an optional number of engineers and/or interns.

* The application validates each input and asks the user to re-enter if they input a field incorrectly.

* When all the team members are entered, the application will generate the HTML for a clean looking webpage displaying the information for each of the team members. It will also tell you where the output file resides.

* **Note:** Although the requirements asked for the output to be stored in a dist directory, we were given starter code that already had sample files in the dist directory and wrote the team.html file in an output directory so I kept that directory structure.



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Built With

* HTML
* CSS
* Javascript
* node.js
* inquirer
* fs
* chalk
* path

## Installation Instructions

If you want to edit application you must have a Github account, downloaded Visual Studio Code, install node.js, and inquirer 

[Create a Github account](https://github.com)

[Download Visual Studio](https://code.visualstudio.com/download/)

[Download node.js](https://nodejs.org/en/download/)


Clone the github project

To install packages dependencies in package.json, open a console in the top level directory and run the following command 

>npm install 

## Usage
To run this application, open a console in the correct directory and enter
> node index

Then answer the questions at the command line interface.

## Deliverables

[Sample team.html file that is generated](https://github.com/llwaterhouse/Easy-to-use-Team-Profile-Generator/blob/main/output/team.html)

### Walkthrough video

The walkthrough video shows how all of the tests pass using the command:
>npm test

It then shows how the application is run and how the input is entered and creates an example team using the command:
>node index

and displays the final team.html file.


### Repository

[GitHub repository for this project](https://github.com/llwaterhouse/Easy-to-use-Team-Profile-Generator)


## Acknowledgements

Rutgers Coding Bootcamp

## License
MIT
