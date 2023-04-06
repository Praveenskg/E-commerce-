import React, { useRef, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us";
  }, []);
  const Expire = (props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, props.delay);
      return () => clearTimeout(timer);
    }, [props.delay]);

    return visible ? <div>{props.children}</div> : <div />;
  };

  const [status, setStatus] = useState("");
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wotidz4",
        "template_r4penpe",
        form.current,
        "E-ihRg-UbXpuJ-ONv"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Your message has been sent successfully!");
        },
        (error) => {
          console.log(error.text);
          setStatus("Some thing went wrong. Please try again later.");
        }
      );
    e.target.reset();
  };

  return (
    <>
      <h2 className="text-center my-3">Contact Us</h2>
      <div className=" bg-light rounded offset-4  col-md-4">
        <div className="row justify-content-center">
          <Form
            className="container  col-8 mt-4"
            ref={form}
            onSubmit={sendEmail}
          >
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Control
                className="mb-4"
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
              <Form.Control
                className="mb-4"
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <Form.Control
                className="mt-2"
                name="message"
                rows="?"
                placeholder="Your Message"
                required
              />
            </Form.Group>
            <Button type="submit" className=" btn btn-primary my-3">
              Send
            </Button>
            <div className="status">
              <Expire delay="5000">{status}</Expire>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Contact;
