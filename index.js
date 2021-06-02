require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const cookieSession = require('cookie-session')

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

// allow cors requests from any origin and with credentials
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions,{ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/admin', require('./Admin/admin.controller'));
app.use('/student', require('./Student/student.controller'));
app.use('/teacher', require('./Teacher/teacher.controller'));
app.use('/permission', require('./Permissions/permission.controller'));
app.use('/roles', require('./Roles/role.controller'));
app.use('/class', require('./Class/class.controller'));

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3005;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
