import styles from '@app/page.module.css'
const Footer = () => {
  const date = new Date(Date.now()).getFullYear()
  return (
    <footer className={styles.footer}>
      <p >
      &copy; Copyright {date}
      </p>
    </footer>
  )
}

export default Footer
