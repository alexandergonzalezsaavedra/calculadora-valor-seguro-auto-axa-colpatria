import './index.css';
import HeroMain from './components/Hero/HeroMain';
import ImgHero from './components/Hero/ImgHero';
import Navbar from './components/Navbar/Navbar';
import VehicleQuote from './components/FormQuote/VehicleQuote';
import SelectType from './components/FormQuote/SelectType';
import IntroCard from './components/FormQuote/IntroCard';
import Features from './components/Features/Features';
import { useAppSelector } from './store/store';

function App() {
  const hayCotizacion = useAppSelector(
    (state) => state.quote.primaBase !== null,
  );

  return (
    <div className='bg-[#eef2fb]'>
      {/* Header + hero comparten contenedor para que la imagen suba detrás del header */}
      <div className='relative overflow-hidden bg-gradient-to-b from-white to-[#eef2fb]'>
        <ImgHero />

        <header className='relative z-20 border-b border-slate-200/70'>
          <Navbar />
        </header>

        <main>
          <div className='relative mx-auto max-w-7xl px-4 sm:px-6'>
            <HeroMain />

            <section
              aria-label='Calculadora de prima'
              className='calculadora relative z-10 pb-10'
            >
              {/* El formulario se mantiene en la misma posición del árbol para no perder su estado */}
              <div className='grid items-start gap-6 lg:grid-cols-12'>
                <div
                  className={hayCotizacion ? 'lg:col-span-5' : 'lg:col-span-7'}
                >
                  <VehicleQuote />
                </div>

                {hayCotizacion ? (
                  // Después de calcular: tabla comparativa a la derecha
                  <div
                    key='planes'
                    className='animar-entrada-derecha lg:col-span-7'
                  >
                    <SelectType />
                  </div>
                ) : (
                  // Al inicio: guía de lo que hará el usuario, a la izquierda del formulario
                  <div
                    key='intro'
                    className='animar-entrada-izquierda order-first lg:col-span-5'
                  >
                    <IntroCard />
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      <Features />
    </div>
  );
}

export default App;
