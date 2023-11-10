import Films from '@/components/films';
import Urql from '@/providers/urql';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <h1 className={styles.title}>
        Film list
      </h1>
      <Urql>
        <Films />
      </Urql>
    </main>
  )
}

// export default withUrqlClient(() => ({
//   url: "https://graphql.org/swapi-graphql",
//   exchanges: []
// }))(Home);