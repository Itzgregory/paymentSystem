const UserService = require("../service/user/user");
const { securityConfig } = require('../../config/index');
const { getUserModel } = require('../models/user/userModel');

module.exports = {
    userService: new UserService(getUserModel, securityConfig),
};
