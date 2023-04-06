import React, { useState, useEffect } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Product() {
  const [id, setMyid] = useState(0);
  const [mylist, setMylist] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [file, setFile] = useState("");
  function change1(e) {
    setName(e.target.value);
  }

  function change2(e) {
    setPrice(e.target.value);
  }
  function change3(e) {
    setFile(e.target.files[0]);
    console.log(file);
  }

  useEffect(() => {
    Axios.get("http://localhost:8000/show").then((res) => setMylist(res.data));
  }, []);

  function onEdit(e) {
    e.preventDefault();
    const id = e.target.id;
    Axios.get(`http://localhost:8000/productedit/${id}`).then((res) => {
      console.log(id);
      console.log(res.data[0].name);
      setName(res.data[0].name);
      setPrice(res.data[0].price);
      setMyid(res.data[0].id);
    });
  }

  function onDelete(e) {
    e.preventDefault();
    const _id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:8000/productdelete/${_id}`).then((res) => {
      setMylist(res.data);
      window.confirm("Are You Sure ");
    });
  }

  function submit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    console.log(file);
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post("http://localhost:8000/saveproduct", formData, config).then(
      (res) => console.log(" 1 data saved")
    );
    window.location.reload();
  }
  function update(e) {
    e.preventDefault();

    let data = { id: id, name: name, price: price };
    Axios.post("http://localhost:8000/updateproduct", data).then((res) =>
      console.log("record updated")
    );
    window.location.reload();
  }
  return (
    <>
      <h2 className="text-center">Add Product /Update</h2>
      <div className=" row justify-content-center">
        <Form className="col-md-3 col-md-2 col-md-offset-4">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              className=""
              type="Text"
              placeholder="Enter Product Name"
              value={name}
              required
              onChange={change1}
            />
          </Form.Group>
          <Form.Group controlId="formBasic">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              className=""
              type="Text"
              placeholder="Enter Product Price"
              value={price}
              required
              onChange={change2}
            />
          </Form.Group>
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" name="file" id="file" onChange={change3} />
          <Button variant="success" className="mx-1 my-2" onClick={submit}>
            Submit
          </Button>
          <Button variant="dark" className="mx-1" onClick={update}>
            Update
          </Button>
        </Form>
      </div>

      <h2 className="text-center bg-danger">Product Details</h2>
      <div className="container-fluid">
        <Table striped bordered hover size="lg">
          <thead className="text-center">
            <tr className=" bg-primary">
              <th># </th>
              <th>Product_Image</th>
              <th>Product_Name</th>
              <th>Product_Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {mylist.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.product_id}</td>
                  <td>
                    <img
                      src={item.image}
                      alt="Product"
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>{item.name}</td>

                  <td>{item.price}₹</td>
                  <td>
                    <Button
                      variant="primary"
                      id={item.product_id}
                      onClick={onEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      id={item.product_id}
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
