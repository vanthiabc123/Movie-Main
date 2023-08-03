import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import useSWR from "swr";
import { fetcher } from "../apiConfig/config";
import MovieCard from "../components/movie/MovieCard";
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=0d77d4a00d41dc0294ce678b39584abe`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center">{title}</h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 border rounded border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <Credist></Credist>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function Credist() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=0d77d4a00d41dc0294ce678b39584abe`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  console.log(data);
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl text-center">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-medium text-center">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=0d77d4a00d41dc0294ce678b39584abe`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  console.log(data);
  if (!results || results.length === 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id}>
            <h3 className="inline-block p-3 mb-5 text-xl font-medium">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              {/* <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullscreen
                className="object-fill w-full h-full"
              ></iframe> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=0d77d4a00d41dc0294ce678b39584abe`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length === 0) return null;
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl font-medium">Similar</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailPage;
