import  authorization from "./middlewares/authorization";
import * as createError from 'http-errors';
import * as express from 'express';
import * as  path from 'path';
import * as http from  'http';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as cors from "cors";
import indexRouter from './routes';
import * as rateLimit from 'express-rate-limit';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument  from './swagger.json';

const options = {
    explorer: false,
    customCss: '.swagger-ui .topbar { display:none}',
    sorter: "alpha",
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-muted.css'
};
require('dotenv').config();
const app = express();

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'web')));

const limiter = rateLimit({
    max: 100,
    windowMs: 60  * 1000,
    message: 'too many requests sent by this ip, please try again in an hour !'
});
app.use(limiter);
app.use('/api/docs', swaggerUi.serve,  swaggerUi.setup(swaggerDocument, options));

app.use('/api', authorization, indexRouter);

app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
        status: "error",
        message: err.message,
        stack: err.stack,
    });
});

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
}


export default app;
