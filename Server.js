import path from "path";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";
import multer from "multer";
import express from "express";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Create connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase",
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

var imagename = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log(file);

    imagename = Date.now() + path.extname(file.originalname) + "";
    console.log(imagename);
    cb(null, imagename);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

//route for homepages
app.get("/show", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for insert data
app.post("/saveproduct", upload.single("file"), (req, res) => {
  let data = { name: req.body.name, price: req.body.price, image: imagename };
  console.log(data);
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for Update data
app.post("/updateproduct", (req, res) => {
  let sql =
    "update product set name='" +
    req.body.name +
    "',price=" +
    req.body.price +
    " where product_id=" +
    req.body.id;
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/show");
  });
});

//route for delete
app.get("/productdelete/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM product WHERE product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/show");
  });
});

//route for Edit
app.get("/productedit/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "select * from product WHERE product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// login
app.post("/login", (req, res) => {
  let sql =
    "select * from users where username='" +
    req.body.username +
    "' and password='" +
    req.body.password +
    "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// reg
app.post("/register", (req, res) => {
  let sql =
    "INSERT INTO users  SET username ='" +
    req.body.username +
    "'and email ='" +
    req.body.email +
    "'password='" +
    req.body.password +
    "'type =customer'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Add  product in  cart
app.post("/addcart", function (req, res) {
  let data = {
    customer_name: "Praveen",
    product_id: req.body.id,
    qty: req.body.qty,
  };
  let sql = "INSERT INTO cart set ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// View Cart
app.get("/viewcart", (req, res) => {
  let sql =
    "SELECT product.product_id,product.name,product.price,product.image,cart.qty FROM product,cart where product.product_id=cart.product_id";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get("/viewcartcount", (req, res) => {
  let sql = " SELECT count(*) count from cart";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//route to delete item from cart
app.get("/dltcart/:id", function (req, res) {
  const id = req.params.id;
  let sql = "delete from cart where product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/viewcart");
  });
});
//route for delete Cart
// app.get("/delcart/:id", function (req, res) {
//   const id = req.params.id;
//   console.log(id);
//   let sql =
//     "DELETE FROM cart WHERE product_id=" + id + " and Customer_name='Praveen'";
//   let query = conn.query(sql, (err, results) => {
//     if (err) throw err;
//     res.redirect("/viewcart");
//   });
// });
app.listen(8000, () => {
  console.log(`express server running on 8000`);
});
