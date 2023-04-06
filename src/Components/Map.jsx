import React from "react";

export default function Map() {
  return (
    // Important! Always set the container height explicitly
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.819214346255!2d76.76662911551114!3d30.723482393128638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedb20a52166b%3A0xa5aa7e953e4064b1!2sOops%20Info%20Solutions!5e0!3m2!1sen!2sin!4v1660661520760!5m2!1sen!2sin"
        width="100%"
        height="300px"
        title="Map"
        style={{ border: 0, marginTop: "1rem" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
