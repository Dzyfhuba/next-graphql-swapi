'use client'
import Films from '@/components/films';
import Urql from '@/providers/urql';
import { withUrqlClient } from 'next-urql';
import { gql, useQuery } from 'urql';

export default function Home() {

  return (
    <main>
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