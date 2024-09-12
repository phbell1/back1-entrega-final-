
import fs from "fs/promises";

class ProductManager {
    static lastId = 0;


    constructor(path) {
        this.products = [];
        this.path = path; 
        this.loadArray();
    }

    async loadArray(){
        this.products = await this.leerArchivo();
    }



    async addProduct({title, description, code, price, status, stock, category, thumbnails}) {
        const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        const nuevoProducto = {
            id: lastProductId + 1,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        this.products.push(nuevoProducto);
        await this.guardarArchivo(this.products);
    }



    async getProducts() {
        const arrayProductos = await this.leerArchivo();
        return arrayProductos;

    }

    async getProductsbyId(id) {
        const arrayProductos = await this.leerArchivo();
        const buscado = arrayProductos.find(item => item.id === id);

        if (!buscado) {
            return "El Producto solicitado no existe";
        } else {
            return buscado;
        }
    }

    async updateProduct(id, prodUpdate) {
        const arrayProductos = await this.leerArchivo();
        const index = arrayProductos.findIndex(item => item.id === id);
        if (index !== -1) {
            arrayProductos[index] = { ...arrayProductos[index], ...prodUpdate };
            await this.guardarArchivo(arrayProductos);
            console.log("Producto Actualizado");
        } else {
            console.log("Producto Inexistente");
        }
    }

    async deleteProduct(id) {
        const arrayProductos = await this.leerArchivo();
        const index = arrayProductos.findIndex(item => item.id === id);
        if (index !== -1) {
            arrayProductos.splice(index, 1);
            await this.guardarArchivo(arrayProductos);
            console.log("Producto Eliminado");
        } else {
            console.log("Producto Inexistente");
        }


    }


    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
    }

    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }


}

export default ProductManager;
