import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

export const App: FC = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Activities</Link>
          <Link to="character">Character</Link>
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
