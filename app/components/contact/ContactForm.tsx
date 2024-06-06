// components/contact/ContactForm.js
import React, { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        required
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />
      <button type="submit" className="submit-btn">
        Subscribe
      </button>
    </form>
  );
};

export default ContactForm;
