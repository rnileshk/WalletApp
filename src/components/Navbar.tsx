import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const styles = {
    navLink: "text-sm hover:font-semibold",
    btn: "border rounded-lg px-3 py-1 text-sm",
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold">WalletApp</Link>

        <nav className="hidden md:flex gap-4">
          <NavLink to="/" className={styles.navLink}>Dashboard</NavLink>
          <NavLink to="/transactions" className={styles.navLink}>Transactions</NavLink>
          <NavLink to="/withdraw" className={styles.navLink}>Withdraw</NavLink>
          <button 
            onClick={() => { logout(); navigate("/login"); }}
            className={styles.btn}
          >
            Logout
          </button>
        </nav>


        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-3 px-4 py-3 md:hidden border-t bg-white text-sm">
          <NavLink to="/" className={styles.navLink} onClick={() => setOpen(false)}>Dashboard</NavLink>
          <NavLink to="/transactions" className={styles.navLink} onClick={() => setOpen(false)}>Transactions</NavLink>
          <NavLink to="/withdraw" className={styles.navLink} onClick={() => setOpen(false)}>Withdraw</NavLink>
          <button 
            onClick={() => { logout(); navigate("/login"); setOpen(false); }}
            className={styles.btn}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
};