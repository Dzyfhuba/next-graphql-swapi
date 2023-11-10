'use client'
import { ReactNode } from "react"
import { Client, Provider, cacheExchange, fetchExchange, ssrExchange } from "urql"


type Props = {
  children: ReactNode
}

const Urql = (props: Props) => {
  const client = new Client({
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    exchanges: [cacheExchange, fetchExchange]
  })
  return (
    <Provider value={client}>
      {props.children}
    </Provider>
  )
}

export default Urql