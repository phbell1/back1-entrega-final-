import productModel from "../models/product.model.js";


class ProductManager {

    async loadArray() {
        this.products = await this.leerArchivo();
    }

    async addProduct({ title, description, code, price, img, stock, category, thumbnails }) {
        try {
            const existCode = await productModel.findOne({ code: code });

            if (existCode) {
                console.log("El codigo debe ser unico")
                return;
            }


            const nuevoProducto = new productModel({
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category,
                img,
                thumbnails
            })

            await nuevoProducto.save();

            await this.guardarArchivo(this.products);
        } catch (error) {
            console.log("Error al agregar un producto")
        }
    }


    async getProducts() {
        const arrayProductos = await productModel.find().lean();
        return arrayProductos;

    }

    async getProductsbyId(id) {
        try {
            const prodBuscado = await productModel.findById(id);

            if (!prodBuscado) {
                console.log("producto no encontrado");
                return null;
            } else {
                console.log("producto encontrado");
                return prodBuscado;
            }
        } catch (error) {
            console.log("Error al buscar por id", error);

        }
    }

    async updateProduct(id, prodUpdate) {
        try {
            const updt = await productModel.findByIdAndUpdate(id, prodUpdate);
            if (!updt) {
                console.log("Producto Buscado Inexistente");
                return null;
            }
            return updt;
        } catch (error) {
            console.log("Error al actualizar productos")
        }
    }

    async deleteProduct(id) {
        try {
            const del = await productModel.findByIdAndDelete(id);
            if (!del) {
                console.log("No Existe el producto a eliminar");
                return null;
            }
            return del;
        } catch (error) {
            console.log("Error al eliminar un producto");
        }
    }

}

export default ProductManager;
