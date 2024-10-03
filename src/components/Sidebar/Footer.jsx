import styles from "./Sidebar.module.css";

function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        Footer
        <p className={styles.copyright}>
          © Copyright {new Date().getFullYear()} by WorldWise Inc
        </p>
      </footer>
    </div>
  );
}

export default Footer;
