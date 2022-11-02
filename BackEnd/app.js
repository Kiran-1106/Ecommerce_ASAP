const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Shop API",
            description: "Backend Api",
            contact: {
                name: 'Amazing Developer'
            },
            servers: "http://localhost:3000"
        }
    },
    apis: ["app.js", ".routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(`/api/docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Import Routes
const productsRouter = require('./routes/product');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

//Use Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

module.exports = app;
