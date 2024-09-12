import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    }, 
    img: {
        type: String,
    },
    thumbnails: {
        type: [String]
    }, 
});

const productModel = mongoose.model("products", productSchema);

export default productModel;