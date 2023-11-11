'use client'
import { graphql } from "@/gql";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "urql";
import { useIntersectionObserver, useMediaQuery } from "usehooks-ts";
import Loading from "./loading";
import styles from './people.module.css';
import { MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";

const allPeopleQuery = graphql(`
  query allPeopleQuery($first: Int, $after: String){
    allPeople(first: $first, after: $after){
      totalCount
      edges {
        cursor
        node {
          id
          name
          gender
          birthYear
          height
          mass
          species {
            name
            classification
          }
          filmConnection {
            edges {
              node {
                id
                title
                releaseDate
              }
            }
          }
        }
      }
    }
  }
`)

const People = () => {
  const [count, setCount] = useState<number>(1)
  const smMatches = useMediaQuery('(min-width: 640px)')
  const mdMatches = useMediaQuery('(min-width: 768px)')
  const lgMatches = useMediaQuery('(min-width: 1024px)')
  const [peoples, reExecutePeopleQuery] = useQuery({
    query: allPeopleQuery.toString(),
    variables: {
      first: count * 4 * (lgMatches ? 4 : mdMatches ? 3 : smMatches ? 2 : 1),
      after: null
    }
  })

  const LoadTriggerRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(LoadTriggerRef, {
    threshold: 1
  })

  const router = useRouter()

  const [search, setSearch] = useState<string>()
  const [filter, setFilter] = useState<string>()

  useEffect(() => {
    if (!peoples.fetching && entry?.isIntersecting) {
      reExecutePeopleQuery({
        requestPolicy: 'network-only',
      })
      setCount(count => count + 1)
    }

    const query = new URLSearchParams(window.location.search)
    const search = query.get('search')
    if (search) {
      setSearch(search)
    }
  }, [entry?.isIntersecting, peoples.fetching, reExecutePeopleQuery])

  return (
    <div className={styles.container}>
      <form className={styles.search} onSubmit={(e) => {
        e.preventDefault()
        const inputVal = e.currentTarget.querySelector('input')?.value
        reExecutePeopleQuery()
        setCount(1)
        setFilter(inputVal)
        router.replace(inputVal ? `?search=${inputVal}` : '/characters')
      }}>
        <input type="text" placeholder="Search" name="search" onChange={(e) => setSearch(e.target.value)} defaultValue={search} />
        <button><MdSearch size={24} /></button>
      </form>
      {
        peoples.data
          ? peoples.data?.allPeople?.edges?.filter(a => {
            const query = new URLSearchParams(window.location.search)
            const filterin = (query.get('search') || filter)?.toLocaleLowerCase().replaceAll(' ', '') || ''
            if (!filterin) return true
            return a?.node?.name?.replaceAll(' ', '')?.toLocaleLowerCase().includes(filterin)
          })
          .map((item) => {
            return (
              <div key={item?.node?.id} className={styles.box}>
                <h2 className={styles.title}>{item?.node?.name}</h2>
                <div className={styles['table-grid']}>
                  <span>gender</span><span>{item?.node?.gender}</span>
                  <span>birth year</span><span>{item?.node?.birthYear}</span>
                  <span>height</span><span>{item?.node?.height}</span>
                  <span>mass</span><span>{item?.node?.mass}</span>
                  <span>species</span><span>{item?.node?.species?.name || 'n/a'}</span>
                  <span>classification</span><span>{item?.node?.species?.classification || 'n/a'}</span>
                  <span>film</span><ol>
                    {item?.node?.filmConnection?.edges?.map((film) => (
                      <li key={film?.node?.id}>{film?.node?.title} <span className="badge badge-xs block">{film?.node?.releaseDate}</span></li>
                    ))}
                  </ol>
                </div>
              </div>
            )
          })
          : peoples.fetching ? null : <div>Not Found</div>
      }

      <div ref={LoadTriggerRef} className={'col-span-full justify-self-center' +
        (peoples.fetching || (peoples.data?.allPeople?.totalCount! > count * 4 * (lgMatches ? 4 : mdMatches ? 3 : smMatches ? 2 : 1)) ? '' : ' hidden')
        + (filter ? ' hidden' : '')
      }>
        <Loading />
      </div>
    </div>
  )
}

export default People;