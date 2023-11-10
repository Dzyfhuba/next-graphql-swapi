'use client'
import { graphql } from "@/gql";
import { useQuery } from "urql";
import styles from './films.module.css'
import Loading from "./loading";
import { MdSearch } from 'react-icons/md'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  // get query search

  const [search, setSearch] = useState<string>()
  const [filter, setFilter] = useState<string>()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const search = query.get('search')
    if (search) {
      setSearch(search)
    }
  }, [])

  const router = useRouter()
  return (
    <section className={styles.container}>
      <form className={styles.search} onSubmit={(e) => {
        e.preventDefault()
        setFilter(search)
        router.replace(search ? `?search=${search}` : '/')
      }}>
        <input type="text" placeholder="Search" name="search" onChange={(e) => setSearch(e.target.value)} defaultValue={search} />
        <button><MdSearch size={24} /></button>
      </form>
      {
        films.fetching ?
          <div className="col-span-full justify-self-center">
            <Loading />
          </div>
          :
          films.data ?
            films
              .data?.allFilms?.edges?.filter(a => {
                const query = new URLSearchParams(window.location.search)
                const filterin = (query.get('search') || filter)?.toLocaleLowerCase().replaceAll(' ', '') || ''
                if (!filterin) return true
                return a?.node?.title?.replaceAll(' ', '')?.toLocaleLowerCase().includes(filterin)
                  || a?.node?.director?.replaceAll(' ', '')?.toLocaleLowerCase().includes(filterin)
                  || a?.node?.producers?.join(' ').replaceAll(' ', '').toLocaleLowerCase().includes(filterin)
                  || a?.node?.releaseDate?.replaceAll(' ', '')?.toLocaleLowerCase().includes(filterin)
              })
              .map(film => film?.node &&
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