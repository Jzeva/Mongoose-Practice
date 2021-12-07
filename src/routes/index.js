const express = require('express');
const courseRouter = require('./course');
const studentRouter = require('./students')

const v1Router = express.Router();

v1Router.use('/courses',courseRouter);
v1Router.use('/students',studentRouter);

module.exports = v1Router;