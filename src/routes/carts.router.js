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

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    const prodId = req.params.pid;
    const quant = req.body.quant || 1;

    try {
        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).send({ error: "Carrito no encontrado." });
        }

        const cartUpdated = await cartManager.addCartItem(cartId, prodId, quant);

        res.json(cartUpdated.products);
    } catch (error) {
        res.status(500).send({ error: "Error al cargar el producto al carrito" });
    }
})

export default router;