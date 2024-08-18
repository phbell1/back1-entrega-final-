import { Router } from "express";
import ProductManager from "../controllers/product-manager.js";

const router = Router();
const manager = new ProductManager("./src/data/products.json");


router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts();
    res.send(arrayProductos);

});

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;

    const producto = await manager.getProductsbyId(parseInt(id));
    if (!producto) {
        res.send("Producto Inexistente")
    } else {
        res.send(producto);
    }
})

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    await manager.addProduct(nuevoProducto);
    res.send("Producto Agregado Con Exito");
})

router.put("/:pid", async (req, res) => {
    let id = req.params.pid;
    const prodUpdate = req.body;
    await manager.updateProduct(parseInt(id),prodUpdate);
    res.send("Producto Modificado Exitosamente");
})

router.delete("/:pid", async (req, res) => {
    let id = req.params.pid;
    await manager.deleteProduct(parseInt(id));
    res.send("Producto Eliminado Exitosamente");
})






export default router;