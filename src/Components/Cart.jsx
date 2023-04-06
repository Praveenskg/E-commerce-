import React from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
function onDelete(e) {
  e.preventDefault();
  const id = e.target.id;
  console.log(id);
  axios.get(`http://localhost:8000/delcart/${id}`).then((res) => {
    window.confirm("Are You Sure ");
  });
}

export default class Cart extends React.Component {
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
      <section className="h-100 gradient-custom">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0 text-center">
                    Cart items
                  </MDBTypography>
                </MDBCardHeader>
                {this.state.mylist.map((item, index) => {
                  return (
                    <MDBCardBody key={index}>
                      <MDBRow>
                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                          <MDBRipple
                            rippleTag="div"
                            rippleColor="light"
                            className="bg-image rounded hover-zoom hover-overlay"
                          >
                            <img src={item.image} className="w-100" />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </a>
                          </MDBRipple>
                        </MDBCol>

                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                          <p>
                            <strong> {item.name}</strong>
                          </p>
                          <MDBBtn title="Delete From Cart" onClick={onDelete}>
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>

                          {/* <MDBTooltip
                            wrapperProps={{ size: "sm", color: "danger" }}
                            wrapperClass="me-1 mb-2"
                            title="Move to the wish list"
                          >
                            <MDBIcon fas icon="heart" />
                          </MDBTooltip> */}
                        </MDBCol>
                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <select
                              className="form-control mx-5"
                              id={item.product_id}
                              onChange={this.onIncrementqty}
                            >
                              {this.buildOptions(item.qty)}
                            </select>
                          </div>

                          <p className="text-start text-md-center">
                            <strong> ₹{item.price}</strong>
                          </p>
                        </MDBCol>
                      </MDBRow>

                      <hr className="my-4" />
                    </MDBCardBody>
                  );
                })}
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="mb-4">
                <MDBCardHeader>
                  <MDBTypography tag="h5" className="mb-0">
                    Summary
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>₹{this.state.gross}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>₹49</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong> ₹{49 + this.state.gross}</strong>
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <MDBBtn block size="lg" href="payment">
                    Proceed to Pay
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
