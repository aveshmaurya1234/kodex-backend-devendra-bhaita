let express = require('express')
const UserModel = require('./models/user.model')
let app = express()
app.use(express.json())

app.get('/', (req, res) => {
    return res.send("ok")
})

app.post('/create-user', async (req, res) => {

    try {
        let {name, email, mobile, password} = req.body;
        console.log(req.body)

        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        let newUser = await UserModel.create({
            name, email, mobile, password
        })
        return res.status(201).json({
            message: "User created successfully",
            user : newUser,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }

})

app.get('/all-user', async (req, res) => {
    let user = await UserModel.find()
    return res.status(200).json({
        message: "User feched successfully",
        user
    })
})

app.get('/single-user/:id', async (req, res) => {
    let {id} = req.params;
    let user = await UserModel.findById(id)
    return res.status(200).json({
        message: "User feched successfully",
        user
    })
})

app.put('/users/update/:id', async (req, res) => {

    try {
        let {name, email, mobile, password} = req.body;

        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        let {id} = req.params;
        let updateuser = await UserModel.findByIdAndUpdate(id, {
            name, email, mobile, password
        },{
            new: true
        })

        return res.status(200).json({
            message: "User updated successfully",
            updateuser,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }

})

app.delete('/users/delete/:id', async (req, res) => {

    try {

        let {id} = req.params;
        let deleteuser = await UserModel.findByIdAndDelete(id)

        return res.status(200).json({
            message: "User delete successfully",
            deleteuser,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }

})


module.exports = app;