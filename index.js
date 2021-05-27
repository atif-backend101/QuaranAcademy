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
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/user', require('./User/user.controller'));
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
