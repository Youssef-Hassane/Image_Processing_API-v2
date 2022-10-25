import routes from './routes/index';
import functions from './functions';
import variable from './variables';

variable.application.use('/api', routes);

// Listening for the port number and the callback function
variable.application.listen(
  variable.serverPortNumber,
  functions.theCallbackFunctionOfListenOfServer
);

// Exporting the application
export default variable.application;
