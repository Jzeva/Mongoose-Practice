const Course = require('../models/course');
const Joi = require('joi');

async function getAllCourse(req,res){
    //db.courses.find()
    //query(chain)
   const courses =  await Course.find().exec();//it will return a promise.
   return res.json(courses);
}

async function getCourseById(req,res){
    const{id} = req.params;
    const course = await Course.findById(id).exec();//Mongoose can translate this id to String.
    if(!course){
        return res.status(404).json({error:'course not found'});
    }
    return res.json(course);
}

async function addCourse(req,res){
    // const {code, name, description} = req.body;

    const schema = Joi.object({
        name:Joi.string().required(),
        code:Joi.string().regex(/^[a-zA-Z]+[0-9]$/).required(),
        description:Joi.string(),
    });

    const {code,name,description} = await schema.validateAsync(req.body,{
        allowUnknown:true, //是否接受未在model里设定好的参数
        stripUnknown:true, //属否要去掉未在model里设定好的参数
    })
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

async function updateCourseById(req,res){
    const { id } = req.params;
    const { name, description} = req.body;
    //db.collections.updateOne({_id:id},{$set})

    /*     There is two ways to change the data,the first one is:
    const course = await Course.findById(id);
    course.name = name;
    course.description = description;
    await course.save();
    And the other way is: */

    /* 
    两者不同：
    1.上面的写法是先把document取出来并且转换为mongoose的document的对象，
    然后进行修改，这种写法会触发mongoose的validation；
    而下面的写法需要自己对数据的有效性进行验证
    2.上面的是两条请求，先取数据，然后存数据，
    下面的只有一条请求，找到数据，然后修改返回数据。

    注：用哪种方法主要取决于是要自己做validation还是要mongoose做validation。
    */


    //The{new : true} param can help return the new data after changing, 
    //otherwise it will be the old data
    const course = await Course.findByIdAndUpdate(id,{name,description},{new:true})
    .exec();
    if(!course){
        return res.status(404).json({error:'course not found'});
    }

    return res.json(course);
}

async function deleteCourseById(req,res){
    const{id} = req.params;
    const course = await Course.findByIdAndDelete(id).exec();
    if(!course){
        return res.status(404).json({error:'course not found'});
    }
    return res.status(204).json(course);
}

module.exports = {
    getAllCourse,
    getCourseById,
    addCourse,
    updateCourseById,
    deleteCourseById,
}