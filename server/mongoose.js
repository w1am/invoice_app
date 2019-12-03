import mongoose from 'mongoose';
import uri from './mongo';

const db = `mongodb://${uri.dbuser}:${uri.dbpassword}@${uri.hostname}:${uri.port}/${uri.name}`;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

export const startMongooose = () => {
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;
    mongoose.connect(db,
        options,
        (err, res) => {
            if (err) {
                console.log('mongob failed to connect');
                console.log(err);
            } else {
                console.log('connection success')
            }
        }
    ).catch(err => console.log(err))
}