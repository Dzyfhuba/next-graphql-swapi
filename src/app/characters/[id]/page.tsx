import CharacterItem from "@/components/character-item"
import { graphql } from "@/gql"
import Urql from "@/providers/urql"
import { useQuery } from "urql"

type Props = {
  params: {
    id: string
  }
}


const CharacterItemPage = (props: Props) => {
  return (
    <main>
      <Urql>
        <CharacterItem characterId={props.params.id} />
      </Urql>
    </main>
  )
}

export default CharacterItemPage