import { useAppDispatch, useAppSelector } from '../../store/store';
import { setQuoteResult } from '../../store/quoteSlice';
import { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

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

const formatCOP = (amount: number): string =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);

const VehicleQuote = () => {
  const dispatch = useAppDispatch();
  const primaBaseGuardada = useAppSelector((state) => state.quote.primaBase);

  const [valorComercialInput, setValorComercialInput] =
    useState<string>('85000000');
  const [factorSeleccionado, setFactorSeleccionado] = useState<string>('1.1');
  const [vehiculoReemplazo, setVehiculoReemplazo] = useState<boolean>(false);
  const [errorValor, setErrorValor] = useState<string>('');
  const [errorAntiguedad, setErrorAntiguedad] = useState<string>('');

  const valorGuardado = useAppSelector((state) => state.quote.valorComercial);
  const factorGuardado = useAppSelector(
    (state) => state.quote.factorAntiguedad,
  );
  const reemplazoGuardado = useAppSelector(
    (state) => state.quote.vehiculoReemplazo,
  );

  // Hay cambios si ya existe una cotización y algún campo difiere de lo guardado
  const hayCambios =
    primaBaseGuardada !== null &&
    (Number(valorComercialInput) !== valorGuardado ||
      Number(factorSeleccionado) !== factorGuardado ||
      vehiculoReemplazo !== reemplazoGuardado);

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
        <header className='mb-6'>
          <h1
            id='titulo-cotizador'
            className='text-2xl font-bold text-slate-900'
          >
            Cotizador de Seguro de Auto
          </h1>
          <p className='mt-2 text-sm text-slate-600'>
            Calcula la prima base de tu vehículo según su valor comercial y
            antigüedad en pesos colombianos (COP).
          </p>
        </header>

        <form
          onSubmit={calcularValor}
          noValidate
          className='space-y-5'
        >
          <div>
            <label
              htmlFor='valor-comercial'
              className='block text-sm font-medium text-slate-800 mb-1.5'
            >
              Valor comercial
            </label>
            <input
              id='valor-comercial'
              name='valorComercial'
              type='number'
              min={MIN_VALOR_COMERCIAL}
              max={MAX_VALOR_COMERCIAL}
              step={100000}
              value={valorComercialInput}
              onChange={(e) => {
                setValorComercialInput(e.target.value);
                if (errorValor) setErrorValor('');
              }}
              aria-invalid={Boolean(errorValor)}
              aria-describedby={errorValor ? 'error-valor' : 'ayuda-valor'}
              placeholder='Ej. 85000000'
              className='w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600'
            />
            <p
              id='ayuda-valor'
              className='mt-1 text-xs text-slate-500'
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
              className='block text-sm font-medium text-slate-800 mb-1.5'
            >
              Antigüedad del vehículo
            </label>
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
              className='w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600'
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
              onChange={(e) => setVehiculoReemplazo(e.target.checked)}
              className='h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-2 focus:ring-red-600'
            />
            <label
              htmlFor='vehiculo-reemplazo'
              className='text-sm font-medium text-slate-800 select-none cursor-pointer'
            >
              Necesito vehículo de reemplazo
            </label>
          </div>

          <button
            type='submit'
            className='inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-6 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 cursor-pointer'
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
            {hayCambios ? 'Calcular nuevamente' : 'Calcular'}
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

        {primaBaseGuardada !== null && (
          <div
            aria-live='polite'
            className='mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4'
          >
            <span className='block text-xs uppercase tracking-wide text-slate-500 font-semibold'>
              Prima base calculada (guardada en store)
            </span>
            <strong className='mt-1 block text-2xl font-bold text-slate-900'>
              {formatCOP(primaBaseGuardada)}
            </strong>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleQuote;
