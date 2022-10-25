import resize from './api/resize';
import variable from '../variables';
import functions from '../functions';

variable.routes.get('/', functions.callbackFunctionForRoutes);

variable.routes.use('/resize', resize);

export default variable.routes;
