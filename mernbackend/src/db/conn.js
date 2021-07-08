const mongooes = require('mongoose')
    // databaseName : nodeFirstDb
    // database connection
mongooes.connect("mongodb://localhost:27017/nodeFirstDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
        // UnhandledPromiseRejectionWarning: true
}).then(() => {
    // console.log('connection Successfully');
}).catch((e) => {
    console.log('connection Failed', console.error);

})