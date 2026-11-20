const TitleHero = () => {
  return (
    <div className='relative z-10 max-w-xl pt-8 pb-8 lg:pt-10 lg:pb-12'>
      <span className='inline-block rounded-md bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-950'>
        Seguro de Autos
      </span>
      <h1 className='mt-4 text-4xl font-extrabold leading-tight tracking-tight text-indigo-950 sm:text-5xl'>
        Calcula tu prima estimada
      </h1>
      <p className='mt-3 text-lg text-slate-700'>
        Conoce en minutos el valor de tu seguro y compara el plan que mejor se
        adapta a ti.
      </p>
    </div>
  );
};

export default TitleHero;
