import Films from '@/components/films';
import Urql from '@/providers/urql';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect } from 'react';

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