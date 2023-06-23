import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './Routes/index.js';
// import cors from 'cors'
const app = express();
// app.use(cors);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || '';
    let errorData = [];

    if(error.data) {
        errorData = error.data;
    }
    res.status(status).json({
        message, statusCode : status, error : errorData
    })
});

mongoose.connect('mongodb+srv://keshu_jat:deepak00105@cluster0.kjmni.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
.then((res) => console.log('connected to db'))
.catch((err) => console.log(err))
const port = 3000
app.listen(port, (req, res) => {
    console.log('listening at port 3000');
})