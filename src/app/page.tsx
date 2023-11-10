// 'use client'
import Films from '@/components/films';
import Urql from '@/providers/urql';
import { withUrqlClient } from 'next-urql';
import { gql, useQuery } from 'urql';
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {

  return (
    <main>
      <h1 className={styles.title}>
        Film list
      </h1>
      <Link href={'/characters'}>Test</Link>
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