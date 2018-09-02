import mongoose from 'mongoose';

export default class MongoDB {
	constructor(env, mongoUrl) {
		this.env = env;
		this.mongoUrl = mongoUrl;
	}

	init() {
		const Schema = mongoose.Schema;
		mongoose.connect(this.mongoUrl);
		console.log(`MONGO: Connected to ${this.env} - ${this.mongoUrl}`);
	}

}
