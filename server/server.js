const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const api = require('./routes/api');
app.use(bodyParser.json());
app.use(cors());


app.use('/api', api);
app.get('/', (req,res) => {
    res.send('Hello from server');
})

app.listen(3000, () => {
    console.log('LISTENING ON 3000');
})
