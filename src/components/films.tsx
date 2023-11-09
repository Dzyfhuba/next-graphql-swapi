import { graphql } from "@/gql";
import { useQuery } from "urql";
import styles from './films.module.css'
import Loading from "./loading";


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
  console.log(films.fetching)
  return (
    <section className={styles.container}>
      {
        films.fetching ? 
          <Loading />
        :
        films.data ?
          films.data?.allFilms?.edges?.map(film => film?.node &&
            <div key={film.node.id} className={styles.film}>
              <h3 className={styles.title}>{film.node.title}</h3>
              <div className={styles['table-grid']}>
                <span>Director</span>
                <span>{film.node.director}</span>
                <span>Producers</span>
                <ol>
                  {
                    film.node.producers?.map((e, i) => <li key={i}>{e}</li>)
                  }
                </ol>
                <span>Release Date</span>
                <time>{film.node.releaseDate}</time>
              </div>
            </div>
          )
          : <>No Data</>
      }
    </section>
  )
}

export default Films