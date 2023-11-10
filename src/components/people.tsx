import { graphql } from "@/gql";
import { useQuery } from "urql";
import styles from './people.module.css'
import Loading from "./loading";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useIntersectionObserver, useMediaQuery } from "usehooks-ts";
import { after } from "node:test";

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
  console.log(count * 4 * (lgMatches ? 4 : mdMatches ? 3 : smMatches ? 2 : 1))

  const LoadTriggerRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(LoadTriggerRef, {
    threshold: 1
  })


  useEffect(() => {
    if (!peoples.fetching && entry?.isIntersecting) {
      console.log('intersecting')
      // reExecutePeopleQuery({
      //   requestPolicy: 'network-only',
      // })
      setCount(count + 1)
    }
    console.log(entry?.isIntersecting)
  }, [entry?.isIntersecting])

  return (
    <div className={styles.container}>
      {
        peoples.data
          ? peoples.data?.allPeople?.edges?.map((item) => {
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
      }>
        <Loading />
      </div>
    </div>
  )
}

export default People;

const PeopleData = (props: {
  after?: string,
  setAfter?: React.Dispatch<SetStateAction<string>>
  setLoadCount?: React.Dispatch<SetStateAction<number>>
}) => {

  return (
    <>

    </>
  )
}