import { Link } from "react-router"

const Footer = () => {
  return (
    <>
    <footer className="section__container footer__container">
    <div className="footer__col">
      <h4>CONTACT INFO</h4>
      <p>
        <span><i className="ri-map-pin-2-fill"></i></span>123, London Bridge
        Street, London
      </p>
      <p>
        <span><i className="ri-mail-fill"></i></span>support@Lebaba.com
      </p>
      <p>
        <span><i className="ri-phone-fill"></i></span>(+012) 3456 789
      </p>
    </div>
    <div className="footer__col">
      <h4>COMPANY</h4>
      <Link to="#">Home</Link>
      <Link to="#">About Us</Link>
      <Link to="#">Work With Us</Link>
      <Link to="#">Our Blog</Link>
      <Link to="#">Terms &amp; Conditions</Link>
    </div>
    <div className="footer__col">
      <h4>USEFUL LINK</h4>
      <Link to="#">Help</Link>
      <Link to="#">Track My Order</Link>
      <Link to="#">Men</Link>
      <Link to="#">Women</Link>
      <Link to="#">Dresses</Link>
    </div>
    
  </footer>
  <div className="footer__bar">
    Copyright © 2025 Fahim. All rights reserved.
  </div>
    </>
  )
}

export default Footer