import { Link, NavLink } from "react-router-dom";
import styles from "./Pagenav.module.css";
import Logo from "../Logo/Logo";

function Pagenav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <Link to="/app/cities" className={styles.ctaLink}>
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagenav;
