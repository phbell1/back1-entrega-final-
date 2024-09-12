import CartModel from "../models/cart.model.js";

class CartManager {


    async laodArray() {
        const data = await this.leerArchivo();
        if (this.carts.length > 0) {
            this.ultId = Math.max(...this.carts.map(cart => cart.id));
        }
    }

    async createCart() {
        try {
            const newCart = new CartModel({ products: [] })
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error al intentar crear un carrito");
        }
    }


    async getCartById(cartId) {
        try {
            const cartSearch = await CartModel.findById(cartId);
            if (!cartSearch) {
                console.log("Carrito Inexistente")
            }
            return cartSearch;

        } catch (error) {
            console.log("Error al obtener carrito por ID");
        }
    }

    async addCartItem(cartId, productId, quant = 1) {
        try {
            const cart = await this.getCartById(cartId);
            if (!cart) {
                console.log("Carrito Inexistente");
            }
            const prodExist = cart.products.find(prod => prod.product.toString() === productId);
            if (prodExist) {
                prodExist.quant += quant;
            } else {
                cart.products.push({ product: productId, quant });
            }
            
            cart.markModified("products");
            await cart.save();
            return cart;

        } catch (error) {
            console.log("Error al agregar item al carrito");
        }
    }


}

export default CartManager;