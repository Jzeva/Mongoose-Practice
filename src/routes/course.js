const { Router } = require('express');
const { 
    getAllCourse,
    getCourseById, 
    addCourse,
    updateCourseById,
    deleteCourseById,
} = require('../controllers/course');

const courseRouter = Router();

courseRouter.get('',getAllCourse);
courseRouter.post('/',addCourse);
courseRouter.get('/:id',getCourseById);
courseRouter.put('/:id',updateCourseById);
courseRouter.delete('/:id',deleteCourseById);

module.exports = courseRouter;