import { GetStaticProps } from "next";
import { api } from "../services/api";

import ptBR from 'date-fns/locale/pt-BR'
import { parseISO, format } from "date-fns";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

interface IEpisode{
  id: string;
  title: string;
  members:string;
  published_at:string;
  thumbnail:string;
  file:{
    duration:string;
    url:string;
  },
  description:string;
}
interface IHomeProps {
  episodes: IEpisode[];
}
export default function Home(props: IHomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const {data} = await api.get(`episodes`,{
    params:{
      _limit:12,
      _sort:'published_at',
      _order:'desc'
  }});
  const episodes = data.map((episode:IEpisode)=>{
    return{
      id:episode.id,
      title:episode.title,
      thumbnail:episode.thumbnail,
      members:episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale:ptBR}),
      duration:Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description:episode.description,
      url:episode.file.url, 
    };
  })
  console.log(data);
  return {
    props: {
      episodes: episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
