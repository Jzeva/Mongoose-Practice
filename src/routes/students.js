const {Router} = require('express');
const{
    getAllStudent,
    getStudentById,
    addStudent,
    updateStudentById,
    deleteStudentById
} = require('../controllers/student')

const studentRouter = Router();

studentRouter.get('',getAllStudent);
studentRouter.get('/:id',getStudentById);
studentRouter.post('',addStudent);
studentRouter.put('/:id',updateStudentById);
studentRouter.delete('/:id',deleteStudentById);


module.exports = studentRouter;