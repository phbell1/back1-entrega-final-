import { Router } from "express";
import ProductManager from "../controllers/product-manager.js";

const router = Router();
const manager = new ProductManager("./src/data/products.json");

router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("index", {productos});
    
});



export default router