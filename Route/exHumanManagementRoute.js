const express = require('express');
const Router = express.Router();

// destruct  controller data
const {
    getAvatar
} = require('../Controller/exHumanManagementController');

// accessing the controller
Router.post('/getAvatar',getAvatar);

module.exports = Router;