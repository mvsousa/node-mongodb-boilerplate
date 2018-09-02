import bodyParser from 'body-parser';
import express from 'express';

import Router from './Router';
import { root } from '../app';
import { MongoDB } from '../db/index';

const dashUrl = process.env.DASH_URL || 'http://localhost:8080';
const env = process.env.NODE_ENV || 'local';
const port = process.env.PORT || 3300;
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/yourmongodb';
const jwtsecret = process.env.JWTSECRET || 'any';

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(function(req, res, next) {
	const origin = req.headers.origin;

	res.header('Access-Control-Allow-Origin', origin);
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

	next();
});

// Setting Env Variables to app
app.set('dashUrl', dashUrl);
app.set('env', env);
app.set('mongoUrl', mongoUrl);
app.set('port', port);

const mongo = new MongoDB(env, mongoUrl);
mongo.init();

const router = new Router(app, jwtsecret, mongo);
router.init();

process.on('unhandledRejection', (reason, p) => {
	console.log(reason);
	console.log(p);
});

app.listen(port, err => {
	if(err) console.log(err);
	else console.log(`Server online - Listening to port ${port}`);
});
