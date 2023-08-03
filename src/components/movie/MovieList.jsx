/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import "swiper/css";
import { fetcher } from "../../apiConfig/config";

function MovieList({ type = "now_playing" }) {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=0d77d4a00d41dc0294ce678b39584abe`,
    fetcher
  );
  const movie = data?.results || [];
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default MovieList;
