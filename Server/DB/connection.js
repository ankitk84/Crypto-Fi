const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB', process.env.MONGO);
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})