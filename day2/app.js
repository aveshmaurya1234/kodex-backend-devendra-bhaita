let express = require('express')

let app = express()
app.use(express.json())

let users = [];

app.get("/", (req, res) => {
    return res.send("hello")
})

app.post("/get-user", (req, res) => {
    users.push(req.body)
    return res.status(201).json({
        message: "User created successfully.",
    })
})

app.get("/users", (req, res) => {
    return res.status(200).json({
        message: "User fetched successfully.",
        users,
    })
})

app.patch("/users/update/:index", (req, res) => {
    let {index} = req.params;
    let {price} = req.body;
    users[index].price = price

    return res.status(200).json({
        message: "User update successfully.",
        users,
    })
})

app.delete("/users/delete/:index", (req, res) => {
    let {index} = req.params;
    // delete keyword will not remove the element from the array, it will just set the value to undefined. 
    // delete users[index]
    // So we can use splice method to remove the element from the array.
    users.splice(index, 1)
    
    return res.status(200).json({
        message: "User deleted successfully.",
        users,
    })
})

module.exports = app;