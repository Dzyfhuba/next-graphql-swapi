import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        Copyright © 2023 <a href="https://hafidzubaidillah.com" target='_blank'>Hafidz Ubaidillah</a>
      </span>
    </footer>
  );
}

export default Footer;