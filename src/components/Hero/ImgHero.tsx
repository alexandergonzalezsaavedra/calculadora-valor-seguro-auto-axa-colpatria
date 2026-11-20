const BG_SRC = '/images/hero/seguros-axa-colpatria-bg-vehiculo.webp';
const VEHICULO_SRC = '/images/hero/seguros-axa-colpatria-vehiculo.webp';

const ImgHero = () => {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute right-0 top-0 hidden h-[350px] w-[52%] lg:block'
    >
      <div
        className='bgVehiculo absolute inset-0 overflow-hidden'
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <img
          src={BG_SRC}
          alt=''
          className='h-full w-full object-cover object-bottom'
        />
        <div className='absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-[#eef2fb]' />
      </div>

      <div className='contenedorVehiculo absolute bottom-[38px] right-[20%] w-[38%] max-w-[340px] translate-y-[17%]'>
        <img
          src={VEHICULO_SRC}
          alt=''
          className='w-full drop-shadow-[0_18px_14px_rgba(15,23,42,0.35)]'
        />
      </div>
    </div>
  );
};

export const ImgHeroMobile = () => (
  <div className='relative mb-6 h-52 overflow-hidden rounded-2xl sm:h-72 lg:hidden'>
    <img
      src={BG_SRC}
      alt=''
      aria-hidden='true'
      className='h-full w-full object-cover object-bottom'
    />
    <img
      src={VEHICULO_SRC}
      alt='asegurada con AXA Colpatria'
      className='absolute bottom-4 left-1/2 w-[70%] max-w-sm -translate-x-1/2 translate-y-[17%] drop-shadow-[0_12px_10px_rgba(15,23,42,0.35)]'
    />
  </div>
);

export default ImgHero;
