import { Router } from "express";
import ProductManager from "../dao/db/product-manager.db.js";

const router = Router();
const manager = new ProductManager();


router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts();
    res.send(arrayProductos);

});

router.get("/:pid", async (req, res) => {
    try {
        let id = req.params.pid;

        const producto = await manager.getProductsbyId(id);
        if (!producto) {
            res.send("Producto Inexistente")
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.send("Error al buscar id en productos")
    }

})

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    try {
        await manager.addProduct(nuevoProducto);
        res.status(201).json({
            message: "Producto Agregado Exitosamente"
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" })
    }

})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const prodUpdate = req.body;
    try {
        await manager.updateProduct(id, prodUpdate);
        res.status(201).json({
            message: "Producto Actualizado Exitosamente"
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" })
    }
})

router.delete("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        await manager.deleteProduct(id);
        res.status(201).json({
            message: "Producto Eliminado Exitosamente"
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" })
    }

})






export default router;