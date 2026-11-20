import { Car, Headset, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Beneficio {
  icono: LucideIcon;
  titulo: string;
  detalle?: string;
}

const BENEFICIOS: Beneficio[] = [
  {
    icono: Car,
    titulo: 'Asistencia en carretera',
    detalle: '24/7 en todo el país',
  },
  {
    icono: ShieldCheck,
    titulo: 'Respaldo de una',
    detalle: 'compañía líder en seguros',
  },
  { icono: Headset, titulo: 'Acompañamiento personalizado' },
];

const Features = () => {
  return (
    <section
      aria-label='Beneficios'
      className='border-t border-slate-200 bg-white'
    >
      <ul className='mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-200'>
        {BENEFICIOS.map(({ icono: Icono, titulo, detalle }) => (
          <li
            key={titulo}
            className='flex items-center gap-4 sm:justify-center sm:px-6'
          >
            <span className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#00008f]'>
              <Icono
                className='h-8 w-8'
                strokeWidth={1.75}
                aria-hidden='true'
              />
            </span>
            <p className='text-base leading-snug text-indigo-950'>
              <strong className='block font-semibold'>{titulo}</strong>
              {detalle && <span className='block'>{detalle}</span>}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
