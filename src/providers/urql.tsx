'use client'
import { ReactNode } from "react"
import { Client, Provider, cacheExchange, fetchExchange, ssrExchange } from "urql"


type Props = {
  children: ReactNode
}

const Urql = (props: Props) => {
  const isServerSide = typeof window === 'undefined';
  const ssr = ssrExchange({
    isClient: !isServerSide,
    initialState: !isServerSide ? window.__URQL_DATA__ : undefined
  })

  const client = new Client({
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    exchanges: [cacheExchange, fetchExchange, ssr]
  })
  return (
    <Provider value={client}>
      {props.children}
    </Provider>
  )
}

export default Urql