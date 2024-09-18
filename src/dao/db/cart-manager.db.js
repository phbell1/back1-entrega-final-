import CartModel from "../models/cart.model.js";

class CartManager {


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
                throw new Error("Carrito Inexistente");
            }
            const prodExist = cart.products.find(prod => prod.product.toString() === productId);
            if (prodExist) {
                prodExist.quantity += quant;
                console.log("operacion exitosa");
            } else {
                cart.products.push({ product: productId, quantity: quant });
            }

            cart.markModified("products");
            await cart.save();
            return cart;

        } catch (error) {
            console.log("Error al agregar item al carrito", error);
        }
    }



    async updateProductQuant(cartId, productId, newQuantity) {
        if (!cartId || !productId || newQuantity == null || newQuantity < 0) {
            throw new Error("se requiere cartId, productId y newQuantity mayor o igual a 0.");
        }

        try {
            const cart = await CartModel.findOneAndUpdate(
                { _id: cartId, "products.product": productId },
                { $set: { "products.$.quantity": newQuantity } },
                { new: true }
            );

            if (!cart) {
                throw new Error("Carrito no encontrado o producto inexistente en el carrito.");
            }

            return cart; 
        } catch (error) {
            console.error("Error al actualizar la cantidad del producto:", error);
            throw error;
        }
    }




    async clearCart(cartId) {
        if (!cartId) {
            throw new Error("Se requiere cartId.");
        }

        try {
            const updatedCart = await CartModel.findOneAndUpdate(
                { _id: cartId },
                { $set: { products: [] } },
                { new: true }
            );

            if (!updatedCart) {
                throw new Error("Carrito no encontrado.");
            }

            return updatedCart; 
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            throw error;
        }
    }



}

export default CartManager;