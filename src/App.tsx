import './index.css';
import HeroMain from './components/Hero/HeroMain';
import Navbar from './components/Navbar/Navbar';
import VehicleQuote from './components/FormQuote/VehicleQuote';
import SelectType from './components/FormQuote/SelectType';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <HeroMain />

        <section className='calculadora'>
          <div className='grid grid-cols-8'>
            <div className='col-span-4'>
              <VehicleQuote />
            </div>
            <div className='col-span-8'>
              <SelectType />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
