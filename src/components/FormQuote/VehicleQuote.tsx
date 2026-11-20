import { useAppDispatch, useAppSelector } from '../../store/store';
import { setQuoteResult, setVehiculoReemplazo } from '../../store/quoteSlice';
import { useState } from 'react';
import { Calculator, ChevronDown, Info, RefreshCw } from 'lucide-react';

interface AntiguedadOption {
  id: number;
  antiguedad: string;
  factor: number;
}

const MIN_VALOR_COMERCIAL = 20_000_000;
const MAX_VALOR_COMERCIAL = 300_000_000;
const TASA_BASE = 0.03;

const antiguedadVehiculo: AntiguedadOption[] = [
  { id: 1, antiguedad: '0 a 2 años', factor: 1 },
  { id: 2, antiguedad: '3 a 5 años', factor: 1.1 },
  { id: 3, antiguedad: '6 a 10 años', factor: 1.25 },
  { id: 4, antiguedad: 'Más de 10 años', factor: 1.4 },
];

/** Formatea solo dígitos con separador de miles colombiano: 85000000 → 85.000.000 */
const formatMiles = (digitos: string): string =>
  digitos ? new Intl.NumberFormat('es-CO').format(Number(digitos)) : '';

const ICONO_INFO = 'h-4 w-4 text-slate-500';
const CAMPO =
  'w-full rounded-lg border border-slate-300 bg-white py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00008f]/40 focus:border-[#00008f]';

const VehicleQuote = () => {
  const dispatch = useAppDispatch();
  const primaBaseGuardada = useAppSelector((state) => state.quote.primaBase);

  const [valorComercialInput, setValorComercialInput] = useState<string>('');
  const [factorSeleccionado, setFactorSeleccionado] = useState<string>('');
  const [errorValor, setErrorValor] = useState<string>('');
  const [errorAntiguedad, setErrorAntiguedad] = useState<string>('');

  // Vive en el store: se sincroniza con la tarjeta de plan seleccionada
  const vehiculoReemplazo = useAppSelector(
    (state) => state.quote.vehiculoReemplazo,
  );
  const valorGuardado = useAppSelector((state) => state.quote.valorComercial);
  const factorGuardado = useAppSelector(
    (state) => state.quote.factorAntiguedad,
  );

  const hayCambios =
    primaBaseGuardada !== null &&
    (Number(valorComercialInput) !== valorGuardado ||
      Number(factorSeleccionado) !== factorGuardado);

  const calcularValor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valorNumerico = Number(valorComercialInput);
    const factorNumerico = Number(factorSeleccionado);

    let hayErrores = false;

    if (!valorComercialInput.trim() || Number.isNaN(valorNumerico)) {
      setErrorValor('Ingresa un valor comercial numérico válido.');
      hayErrores = true;
    } else if (
      valorNumerico < MIN_VALOR_COMERCIAL ||
      valorNumerico > MAX_VALOR_COMERCIAL
    ) {
      setErrorValor(
        'El valor comercial debe estar entre $20.000.000 y $300.000.000 COP.',
      );
      hayErrores = true;
    } else {
      setErrorValor('');
    }

    if (
      !factorSeleccionado ||
      Number.isNaN(factorNumerico) ||
      factorNumerico <= 0
    ) {
      setErrorAntiguedad('Selecciona la antigüedad del vehículo.');
      hayErrores = true;
    } else {
      setErrorAntiguedad('');
    }

    if (hayErrores) {
      return;
    }

    const primaCalculada = Math.round(
      valorNumerico * TASA_BASE * factorNumerico,
    );

    dispatch(
      setQuoteResult({
        primaBase: primaCalculada,
        valorComercial: valorNumerico,
        factorAntiguedad: factorNumerico,
        vehiculoReemplazo,
      }),
    );
  };

  return (
    <section
      aria-labelledby='titulo-cotizador'
      className='w-full'
    >
      <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8'>
        <h2
          id='titulo-cotizador'
          className='mb-6 text-2xl font-bold text-indigo-950'
        >
          1. Cuéntanos sobre tu vehículo
        </h2>

        <form
          onSubmit={calcularValor}
          noValidate
          className='space-y-5'
        >
          <div>
            <label
              htmlFor='valor-comercial'
              className='mb-2 flex items-center gap-1.5 font-medium text-slate-800'
            >
              Valor comercial del vehículo
              <span title='Rango permitido: $20.000.000 a $300.000.000 COP.'>
                <Info
                  className={ICONO_INFO}
                  aria-hidden='true'
                />
              </span>
            </label>
            <div className='relative'>
              <span
                aria-hidden='true'
                className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-900'
              >
                $
              </span>
              <input
                id='valor-comercial'
                name='valorComercial'
                type='text'
                inputMode='numeric'
                autoComplete='off'
                value={formatMiles(valorComercialInput)}
                onChange={(e) => {
                  setValorComercialInput(
                    e.target.value.replace(/\D/g, '').slice(0, 12),
                  );
                  if (errorValor) setErrorValor('');
                }}
                aria-invalid={Boolean(errorValor)}
                aria-describedby={errorValor ? 'error-valor' : 'ayuda-valor'}
                placeholder='85.000.000'
                className={`${CAMPO} pl-8 pr-4`}
              />
            </div>
            <p
              id='ayuda-valor'
              className='sr-only'
            >
              Rango permitido: $20.000.000 a $300.000.000 COP.
            </p>
            {errorValor && (
              <p
                id='error-valor'
                role='alert'
                className='mt-1.5 text-sm text-red-600 font-medium'
              >
                {errorValor}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='antiguedad-vehiculo'
              className='mb-2 flex items-center gap-1.5 font-medium text-slate-800'
            >
              Antigüedad del vehículo
              <span title='A mayor antigüedad, mayor es el factor aplicado a la prima.'>
                <Info
                  className={ICONO_INFO}
                  aria-hidden='true'
                />
              </span>
            </label>
            <div className='relative'>
              <select
                id='antiguedad-vehiculo'
                name='antiguedadVehiculo'
                value={factorSeleccionado}
                onChange={(e) => {
                  setFactorSeleccionado(e.target.value);
                  if (errorAntiguedad) setErrorAntiguedad('');
                }}
                aria-invalid={Boolean(errorAntiguedad)}
                aria-describedby={
                  errorAntiguedad ? 'error-antiguedad' : undefined
                }
                className={`${CAMPO} cursor-pointer appearance-none pl-4 pr-11`}
              >
                <option value=''>Selecciona una opción</option>
                {antiguedadVehiculo.map((item) => (
                  <option
                    key={item.id}
                    value={item.factor}
                  >
                    {item.antiguedad}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden='true'
                className='pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-700'
              />
            </div>
            {errorAntiguedad && (
              <p
                id='error-antiguedad'
                role='alert'
                className='mt-1.5 text-sm text-red-600 font-medium'
              >
                {errorAntiguedad}
              </p>
            )}
          </div>

          <div className='flex items-center gap-3 pt-1'>
            <input
              id='vehiculo-reemplazo'
              name='vehiculoReemplazo'
              type='checkbox'
              checked={vehiculoReemplazo}
              onChange={(e) => dispatch(setVehiculoReemplazo(e.target.checked))}
              className='h-5 w-5 shrink-0 cursor-pointer rounded accent-[#1a3cc8]'
            />
            <label
              htmlFor='vehiculo-reemplazo'
              className='text-slate-800 select-none cursor-pointer'
            >
              Necesito vehículo de reemplazo en caso de siniestro
            </label>
          </div>

          <button
            type='submit'
            className='mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#0a1f9c] hover:bg-[#00008f] active:bg-[#000070] text-lg text-white font-semibold px-6 py-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00008f] cursor-pointer'
          >
            {hayCambios ? (
              <RefreshCw
                className='h-5 w-5'
                aria-hidden='true'
              />
            ) : (
              <Calculator
                className='h-5 w-5'
                aria-hidden='true'
              />
            )}
            {hayCambios ? 'Calcular nuevamente' : 'Calcular y comparar planes'}
          </button>
          {hayCambios && (
            <p
              role='status'
              className='text-sm text-amber-700'
            >
              Modificaste los datos. Vuelve a calcular para actualizar los
              planes.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default VehicleQuote;
