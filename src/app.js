//PRIMERA PRE-ENTREGA BACKEND 1

import express from "express";

const PORT = 8080;
const app = express();

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import { Socket } from "socket.io";


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use(express.json());
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);



app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`);
})
 
