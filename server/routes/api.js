const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/authUsers', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!')
    }).catch(err => {
    console.log('MONGO OH NO ERROR')
    console.log(err)
})

function verifyToken(req,res,next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject;
    next()
}

router.get('/', (req,res) => {
    res.send('from API route')
})

router.post('/register', async (req,res) => {
    const userData = req.body;
    console.log(userData)
    let user = new User(userData);
    await user.save((error, regUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = {subject: regUser._id};
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    });
})

router.post('/login', async (req,res) => {
try {
    const userData = req.body;
    const findingUser =  await User.findOne({email: userData.email, password: userData.password})

    if(!findingUser) {
        res.status(401).send('Please check your email or password')
    } else {
        let payload = {subject: findingUser._id};
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
    }

} catch (e) {
    console.log(e)
}

})

router.get('/events', verifyToken, async(req,res) => {
    const events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
    ]

   await res.json(events)
})

router.get('/special', verifyToken, async (req,res) => {
    const events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Auto Expo",
            "description": 'Lorem ipsum',
            "date": "2012-04-23T18:25:43.511Z"
        },
    ]

  await res.json(events)
})

module.exports = router;
