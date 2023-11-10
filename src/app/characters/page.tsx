import Urql from '@/providers/urql'
import styles from './page.module.css'
import People from '@/components/people'

const Characters = () => {
  return (
    <main>
      <h1 className={styles.title}>Characters list</h1>
      <Urql>
        <People />
      </Urql>
    </main>
  )
}

export default Characters