'use client'
import { graphql } from "@/gql";
import { useQuery } from "urql";
import Loading from "./loading";
import styles from './film-item.module.css'
import moment from "moment";
import Link from "next/link";
import Swal from "sweetalert2";
import { inDevelopment } from "@/function/alert";

type Props = {
  filmId: string
}

const filmByIdQuery = graphql(`
  query filmByIdQuery ($id: ID!) {
    film (id: $id) {
      id
      title
      director
      producers
      releaseDate
      created
      characterConnection {
          totalCount
          edges {
              node {
                  id
                  name
              }
          }
      }
      speciesConnection {
          totalCount
          edges {
              node {
                  id
                  name
              }
          }
      }
      planetConnection {
          totalCount
          edges {
              node {
                  id
                  name
              }
          }
      }
      starshipConnection {
          totalCount
          edges {
              node {
                  id
                  name
              }
          }
      }
      vehicleConnection {
          totalCount
          edges {
              node {
                  id
                  name
              }
          }
      }
    }
  }
`)

const FilmItem = (props: Props) => {
  const [film] = useQuery({
    query: filmByIdQuery.toString(),
    variables: {
      id: decodeURIComponent(props.filmId)
    }
  })

  

  return (
    <div>
      {
        film.fetching ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : (
          film.data ? (
            <div>
              <h1 className={styles.title}>
                {film.data.film?.title}
              </h1>
              <small className={styles.releaseDate}>{moment(film.data.film?.releaseDate || moment.now()).format('DD MMMM Y')}</small>

              <div className={styles.gridBox}>
                <span>Director</span>
                <span>{film.data.film?.director}</span>
                <span>Producers</span>
                <ol>
                  {
                    film.data.film?.producers?.map((e, i) => <li key={i}>{e}</li>)
                  }
                </ol>
              </div>

              <h3 className={styles.subTitle}>Characters</h3>
              <div className={styles.boxFlex}>
                {
                  film.data.film?.characterConnection?.edges?.map((e, i) =>
                    <Link
                      key={i}
                      href={`/characters/${e?.node?.id}`}
                      className={styles.actionLink}
                    >
                      {e?.node?.name}
                    </Link>
                  )
                }
              </div>

              <h3 className={styles.subTitle}>Species</h3>
              <div className={styles.boxFlex}>
                {
                  film.data.film?.speciesConnection?.edges?.map((e, i) =>
                    <button
                      type='button'
                      key={i}
                      className={styles.actionLink + ' opacity-70'}
                      onClick={inDevelopment}
                    >{e?.node?.name}
                    </button>
                  )
                }
              </div>

              <h3 className={styles.subTitle}>Planets</h3>
              <div className={styles.boxFlex}>
                {
                  film.data.film?.planetConnection?.edges?.map((e, i) =>
                    <button
                      type='button'
                      key={i}
                      className={styles.actionLink + ' opacity-70'}
                      onClick={inDevelopment}
                    >{e?.node?.name}
                    </button>
                  )
                }
              </div>

              <h3 className={styles.subTitle}>Starships</h3>
              <div className={styles.boxFlex}>
                {
                  film.data.film?.starshipConnection?.edges?.map((e, i) =>
                    <button
                      type='button'
                      key={i}
                      className={styles.actionLink + ' opacity-70'}
                      onClick={inDevelopment}
                    >{e?.node?.name}
                    </button>
                  )
                }
              </div>

              <h3 className={styles.subTitle}>Vehicles</h3>
              <div className={styles.boxFlex}>
                {
                  film.data.film?.vehicleConnection?.edges?.map((e, i) =>
                    <button
                      type='button'
                      key={i}
                      className={styles.actionLink + ' opacity-70'}
                      onClick={inDevelopment}
                    >{e?.node?.name}
                    </button>
                  )
                }
              </div>
            </div>
          ) : (
            <>No Data</>
          )
        )
      }
    </div>
  );
}

export default FilmItem