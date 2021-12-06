const Course = require('../models/course');

async function getAllCourse(req,res){
    //db.courses.find()
    //query(chain)
   const courses =  Course.find().exec();//it will return a promise.
   return res.json(courses);
}

function getCourseById(req,res){

}

async function addCourse(req,res){
    const {code, name, description} = req.body;
    //validate data
    /* 一般情况下不建议这样存取数据 原因：
    1.这样存数据 依赖于Mongoose自身的validation，
    2.如果从request.body里面取数据的话。会导致给request一定的可能性来访问
    甚至修改数据库内的数据，非常不安全。
    */
    //new Course(req.body);
    const course = new Course({//this is a piece of document
        name,
        code,
        description,
    })


    await course.save()// = document.save() it can store teh document in the database.
    return res.status(201).json(course);
}

function updateCourseById(req,res){
    
}

function deleteCourseById(req,res){

}

module.exports = {
    getAllCourse,
    getCourseById,
    addCourse,
    updateCourseById,
    deleteCourseById,
}