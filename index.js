const express = require('express');
const oracle = require('./src/utils/oracle');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./src/middleware/errorMiddleware');
const { server } = require('./src/config/config');
const routesUser = require('./src/routes/user');
const routesNotFound = require('./src/routes/notFound');
const routesPerson = require('./src/routes/person');
const routesCategory = require('./src/routes/category');
const guard = require('./src/guard/guard');

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use(routesPerson);
app.use(routesUser);
//app.use(guard);
app.use(guard,routesCategory);
app.use(routesNotFound);
//errors
app.use(errorMiddleware);

oracle.start().then(() => {
    console.log('Oracle database connected.');
    app.listen(server.port, () => {
        console.log(`Server listening on port: ${server.port}`);
    });
}).catch((error) => {
    console.log(error);
})

