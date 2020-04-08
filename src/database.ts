import mongoose from 'mongoose';


//INITIALIZATIONS
const dbIP: string = '127.0.0.1';
const dbPort: number = 27017;
const dbName: string = 'Minim1Example-Database';


//SETTINGS
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useUnifiedTopology', true);


//DATABASE START
mongoose.connect(`mongodb://${dbIP}:${dbPort}/${dbName}`)
    .then(db => console.log(`Successful Database connection at mongodb://${dbIP}:${dbPort}/${dbName}\n`))
    .catch(err => console.log(`Failed Database connection at mongodb://${dbIP}:${dbPort}/${dbName} : ${err}\n`));