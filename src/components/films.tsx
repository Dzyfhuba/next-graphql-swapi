import { graphql } from "@/gql";
import { useQuery } from "urql";
import styles from './films.module.css'


const filmsQuery = graphql(`
  query allFilmsWithVariablesQuery199($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
          releaseDate
          producers
          director
        }
      }
    }
  }
`)

const Films = () => {
  const [films, setFilms] = useQuery({
    query: filmsQuery.toString(),
    variables: {
      first: 100
    }
  })
  console.log(films)
  return (
    <section className={styles.container}>
      {
        films.data ?
          films.data?.allFilms?.edges?.map(film => film?.node &&
            <div key={film.node.id} className={styles.film}>
              <h3>{film.node.title}</h3>
              <h4>{film.node.producers}</h4>
            </div>
          )
          : null
      }
    </section>
  )
}

export default Films