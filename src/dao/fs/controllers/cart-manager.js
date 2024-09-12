import fs from "fs/promises";

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = []; 
        this.ultId = 0;
        this.laodArray();
    }

    async laodArray() {
        const data = await this.leerArchivo();
        if (this.carts.length > 0) {
            this.ultId = Math.max(...this.carts.map(cart => cart.id));
        }
    }

    async createCart() {
        const newCart = {
            id: ++this.ultId,
            products: []
        }
        this.carts.push(newCart);
        await this.guardarArchivo();
        return newCart;
    }

    async getCartById(cartId) {
        const cartSearch = this.carts.find(cart => cart.id === cartId);
        if (!cartSearch) {
            console.log("Carrito Inexistente")
        }
        return cartSearch;
    }

    async addCartItem(cartId, productId, quant = 1) {
        const cart = await this.getCartById(cartId);
        if (!cart){
            console.log("Carrito Inexistente");
        }
        const prodExist = cart.products.find(prod => prod.product === productId);
        if (prodExist) {
            prodExist.quant += quant;
        } else {
            cart.products.push({ product: productId, quant });
        }
        await this.guardarArchivo();
        return cart;
    }


    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayCarts = JSON.parse(respuesta);
        return arrayCarts;
    }

    async guardarArchivo() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }
}

export default CartManager;