const mongoose = require('mongoose');

const connectToDB = () => {
    const connectionString = process.env.CONNECTION_STRING;
    if(!connectionString){
        console.error('connection string not defined');
        //正常退出：程序执行完毕，不需要监听也不需要等待异步请求完成
        //非正常退出：程序抛出了未被处理的退出。
        //人为正常退出
        //process.exit(0)
        //人为非正常退出
        //process.exit(1)
        process.exit(1);//shut down the whole process
    }

    const db = mongoose.connection;
    db.on('connected',()=>{
        console.log(`DB connected,${connectionString}`);
    })

    db.on('error',(error)=>{
        console.error(error.message);
        process.exit(2)
    })

    db.on('disconnected',()=>{
        console.log('db connection lost')
    })
    return mongoose.connect(connectionString);//Connect is also a promise.
}

module.exports = connectToDB;