const Manager = require('./lib/Manager');
const chalk = require("chalk");
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');


const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// When render is passed into the write file command with the array of teamMembers, it creates a string template of the html file including html code to represent each teamMember
const render = require('./src/page-template.js');

const teamMembers = [];
const idArray = [];

// appMenu gets the ball rolling. It is called at the end of this file being loaded. Every team needs to have a manager at the minimum, so it asks for input for the manager profile and then calls addTeamMember() to add other kinds of team members
function appMenu() {
	// appMenu is built using the currying technique of nesting functions inside a function. All of the file's functions reside within appMenu()

	// Checks to see that the ID is a valid number and also that it is unique among team members
	function validateID(answer) {
		const pass = answer.match(/^[1-9]\d*$/);
		if (pass) {
			// ID's need to be unique.  Check to see if this ID is already taken
			if (idArray.includes(answer)) {
				return 'This ID has already been taken. Please enter another one';
			} else return true;
		}
		return 'Please enter a number greater than zero.';
	}

	// prompts the user to ask for info for a manager
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
					// validate: (answer) => {
					// 	return validateID(answer);
//					}
					validate: validateID
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
						return 'Please enter a number greater than zero.';
					}
				}
			])
			.then((answers) => {
				// create a manager object from class Manager
				const manager = new Manager(
					answers.managerName,
					answers.managerId,
					answers.managerEmail,
					answers.managerOfficeNumber
				);

				// add the manager object to teamMembers array
				teamMembers.push(manager);

				// add manager id to idArray
				// we have already checked for duplicates when it was input
				idArray.push(answers.managerId);

				// see if the user wants to add a team member
				addTeamMember();
			});
	}
	// Prompts the user to add additional team members or indicate that it's time to build the team structure
	function addTeamMember() {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'memberChoice',
					message: 'Which type of team member would you like to add?',
					choices: [ 'Engineer', 'Intern', 'No more team members. Build my team now.' ]
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
						//Done adding members. Generate the HTML code
						buildTeam();
				}
			});
	}

	// Prompt user to enter info for an Engineer
	function addEngineer() {
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
					validate: validateID,
					
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
				// create an engineer object from class Engineer
				const engineer = new Engineer(
					answers.engineerName,
					answers.engineerId,
					answers.engineerEmail,
					answers.engineerGitHub
				);

				// add the engineer object to teamMembers
				teamMembers.push(engineer);

				// add engineer id to idArray
				// we have already checked for duplicates
				idArray.push(answers.engineerId);

				// Ask for any additional team members
				addTeamMember();
			});
	}

	// Prompt user to enter info for an Intern
	function addIntern() {
		inquirer
			.prompt([
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
					validate: validateID
					
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
				// create an intern object from class intern
				const intern = new Intern(
					answers.internName,
					answers.internId,
					answers.internEmail,
					answers.internSchool
				);
				// add the intern object to teamMembers
				teamMembers.push(intern);

				// add intern id to idArray
				// we have already checked for duplicates upon input
				idArray.push(answers.internId);

				// Ask if user wants to add any additional team members
				addTeamMember();
			});
	}
	// all team member info has been entered. Call render
	function buildTeam() {
		// Create the output directory if the output path doesn't exist
		if (!fs.existsSync(OUTPUT_DIR)) {
			fs.mkdirSync(OUTPUT_DIR);
		}
		fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
		//  console.log('%c ' + `Success! Please view your file at ${outputPath}.`, 'color:#FFA500');
		console.log(chalk.green(`Success! Please view your file at ${outputPath}.`));
	}

	createManager();
}

appMenu();
