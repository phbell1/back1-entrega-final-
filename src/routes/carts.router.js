import { Router } from "express";
import CartManager from "../controllers/cart-manager.js";

const router = Router();

const cartManager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.send(newCart);
})

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cartSearch = await cartManager.getCartById(cartId);
    res.send(cartSearch.products);
})

router.post("/:cid/product/:pid", async (req, res) => {  
    try {  
        const cartId = parseInt(req.params.cid);  
        const prodId = req.params.pid;  
        const quant = req.body.quant !== undefined ? req.body.quant : 1;  

    
        const cart = await cartManager.getCartById(cartId);  
        if (!cart) {  
            return res.status(404).send({ error: "Carrito no encontrado." });  
        }  

        const cartUpdated = await cartManager.addCartItem(cartId, prodId, quant);  
        
        res.send(cartUpdated.products);  
    } catch (error) {   
        res.status(500).send({ error: "Error al cargar el producto al carrito" });  
    }  
})

export default router;