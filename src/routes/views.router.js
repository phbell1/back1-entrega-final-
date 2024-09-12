import { Router } from "express";
import ProductManager from "../dao/db/product-manager.db.js";

const router = Router();
const manager = new ProductManager();

router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("index", {productos});
    
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})


export default router