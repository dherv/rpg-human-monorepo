import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

export const App: FC = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Menu</Link>
          <Link to="/activities">Activities</Link>
          <Link to="character">Character</Link>
          <Link to="new-session">Log Session</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default App;
