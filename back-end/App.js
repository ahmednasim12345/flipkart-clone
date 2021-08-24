const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv');
const { static } = require("express");
const morgan = require('morgan');
 dotenv.config();

require('./src/database/index');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(morgan());

// app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use("/public", static(path.join(__dirname, "/src/uploads")));

// Routers

const orderRouter = require('./src/router/order.router')
const addressRouter =  require('./src/router/Admin/address.router');
const pageRouter = require('./src/router/Admin/page.router')
const initialDataRouter = require('./src/router/Admin/initalData.router');
const cartRouter = require('./src/router/cart.router')
const categoryRouter = require('./src/router/category.router')
const userRouter = require('./src/router/user.router')
const adminRoute = require('./src/router/Admin/admin.router');
const productRouter = require('./src/router/product.router');


// =====>
app.use('/api',orderRouter);
app.use('/api',addressRouter);
app.use('/api',pageRouter)
app.use('/api',initialDataRouter);
app.use('/api',cartRouter);
app.use('/api', productRouter);
app.use('/api',categoryRouter);
app.use('/api',userRouter);
app.use('/api',adminRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

