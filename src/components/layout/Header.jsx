import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Header;
