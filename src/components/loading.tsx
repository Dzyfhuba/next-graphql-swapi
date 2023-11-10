import styles from './loading.module.css'

const Loading = () => {
  return (
    <span className={styles.spinner} data-testid='loading' />
  )
}

export default Loading