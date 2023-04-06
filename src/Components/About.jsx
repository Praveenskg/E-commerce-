import { useEffect } from "react";
function About() {
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
        alt=""
        style={{ width: "100%", height: "93vh" }}
      />
    </div>
  );
}
export default About;
