import './index.css';
import HeroMain from './components/Hero/HeroMain';
import Navbar from './components/Navbar/Navbar';
import VehicleQuote from './components/FormQuote/VehicleQuote';
import SelectType from './components/FormQuote/SelectType';
import IntroCard from './components/FormQuote/IntroCard';
import { useAppSelector } from './store/store';

function App() {
  const hayCotizacion = useAppSelector(
    (state) => state.quote.primaBase !== null,
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <HeroMain />

        <section className='calculadora mx-auto w-full max-w-6xl px-4 py-8'>
          {/* El formulario se mantiene en la misma posición del árbol para no perder su estado */}
          <div className='grid items-start gap-6 lg:grid-cols-5'>
            <div className={hayCotizacion ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <VehicleQuote />
            </div>

            {hayCotizacion ? (
              <div
                key='planes'
                className='animar-entrada-derecha lg:col-span-3'
              >
                <SelectType />
              </div>
            ) : (
              <div
                key='intro'
                className='animar-entrada-izquierda order-first lg:col-span-2'
              >
                <IntroCard />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
