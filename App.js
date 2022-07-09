const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const axios = require("axios");
const router = express.Router();
const port = process.env.PORT | 3000;

// const datas = require("./getData");

app.set("view engine", "ejs");

app.use("/public", express.static("public"));
const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));
const name = {
  na: "Bidhu",
  age: 24,
};



// get all Products through API
axios
  .get("https://fakestoreapi.com/products")
  .then((res) => {
    allProducts(res.data);
  })
  .catch((err) => console.error(err));

const allProducts = (data) => {
 
  app.get("/", (req, res) => {
    res.render("index", { data });
  });
};

// Product
app.get("/product/:id", (req, res) => {
  console.log(req.params.id);
  axios
    .get(`https://fakestoreapi.com/products/${req.params.id}`)
    .then((product) => {
      console.log(product);
      res.render("product", { product: product.data });
    });
});

//Cart

app.get('/Cart',(req,res)=>{
    res.render('Cart')
})

// routing
router.get("/", (req, res) => {
  res.render("index", { data });
});

router.get("/product/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.render("product");
});

// Listening
app.listen(port, (req, res) => {
  console.log("FakeStore Listening on port", port);
});
