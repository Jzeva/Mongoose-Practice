const Student = require('../models/student');

async function getAllStudent(req,res){
    const students = await Student.find().exec();
    return res.json(students);
}

async function getStudentById(req,res){
    const {id} = req.params;
    const student = await Student.findById(id).exec();
    if(!student){
        res.status(404).json('Student not found');
    }
     return res.json(student);
}

async function addStudent(req,res){
    const{studentNumber,firstName,lastName,email} = req.body;
    const student = new Student({
        studentNumber,
        firstName,
        lastName,
        email,
    })

    await student.save();

    res.status(201).json(student);
}

async function updateStudentById(req,res){
    const {id} = req.params;
    const{
        firstName,
        lastName,
        email,
    } = req.body;

    const student = await Student.findByIdAndUpdate(id,{firstName,lastName,email},{new:true})
    .exec();

    if(!student){
        res.status(404).json('Student not found');
    }
    
    return res.status(200).json(student);
}

async function deleteStudentById(req,res){
    const{id} = req.params;
    const student = await Student.findByIdAndDelete(id);
    if(!student){
        res.status(404).json('Student not found');
    }

    return res.sendStatus(204);
    }

module.exports = {
    getAllStudent,
    getStudentById,
    addStudent,
    updateStudentById,
    deleteStudentById,
}