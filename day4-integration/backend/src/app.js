let express = require('express');
const ProductModel = require('./moduls/product.modul');
const cors = require('cors')

let app = express()
app.use(express.json())
// middleware to allow cross-origin requests from the frontend
app.use(cors({
    origin:'http://localhost:5173'
}))

app.get("/", (req, res) => {
    return res.send("hello")
})

app.post('/create-product', async (req, res) => {
    try {
        let { name, description, amount, currency, category, stock } = req.body;

        if (!name || !amount || !stock)
            return res.status(400).json({
                message: "All fields are required",
            });
        
        let newProduct = await ProductModel.create({
            productName: name,
            description,
            price: {
                amount,
                currency,
            },
            category,
            stock,
        });

        return res.status(201).json({
            message: "Product Created Successfully",
            product: newProduct,
        });
        
    } catch (error) {
        console.log("errror in create api", error);
        return res.status(500).json({
            message: "Internal server error",
        });         
    }
})

app.get('/all-product', async (req, res) => {
    try {
        let allProduct = await ProductModel.find();

        return res.status(200).json({
            message: "Product fetched Successfully",
            allProduct,
        });
        
    } catch (error) {
        console.log("errror in create api", error);
            return res.status(500).json({
            message: "Internal server error",
        });         
    }
})

app.get('/single-product/:id', async (req, res) => {
    try {
        let {id} = req.params;
        let singleProduct = await ProductModel.findById(id);

        return res.status(200).json({
            message: "Single Product fetched Successfully",
            singleProduct,
        });
        
    } catch (error) {
        console.log("errror in create api", error);
        return res.status(500).json({
        message: "Internal server error",
        });         
    }
})

app.put('/product/update/:id', async (req, res) => {
    try {
        let { name, description, amount, currency, category, stock } = req.body;
        let {id} = req.params;
        
        let updateProduct = await ProductModel.findByIdAndUpdate( id, {
            productName: name,
            description,
            price: {
                amount,
                currency,
            },
            category,
            stock,
        },{
            new: true
        });

        return res.status(200).json({
            message: "Product updated Successfully",
            updateProduct,
        });
        
    } catch (error) {
        console.log("errror in create api", error);
        return res.status(500).json({
        message: "Internal server error",
        });         
    }
})

app.delete('/product/update/:id', async (req, res) => {
    try {
        let {id} = req.params;
        let delProduct = await ProductModel.findByIdAndDelete( id);

        return res.status(200).json({
            message: "Product deleted Successfully",
            delProduct,
        });
        
    } catch (error) {
        console.log("errror in create api", error);
        return res.status(500).json({
        message: "Internal server error",
        });         
    }
})

module.exports = app;