import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <h1>tasked</h1>

      <label className="container">
        <input type="checkbox" checked />
        <span className="content">One</span>
        <span className="checkmark"></span>
      </label>

      <label className="container">
        <input type="checkbox" />
        <span className="content">Two</span>
        <span className="checkmark"></span>
      </label>

      <label className="container">
        <input type="checkbox" />
        <span className="content">Three</span>
        <span className="checkmark"></span>
      </label>

      <label className="container">
        <input type="checkbox" />
        <span className="content">Four</span>
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default Home;
