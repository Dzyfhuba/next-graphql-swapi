import FilmItem from "@/components/film-item";
import Urql from "@/providers/urql";

type Props = {
  params: {
    id: string
  }
}

const FilmItemPage = (props: Props) => {
  return (
    <main>
      <Urql>
        <FilmItem filmId={props.params.id} />
      </Urql>
    </main>
  );
}

export default FilmItemPage