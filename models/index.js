const Users = require('./user');
const { Clients, Policies } = require('./static');

// export models
module.exports = Object.assign({},
  Users,
  Clients,
  Policies
);
