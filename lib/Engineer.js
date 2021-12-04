const Employee = require("./Employee");

class Engineer extends Employee {
  // TODO: YOUR CODE HERE
  constructor(name, id, email, gitHub) {
    super(name, id, email);
    this.gitHub = gitHub;
  }

  getGitHub() {
    return this.gitHub;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
