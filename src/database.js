import mongoose from "mongoose";

mongoose.connect("mongodb+srv://pablohbell1:jacko1234@cluster0.u9mtu.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Conectado a la DB"))
.catch(() => console.log("Error al conectar a la DB"))