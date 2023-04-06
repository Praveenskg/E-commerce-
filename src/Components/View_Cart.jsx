import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

class View_Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gross: "", mylist: [] };
  }
  updateAmount = () => {
    var myTotal = 0;
    for (var i = 0, len = this.state.mylist.length; i < len; i++) {
      myTotal += this.state.mylist[i].product_price * this.state.mylist[i].qty;
    }
    this.setState({ gross: myTotal });
    localStorage.setItem("gross", myTotal + "");
    localStorage.setItem("products", JSON.stringify(this.state.mylist));
  };

  onIncrementqty = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const qty = e.target.value;
    console.log(id + "   " + qty);
    for (var i = 0, len = this.state.mylist.length; i < len; i++) {
      if (this.state.mylist[i].product_id == id) {
        this.state.mylist[i].qty = qty;
        this.setState({ mylist: this.state.mylist });
        break;
      }
    }
    this.updateAmount();
    const data = { id: id, qty: qty };
    axios.post(`http://localhost:8000/updatecart`, data).then((res) => {
      if (qty == 0) this.setState({ mylist: res.data });
    });
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:8000/viewcart");
    const json = await response.json();
    this.setState({ mylist: json });
    var myTotal = 0;
    console.log(this.state.mylist);
    for (var i = 0, len = this.state.mylist.length; i < len; i++) {
      myTotal += this.state.mylist[i].price * this.state.mylist[i].qty;
    }
    this.setState({ gross: myTotal });
  }

  buildOptions(e) {
    var arr = [];

    for (let i = 0; i <= 10; i++) {
      if (i == e)
        arr.push(
          <option key={i} value={i} selected>
            {i}
          </option>
        );
      else
        arr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
    }

    return arr;
  }

  render() {
    return (
      <div className="container-fluid">
        <h3 align="center">
          <b> Cart Items</b>
        </h3>

        <Table striped bordered hover>
          <thead className="text-center">
            <th>Image</th> <th>Id </th> <th> Name</th>
            <th> Price </th>
            <th>Quantity</th>
          </thead>
          <tbody>
            {this.state.mylist.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>
                    <img
                      src={item.image}
                      width="150"
                      height="150"
                      alt="image"
                    />
                  </td>

                  <td>{item.product_id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>

                  <td>
                    <select id={item.product_id} onChange={this.onIncrementqty}>
                      {this.buildOptions(item.qty)}
                    </select>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="5">Gross Amount {this.state.gross} </td>{" "}
            </tr>
            <tr>
              <td colSpan="4">
                {" "}
                <a href="/payment">Payment</a>{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default View_Cart;
