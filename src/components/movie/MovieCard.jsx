/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const { backdrop_path, title, release_date, vote_average, id } = item;
  return (
    <div className="flex flex-col h-full p-3 rounded-lg select-none movieCard bg-slate-800">
      <img
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movies/${id}`)}
          className="inline-flex items-center justify-center px-8 py-4 mt-auto text-white rounded-lg bg-primary"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
