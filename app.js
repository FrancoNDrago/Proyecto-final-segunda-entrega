const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const { viewsRouter } = require("./routers/viewsRouter");
const { userRouter } = require("./routers/userRouter");
const { productsRouter } = require("./routers/productsRouter");
const { cartsRouter } = require("./routers/cartsRouter");
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Escuchando en ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("*", (req,res) => {
	res.send("Busqueda no encontrada");
})