import React from "react";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-neutral text-white p-4 fixed bottom-0">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by DevConnect
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
