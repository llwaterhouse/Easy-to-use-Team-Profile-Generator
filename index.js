const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

//
const render = require('./src/page-template.js');

const teamMembers = [];
const idArray = [];

function appMenu() {
	function createManager() {
		console.log('Please build your team');
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'managerName',
					message: "What is the team manager's name?",
					validate: (answer) => {
						if (answer !== '') {
							return true;
						}
						return 'Please enter at least one character.';
					}
				},
				{
					type: 'input',
					name: 'managerId',
					message: "What is the team manager's id?",
					validate: (answer) => {
						const pass = answer.match(/^[1-9]\d*$/);
						if (pass) {
							// ID's need to be unique.  Check to see if this ID is already taken
							if (idArray.includes(answer)) {
								return 'This ID has already been taken. Please enter another one';
							} else return true;
						}
						return 'Please enter a positive number greater than zero.';
					}
				},
				{
					type: 'input',
					name: 'managerEmail',
					message: "What is the team manager's email?",
					validate: (answer) => {
						const pass = answer.match(/\S+@\S+\.\S+/);
						if (pass) {
							return true;
						}
						return 'Please enter a valid email address.';
					}
				},
				{
					type: 'input',
					name: 'managerOfficeNumber',
					message: "What is the team manager's office number?",
					validate: (answer) => {
						const pass = answer.match(/^[1-9]\d*$/);
						if (pass) {
							return true;
						}
						return 'Please enter a positive number greater than zero.';
					}
				}
			])
			.then((answers) => {
				// TODO: YOUR CODE HERE
				// create a manager object from class Manager
				const manager = new Manager(
					answers.managerName,
					answers.managerId,
					answers.managerEmail,
					answers.managerOfficeNumber
				);

				// TODO: YOUR CODE HERE
				// add the manager object to teamMembers
				teamMembers.push(manager);

				// TODO: YOUR CODE HERE
				// add manager id to idArray
				// we have already checked for duplicates
				idArray.push(answers.managerId);
				console.log('idArray: ', idArray);
				createTeam();
			});
	}

	function createTeam() {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'memberChoice',
					message: 'Which type of team member would you like to add?',
					choices: [ 'Engineer', 'Intern', "I don't want to add any more team members" ]
				}
			])
			.then((userChoice) => {
				switch (userChoice.memberChoice) {
					case 'Engineer':
						addEngineer();
						break;
					case 'Intern':
						addIntern();
						break;
					default:
						buildTeam();
				}
			});
	}

	function addEngineer() {
		// TODO: YOUR CODE HERE
		// prompt questions to user
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'engineerName',
					message: "What is the Engineer's name?",
					validate: (answer) => {
						if (answer !== '') {
							return true;
						}
						return 'Please enter at least one character.';
					}
				},
				{
					type: 'input',
					name: 'engineerId',
					message: "What is the engineer's id?",
					validate: (answer) => {
						const pass = answer.match(/^[1-9]\d*$/);
						if (pass) {
							// ID's need to be unique.  Check to see if this ID is already taken
							if (idArray.includes(answer)) {
								return 'This ID has already been taken. Please enter another one';
							} else return true;
						}
						return 'Please enter a positive number greater than zero.';
					}
				},
				{
					type: 'input',
					name: 'engineerEmail',
					message: "What is the engineer's email?",
					validate: (answer) => {
						const pass = answer.match(/\S+@\S+\.\S+/);
						if (pass) {
							return true;
						}
						return 'Please enter a valid email address.';
					}
				},
				{
					type: 'input',
					name: 'engineerGitHub',
					message: "What is the engineer's GitHub name?",
					validate: (answer) => {
						if (answer !== '') {
							return true;
						}
						return 'Please enter at least one character.';
					}
				}
			])
			.then((answers) => {
				// TODO: YOUR CODE HERE
				// create an engineer object from class Engineer
				const engineer = new Engineer(
					answers.engineerName,
					answers.engineerId,
					answers.engineerEmail,
					answers.engineerGitHub
				);

				// TODO: YOUR CODE HERE
				// add the engineer object to teamMembers
				teamMembers.push(engineer);

				// TODO: YOUR CODE HERE
				// add engineer id to idArray
				// we have already checked for duplicates
				idArray.push(answers.engineerId);
				console.log('idArray: ', idArray);

				createTeam();
			});
	}

	function addIntern() {
		inquirer
			.prompt([
				// TODO: YOUR CODE HERE
				// prompt questions to user
				{
					type: 'input',
					name: 'internName',
					message: "What is the Intern's name?",
					validate: (answer) => {
						if (answer !== '') {
							return true;
						}
						return 'Please enter at least one character.';
					}
				},
				{
					type: 'input',
					name: 'internId',
					message: "What is the Intern's id?",
					validate: (answer) => {
						const pass = answer.match(/^[1-9]\d*$/);
						if (pass) {
							// ID's need to be unique.  Check to see if this ID is already taken
							if (idArray.includes(answer)) {
								return 'This ID has already been taken. Please enter another one';
							} else return true;
						}
						return 'Please enter a positive number greater than zero.';
					}
				},
				{
					type: 'input',
					name: 'internEmail',
					message: "What is the Intern's email?",
					validate: (answer) => {
						const pass = answer.match(/\S+@\S+\.\S+/);
						if (pass) {
							return true;
						}
						return 'Please enter a valid email address.';
					}
				},
				{
					type: 'input',
					name: 'internSchool',
					message: "What is the name of the Intern's school?",
					validate: (answer) => {
						if (answer !== '') {
							return true;
						}
						return 'Please enter at least one character.';
					}
				}
			])
			.then((answers) => {
				// TODO: YOUR CODE HERE
				// create an intern object from class intern
				const intern = new Intern(
					answers.internName,
					answers.internId,
					answers.internEmail,
					answers.internSchool
				);
				// TODO: YOUR CODE HERE
				// add the intern object to teamMembers
				teamMembers.push(intern);
				// TODO: YOUR CODE HERE
				// add intern id to idArray
				// we have already checked for duplicates
				idArray.push(answers.internId);
				console.log('idArray: ', idArray);

				createTeam();
			});
	}

	function buildTeam() {
		// Create the output directory if the output path doesn't exist
		if (!fs.existsSync(OUTPUT_DIR)) {
			fs.mkdirSync(OUTPUT_DIR);
		}
		fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
	}

	createManager();
}

appMenu();
