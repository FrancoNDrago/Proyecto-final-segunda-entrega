const express = require("express");
const viewsRouter = express.Router();
const { productsModel } = require("../managerFiles/models/products.model");
const { cartsModel } = require("../managerFiles/models/carts.model");


viewsRouter.get("/products", async (req, res) => {
	console.log(req.query);
	const limit = req.query.limit || 10;
	const page  = req.query.page || 1;
	const sort  = req.query.sort ? {price: req.query.sort} : {};
	
	const query     = construirQuery(req.query);
	const productos = await productsModel.paginate(query, {limit, page, sort, lean: true});
	
	res.render("productos/productos", {productos, limit});
});
 
  function construirQuery(query) {
  const posibleFilters = ["title", "description", "price", "stock", "category"];
	let appliedFilters = {};

	posibleFilters.forEach( filter => {
		if (query[filter]) {
			appliedFilters[filter] = {$regex: query[filter]};
		}
	});
	return appliedFilters;
}

module.exports.viewsRouter = viewsRouter;