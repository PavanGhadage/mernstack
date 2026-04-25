import "../style/Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>

      <div className="contact-info">
        <p>
          <strong>Address:</strong> Nashik, Maharashtra, India
        </p>
        <p>
          <strong>Phone:</strong> +91 9876543210
        </p>
        <p>
          <strong>Email:</strong> info@incredibleindia.com
        </p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Enter your name" />
        <input type="email" placeholder="Enter your email" />
        <textarea placeholder="Enter your message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
