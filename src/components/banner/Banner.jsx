/* eslint-disable react/prop-types */
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { fetcher } from "../../apiConfig/config";
import "swiper/css";
const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=0d77d4a00d41dc0294ce678b39584abe`,
    fetcher
  );

  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] mb-20 page-container">
      <Swiper>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, poster_path } = item;
  return (
    <div className="relative w-full h-full rounded-lg ">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute text-white left-5 bottom-5 w-ful">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
        </div>
        <button className="inline-flex items-center justify-center px-8 py-4 text-white rounded-lg bg-primary">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
