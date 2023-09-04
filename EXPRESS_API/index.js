const express = require('express')
const app = express()
const port = 3000

// Use Json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors())

const {validateUser} = require('./schemas/user')
const {validateStudyRoom} = require('./schemas/studyRoom')
const {validateReservation} = require('./schemas/reserve');
const { object } = require('zod');

// Esto no es REST pero mientras tantillo
let users = []
let reserves = []
let studyRooms = []

for (let i = 7; i < 19; i++) {
    let newReserve = {
        name: null,
        id: null,
        time: i
    }
    reserves.push(newReserve)
}

for (let i = 1; i < 7; i++) {
    let newStudyRoom = {
        name: `Room ${i}`,
        building: "Main Building",
        reservations: reserves
    }
    studyRooms.push(newStudyRoom)
}

//////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Trees speaking Vietnamese on port ${port}`)
})

app.get('/', (req, res)=>{
    res.send("API IS RUNNING")
})

//////////////////////////////////////////////////////////////////////////

app.get('/users', (req, res)=>{
    res.send({"users":users})
})

app.post('/users', (req, res) => {
    const userValidationResult = validateUser(req.body)
    console.log("result", userValidationResult.error)

    if(userValidationResult.error){
        return res.status(400).send(
            {message:JSON.parse(userValidationResult.error.message)}
        )
    }

    let newUser = {
        name:userValidationResult.data.name,
        last:userValidationResult.data.last,
        id:userValidationResult.data.id,
    }
    users.push(newUser)
    res.status(201).send({"message":"New GI in the jungle!", "user":newUser})
})

app.delete('/users/:id', (req, res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = users.findIndex(user=>user.id==idToDelete)
    let userDeleted = users.splice(indexToDelete, 1)
    //console.log("user delete: ", userDeleted)
    res.send("GI Lost! id: " + userDeleted[0].id)
})

//////////////////////////////////////////////////////////////////////////

app.get('/studyRooms', (req, res)=>{
    res.send({"study rooms":studyRooms})
})

//////////////////////////////////////////////////////////////////////////

app.get('/reservations', (req, res)=>{
    res.send({"reservations":reserves})
})