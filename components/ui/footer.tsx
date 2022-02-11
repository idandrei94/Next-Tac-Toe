import React from 'react';

import styles from '@/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/idandrei94" className={styles.footerContent}>
        @Dan Iorga - 2022
      </a>
    </footer>
  );
};

export default Footer;
