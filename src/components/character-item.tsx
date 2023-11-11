'use client'
import { graphql } from "@/gql"
import { useQuery } from "urql"
import styles from './character-item.module.css'
import Link from "next/link"
import { inDevelopment } from "@/function/alert"

type Props = {
  characterId: string
}


const characterByIdQuery = graphql(`
  query characterByIdQuery($id: ID!) {
    person(id: $id) {
      name
      gender
      birthYear
      height
      mass
      skinColor
      eyeColor
      hairColor
      filmConnection {
        totalCount
        edges {
          node {
            id
            title
          }
        }
      }
      homeworld {
        id
        name
      }
      species {
        id
        name
      }
      starshipConnection {
        edges {
          node {
            id
            name
          }
        }
      }
      vehicleConnection {
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

const CharacterItem = (props: Props) => {
  const [char] = useQuery({
    query: characterByIdQuery.toString(),
    variables: { id: decodeURIComponent(props.characterId) },
  })

  if (char.fetching) return <p>Loading...</p>

  if (char.error) return <p>Oh no... {char.error.message}</p>

  const character = char.data?.person

  if (!character) return <p>Oh no... no character found</p>

  return (
    <div>
      <h1 className={styles.title}>{character.name}</h1>

      <div className={styles.gridBox}>
        <span>Gender</span>
        <span>{character.gender}</span>
        <span>Birth Year</span>
        <span>{character.birthYear}</span>
        <span>Height</span>
        <span>{character.height}</span>
        <span>Mass</span>
        <span>{character.mass}</span>
        <span>Skin Color</span>
        <span>{character.skinColor}</span>
        <span>Eye Color</span>
        <span>{character.eyeColor}</span>
        <span>Hair Color</span>
        <span>{character.hairColor}</span>
        <span>Homeworld</span>
        <span>{character.homeworld?.name}</span>
        <span>Species</span>
        <span>{character.species?.name || 'n/a'}</span>
      </div>

      <h3 className={styles.subTitle}>Films</h3>
      <div className={styles.boxFlex}>
        {character.filmConnection?.edges?.map((e, i) => (
          <Link
            key={i}
            href={`/films/${e?.node?.id}`}
            className={styles.actionLink}
          >
            {e?.node?.title}
          </Link>
        ))}
      </div>

      <h3 className={styles.subTitle}>Homeworld</h3>
      <div className={styles.boxFlex}>
        <button
          onClick={inDevelopment}
          className={styles.actionLink + ' opacity-70'}
        >
          {character.homeworld?.name}
        </button>
      </div>

      {
        (character.starshipConnection?.edges?.length || 0) > 0 &&
        <>
          <h3 className={styles.subTitle}>Starships</h3>
          <div className={styles.boxFlex}>
            {character.starshipConnection?.edges?.map((e, i) => (
              <button
                key={i}
                className={styles.actionLink + ' opacity-70'}
                onClick={inDevelopment}
              >
                {e?.node?.name}
              </button>
            ))}
          </div>
        </>
      }

      {
        (character.vehicleConnection?.edges?.length || 0) > 0 &&
        <>
          <h3 className={styles.subTitle}>Vehicles</h3>
          <div className={styles.boxFlex}>
            {character.vehicleConnection?.edges?.map((e, i) => (
              <button
                key={i}
                className={styles.actionLink + ' opacity-70'}
                onClick={inDevelopment}
              >
                {e?.node?.name}
              </button>
            ))}
          </div>
        </>
      }
    </div>
  )
}

export default CharacterItem