const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");

app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//multer
var imagename = "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log(file);

    imagename = Date.now() + path.extname(file.originalname) + "";
    cb(null, imagename);
  },
});
const fileFilter = (req, file, cb) => {
  console.log("Filter for file");
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Create connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "send",
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//route for show data on browser
app.get("/showproducts", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for insert image
app.post("/saveproduct", upload.single("file"), (req, res) => {
  let data = {
    name: req.body.name,
    price: req.body.price,
    product_image: imagename,
    category: req.body.category,
  };
  console.log(data);
  console.log(req.body.file);
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;

    res.redirect("/showproducts");
  });
});

//route increase qty
app.get("/incqty/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "update cart set qty=qty+1  WHERE name='ramu' and id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/viewcart");
  });
});

//route for decrease qty
app.get("/decqty/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql =
    "update cart set qty=qty-1 WHERE qty>0 AND name='ramu' and id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/viewcart");
  });
});

//route for  product delete
app.get("/productdelete/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM product WHERE id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/showproducts");
  });
});

//route to delete item from cart
app.get("/dltcart/:id", function (req, res) {
  const id = req.params.id;
  let sql = "delete from cart where product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/results");
  });
});

//route for delete cart
app.get("/delcart/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql =
    "DELETE FROM cart WHERE product_id=" + id + " and Customer_name='Praveen'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/viewcart");
  });
});

//route for edit cart
app.get("/productedit/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "select * FROM product WHERE id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for update data
app.post("/updateproduct", (req, res) => {
  let data = { name: req.body.name, price: req.body.price };
  console.log(data);
  let sql =
    "update product set name='" +
    req.body.name +
    "',price=" +
    req.body.price +
    " where id=" +
    req.body.id;
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/showproducts");
  });
});

//Add Cart
app.get("/addcart/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id);
  var flag = 1;
  let sql1 = "select * from cart where id in(" + id + ")";
  let promise = new Promise((resolve, reject) => {
    conn.query(sql1, async (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
  let result = await promise;
  if (result.length <= 0) {
    console.log("ddddddd " + flag);

    let sql = "insert into cart values('ramu'," + id + ",1)";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } else res.json();
});

//route for viewcart
app.get("/viewcart", (req, res) => {
  let sql =
    "SELECT product.id,product.name,product.price,product.product_image,cart.qty FROM product,cart where product.id=cart.id";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for viewcount
app.get("/viewcount", (req, res) => {
  let sql = "SELECT  count(*) count from cart";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);

    console.log(results);
  });
});

//login
app.post("/login", (req, res) => {
  let sql =
    "select * from login where username='" +
    req.body.username +
    "' and password='" +
    req.body.password +
    "'";
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for category products
app.get("/category/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "";
  if (id == "allproducts") sql = "select * from product";
  else sql = "SELECT * FROM product where category='" + id + "'";
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//payment
app.post("/payment", async (req, res) => {
  let data1 = { customer_name: req.body.cname, amount: req.body.amount };

  let sql = "INSERT INTO bill SET ?";
  let promise = new Promise((resolve, reject) => {
    conn.query(sql, data1, async (err, resultSet) => {
      if (err) reject(err);
      resolve(resultSet);
    });
  });

  let result = await promise;
  console.log(result);
  console.log("hello");

  console.log("done promise");
  let data = {
    customer_name: req.body.cname,
    cardno: req.body.cardno,
    amount: req.body.amount,
  };
  console.log(data);
  sql = "INSERT INTO payment SET ?";
  query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
  });

  var billno = 10;
  let s = "select max(billno) 'billno' FROM bill ";
  let promise1 = new Promise((resolve, reject) => {
    query = conn.query(s, async (err, results) => {
      if (err) throw err;
      resolve(results);

      //console.log("billno="+billno)
    });
  });
  let myresult = await promise1;
  billno = myresult[0].billno;

  let sql1 = "delete from bill_items";
  let prom = new Promise((resolve, reject) => {
    conn.query(sql1, async (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  let o = req.body.products;
  console.log("billno=" + billno);

  console.log(o);
  for (x in o) {
    console.log(o[x]);
    let sql =
      "INSERT INTO bill_items values(" +
      billno +
      "," +
      o[x].id +
      "," +
      o[x].qty +
      "," +
      o[x].price +
      ") ";
    console.log(sql);
    conn.query(sql, data, (err, results) => {
      if (err) throw err;
    });
  }
});

//bill
app.post("/bill", (req, res) => {
  console.log("generating bill");
  let cname1 = req.body.cname;
  let sql =
    "select bill.billno,bill.customer_name,amount,product_id,product.name,purchase_qty,bill_items.product_price from bill,bill_items, product where bill.billno = bill_items.billno and bill_items.product_id= product.id";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(4700, () => {
  console.log(` server listening  on port 4700`);
});
