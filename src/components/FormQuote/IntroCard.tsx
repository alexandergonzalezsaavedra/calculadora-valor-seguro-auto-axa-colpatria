import { Car, Check, Info, ShieldCheck } from 'lucide-react';
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

const IntroCard = () => (
  <aside
    aria-labelledby='titulo-intro'
    className='rounded-2xl border border-indigo-100 bg-indigo-50 p-6'
  >
    <header className='flex items-center gap-3'>
      <Info
        className='h-6 w-6 shrink-0 text-indigo-900'
        aria-hidden='true'
      />
      <h2
        id='titulo-intro'
        className='text-lg font-bold text-indigo-950'
      >
        Cotiza tu seguro en 3 pasos
      </h2>
    </header>

    <ol className='mt-4 space-y-3'>
      {PASOS.map(({ icono: Icono, texto }, index) => (
        <li
          key={texto}
          className='flex items-start gap-3 text-sm text-slate-700'
        >
          <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-indigo-700 shadow-sm'>
            <Icono
              className='h-4 w-4'
              aria-hidden='true'
            />
          </span>
          <span className='pt-1.5'>
            <strong className='text-indigo-950'>{index + 1}.</strong> {texto}
          </span>
        </li>
      ))}
    </ol>
  </aside>
);

export default IntroCard;
