import { Car, Check, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Paso {
  icono: LucideIcon;
  texto: string;
}

const PASOS: Paso[] = [
  {
    icono: Car,
    texto: 'Ingresa el valor comercial y la antigüedad de tu vehículo.',
  },
  {
    icono: Check,
    texto: 'Indica si necesitas vehículo de reemplazo en caso de siniestro.',
  },
  {
    icono: ShieldCheck,
    texto:
      'Compara el Plan Esencial y el Plan Plus y te recomendaremos el más adecuado.',
  },
];

/** Guía inicial: se muestra a la izquierda del formulario antes de la primera cotización. */
const IntroCard = () => (
  <aside
    aria-labelledby='titulo-intro'
    className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'
  >
    <h2
      id='titulo-intro'
      className='text-2xl font-bold text-indigo-950'
    >
      Guía: cotiza en 3 pasos
    </h2>
    <p className='mt-2 text-slate-600'>
      Completa los datos de tu vehículo y presiona{' '}
      <strong className='text-indigo-950'>Calcular y comparar planes</strong>{' '}
      para ver la comparación de coberturas.
    </p>

    <ol className='mt-6 space-y-3'>
      {PASOS.map(({ icono: Icono, texto }, index) => (
        <li
          key={texto}
          className='flex items-center gap-4 rounded-xl bg-indigo-50/60 p-4 text-slate-700'
        >
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#00008f] shadow-sm'>
            <Icono
              className='h-5 w-5'
              aria-hidden='true'
            />
          </span>
          <span>
            <strong className='text-indigo-950'>{index + 1}.</strong> {texto}
          </span>
        </li>
      ))}
    </ol>
  </aside>
);

export default IntroCard;
