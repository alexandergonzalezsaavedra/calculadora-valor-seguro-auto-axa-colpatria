import './index.css';
import HeroMain from './components/Hero/HeroMain';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <HeroMain />
      </main>
    </>
  );
}

export default App;
