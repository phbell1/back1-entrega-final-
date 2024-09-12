
const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
})


const renderProducts = (products) => {
    const contProductos = document.getElementById("cont-prods");
    contProductos.innerHTML = "";
    products.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `<p> ${item.id} </p>
                          <p> ${item.title} </p>
                          <p> ${item.price} </p>
                          <button> Eliminar </button>`

        contProductos.appendChild(card);
        
        card.querySelector("button").addEventListener("click", () => {
            delProd(item.id);
        })
    }) 
}

const delProd = (id) =>{
    socket.emit("delProd", id);
}
