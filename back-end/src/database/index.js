const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONNECTION,{
        useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
    }
).then(() => {
    // if there is connection
    console.log(" db connection is ok")
}).catch(err => {
    console.log(err)
})