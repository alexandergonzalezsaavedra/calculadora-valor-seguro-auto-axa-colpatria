# Uso de IA en la prueba técnica

## Herramienta utilizada

- **Claude Code** (extensión de VS Code), modelo Claude Opus.

## Prompts reales

1. > Necesito que en `src/components/FormQuote/SelectType.tsx` crees el valor del `primaBaseGuardada` ubicada en el store, agrega iconos de lucide y la regla es la siguiente: multiplicador Esencial 1,00 / Plus 1,35; coberturas por plan; muestra precio anual de cada plan y diferencia anual redondeando al peso; si se marcó «Necesito vehículo de reemplazo» recomienda Plus, si no, Esencial por menor precio. (Se adjuntó captura del diseño esperado.)

2. > _(Completar con otro prompt real usado, p. ej. el del formulario `VehicleQuote` o el del store de Redux.)_

3. > _(Opcional: completar con un tercer prompt real.)_

## Qué generó la IA

- Componente `SelectType.tsx` que lee `primaBase` y `vehiculoReemplazo` desde el store de Redux (`useAppSelector`).
- Configuración de planes (`PLANES`) con multiplicador, descripción, icono de `lucide-react` (`ShieldCheck`, `ShieldPlus`, `Check`, `X`, `Info`) y coberturas.
- Función `calcularPrimaPlan` que aplica el multiplicador y redondea con `Math.round` cada prima al peso.
- Cálculo de la diferencia anual (Plus − Esencial) y la lógica de recomendación con insignia «Recomendado» y mensaje del motivo.
- Maquetación con Tailwind siguiendo la captura del diseño.

## Qué revisé o corregí

- _(Completar: p. ej. ajustes de estilos, textos, nombres de variables, ubicación del componente en `App.tsx`.)_
- Verifiqué que la diferencia se calcula sobre las primas **ya redondeadas**, no sobre valores sin redondear.
- Verifiqué que el componente no se muestra hasta que existe una prima base en el store.

## Cómo comprobé el resultado

- Caso del enunciado: prima base **$2.805.000** → Esencial **$2.805.000**, Plus **$3.786.750**, diferencia **$981.750** (2.805.000 × 1,35 = 3.786.750).
  - Valor comercial $85.000.000, antigüedad «3 a 5 años» (factor 1,1): 85.000.000 × 0,03 × 1,1 = 2.805.000.
- Con la casilla «Necesito vehículo de reemplazo» marcada se recomienda Plus; sin marcarla, Esencial.
- `npx tsc --noEmit` sin errores de tipos.
