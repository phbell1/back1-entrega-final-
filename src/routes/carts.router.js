import { Router } from "express";
import CartManager from "../dao/db/cart-manager.db.js";

const router = Router();

const cartManager = new CartManager();

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }

})

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cartSearch = await cartManager.getCartById(cartId);
        res.json(cartSearch.products);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }

})



router.put('/:cartId/product/:productId', async (req, res) => {  
    const { cartId, productId } = req.params;  
    const { quantity } = req.body; 

    try {  
        const updatedCart = await cartManager.updateProductQuant(cartId, productId, quantity);  
        res.status(200).json({  
            message: "Cantidad actualizada exitosamente.",  
            cart: updatedCart  
        });  
    } catch (error) {  
        res.status(500).json({  
            error: error.message  
        });  
    }  
});  



router.delete('/:cartId', async (req, res) => {  
    const { cartId } = req.params;  

    try {  
        const updatedCart = await cartManager.clearCart(cartId);  
        res.status(200).json({  
            message: "Todos los productos han sido eliminados del carrito.",  
            cart: updatedCart  
        });  
    } catch (error) {  
        res.status(500).json({  
            error: error.message  
        });  
    }  
});  




export default router;