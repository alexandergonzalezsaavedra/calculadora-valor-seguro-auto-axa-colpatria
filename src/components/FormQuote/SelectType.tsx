import { Check, Info, ShieldCheck, ShieldPlus, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setVehiculoReemplazo } from '../../store/quoteSlice';

type PlanId = 'esencial' | 'plus';

interface Cobertura {
  nombre: string;
  incluida: boolean;
}

interface Plan {
  id: PlanId;
  nombre: string;
  descripcion: string;
  multiplicador: number;
  icono: LucideIcon;
  coberturas: Cobertura[];
}

const PLANES: Plan[] = [
  {
    id: 'esencial',
    nombre: 'Plan Esencial',
    descripcion: 'Protección básica para tu vehículo',
    multiplicador: 1,
    icono: ShieldCheck,
    coberturas: [
      { nombre: 'Asistencia en carretera', incluida: true },
      { nombre: 'Vehículo de reemplazo', incluida: false },
      { nombre: 'Asistencia jurídica', incluida: false },
    ],
  },
  {
    id: 'plus',
    nombre: 'Plan Plus',
    descripcion: 'Mayor cobertura y respaldo en todo momento',
    multiplicador: 1.35,
    icono: ShieldPlus,
    coberturas: [
      { nombre: 'Asistencia en carretera', incluida: true },
      { nombre: 'Vehículo de reemplazo', incluida: true },
      { nombre: 'Asistencia jurídica', incluida: true },
    ],
  },
];

const formatCOP = (amount: number): string =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);

/** Prima del plan redondeada al peso. */
export const calcularPrimaPlan = (primaBase: number, multiplicador: number) =>
  Math.round(primaBase * multiplicador);

const SelectType = () => {
  const primaBaseGuardada = useAppSelector((state) => state.quote.primaBase);
  const vehiculoReemplazo = useAppSelector(
    (state) => state.quote.vehiculoReemplazo,
  );
  const dispatch = useAppDispatch();

  if (primaBaseGuardada === null) {
    return null;
  }

  const primas: Record<PlanId, number> = {
    esencial: calcularPrimaPlan(primaBaseGuardada, PLANES[0].multiplicador),
    plus: calcularPrimaPlan(primaBaseGuardada, PLANES[1].multiplicador),
  };
  const diferencia = primas.plus - primas.esencial;
  // El Plan Plus siempre es el recomendado
  const recomendado: PlanId = 'plus';
  // Sincronizado con el checkbox: con vehículo de reemplazo → Plus; sin él → Esencial
  const seleccionado: PlanId = vehiculoReemplazo ? 'plus' : 'esencial';
  const planSeleccionado = PLANES.find((plan) => plan.id === seleccionado)!;
  const motivo = vehiculoReemplazo
    ? 'Te recomendamos el Plan Plus porque indicaste que necesitas vehículo de reemplazo.'
    : 'Te recomendamos el Plan Plus por su mayor cobertura. Si buscas el menor precio, el Plan Esencial es tu opción.';

  return (
    <section
      aria-labelledby='titulo-planes'
      className='w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'
    >
      <h2
        id='titulo-planes'
        className='text-2xl font-bold text-indigo-950 mb-6'
      >
        2. Compara nuestras coberturas
      </h2>

      <div
        role='radiogroup'
        aria-labelledby='titulo-planes'
        className='grid gap-5 sm:grid-cols-2'
      >
        {PLANES.map((plan) => {
          const esRecomendado = plan.id === recomendado;
          const estaSeleccionado = plan.id === seleccionado;
          const Icono = plan.icono;
          return (
            <label
              key={plan.id}
              className={`relative block cursor-pointer rounded-2xl border p-6 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 ${
                esRecomendado ? 'bg-indigo-50/40' : 'bg-white'
              } ${
                estaSeleccionado
                  ? 'border-indigo-500 shadow-md ring-1 ring-indigo-400'
                  : 'border-slate-200 shadow-sm hover:border-indigo-200'
              }`}
            >
              <input
                type='radio'
                name='plan'
                value={plan.id}
                checked={estaSeleccionado}
                // Elegir Plus marca "vehículo de reemplazo"; elegir Esencial lo desmarca
                onChange={() =>
                  dispatch(setVehiculoReemplazo(plan.id === 'plus'))
                }
                className='sr-only'
              />

              {esRecomendado && (
                <span className='absolute -top-3 right-4 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white'>
                  Recomendado
                </span>
              )}

              {/* Indicador visual de selección */}
              <span
                aria-hidden='true'
                className={`absolute right-4 top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  estaSeleccionado
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {estaSeleccionado && (
                  <Check
                    className='h-3 w-3'
                    strokeWidth={3}
                  />
                )}
              </span>

              <span className='flex items-start gap-3 pr-6'>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    plan.id === 'plus'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <Icono
                    className='h-6 w-6'
                    aria-hidden='true'
                  />
                </span>
                <span>
                  <span className='block text-lg font-bold text-indigo-950'>
                    {plan.nombre}
                  </span>
                  <span className='block text-sm text-slate-600'>
                    {plan.descripcion}
                  </span>
                </span>
              </span>

              <span className='mt-5 block'>
                <strong className='block text-3xl font-bold text-indigo-950'>
                  {formatCOP(primas[plan.id])}
                </strong>
                <span className='text-sm text-slate-600'>
                  prima anual estimada
                </span>
              </span>

              <ul className='mt-5 space-y-2.5 border-t border-slate-200 pt-4'>
                {plan.coberturas.map((cobertura) => (
                  <li
                    key={cobertura.nombre}
                    className={`flex items-center gap-3 text-sm ${
                      cobertura.incluida ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {cobertura.incluida ? (
                      <Check
                        className='h-5 w-5 text-emerald-600'
                        aria-label='Incluida'
                      />
                    ) : (
                      <X
                        className='h-5 w-5 text-slate-400'
                        aria-label='No incluida'
                      />
                    )}
                    {cobertura.nombre}
                  </li>
                ))}
              </ul>
            </label>
          );
        })}
      </div>

      <div
        aria-live='polite'
        className='mt-6 flex items-start gap-3 rounded-xl bg-indigo-50 p-4'
      >
        <Info
          className='mt-0.5 h-5 w-5 shrink-0 text-indigo-900'
          aria-hidden='true'
        />
        <div>
          <p className='font-bold text-indigo-950'>
            Diferencia entre planes: {formatCOP(diferencia)} al año
          </p>
          <p className='text-sm text-slate-700'>{motivo}</p>
          <p className='mt-1 text-sm text-slate-700'>
            Plan seleccionado:{' '}
            <strong className='text-indigo-950'>
              {planSeleccionado.nombre}
            </strong>{' '}
            · {formatCOP(primas[seleccionado])} al año
          </p>
        </div>
      </div>
    </section>
  );
};

export default SelectType;
