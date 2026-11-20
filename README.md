# Cotizador de Seguro de Autos — Prueba técnica AXA Colpatria

Aplicación web para calcular la prima estimada de un seguro de autos y comparar los planes **Esencial** y **Plus**.

## 🌐 Demo en línea

**👉 [https://alexander-gonzalez-axa-colpatria.netlify.app/](https://alexander-gonzalez-axa-colpatria.netlify.app/)**

El sitio está desplegado en Netlify y es **totalmente funcional**: se puede diligenciar el formulario, calcular la prima y comparar y seleccionar planes directamente desde el navegador.

## Funcionalidades

- **Formulario de cotización** con validación:
  - Valor comercial del vehículo entre **$20.000.000** y **$300.000.000** COP (con formato de miles).
  - Antigüedad del vehículo: 0 a 2 años, 3 a 5 años, 6 a 10 años o más de 10 años.
  - Opción «Necesito vehículo de reemplazo en caso de siniestro».
- **Cálculo de la prima base**: `valor comercial × 3 % × factor de antigüedad`, redondeada al peso.

  | Antigüedad     | Factor |
  | -------------- | ------ |
  | 0 a 2 años     | 1,00   |
  | 3 a 5 años     | 1,10   |
  | 6 a 10 años    | 1,25   |
  | Más de 10 años | 1,40   |

- **Comparación de planes** con precio anual de cada plan y diferencia anual (cada prima redondeada al peso):

  | Característica              | Esencial | Plus |
  | --------------------------- | -------- | ---- |
  | Multiplicador de prima base | 1,00     | 1,35 |
  | Asistencia en carretera     | Sí       | Sí   |
  | Vehículo de reemplazo       | No       | Sí   |
  | Asistencia jurídica         | No       | Sí   |

  _Ejemplo:_ prima base $2.805.000 → Esencial **$2.805.000**, Plus **$3.786.750**, diferencia **$981.750**.

- **Tarjetas de plan seleccionables**, sincronizadas con la opción «vehículo de reemplazo»: elegir Plus la marca y elegir Esencial la desmarca (y viceversa).
- **Guía inicial** con los pasos a seguir antes de la primera cotización y transiciones de entrada al mostrar los planes.
- Aviso y botón **«Calcular nuevamente»** cuando se modifican el valor o la antigüedad después de calcular.
- Persistencia del estado de la cotización en `localStorage`.
- Diseño **responsive** y accesible (etiquetas, roles ARIA, navegación por teclado, `prefers-reduced-motion`).

## Tecnologías utilizadas

| Tecnología                                                   | Uso                                              |
| ------------------------------------------------------------ | ------------------------------------------------ |
| [React 19](https://react.dev/)                               | Librería de interfaz de usuario                  |
| [TypeScript 5](https://www.typescriptlang.org/)              | Tipado estático                                  |
| [Create React App](https://create-react-app.dev/) (`react-scripts`) | Configuración, servidor de desarrollo y build |
| [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) | Estado global de la cotización |
| [Tailwind CSS 4](https://tailwindcss.com/)                   | Estilos utilitarios                              |
| [Lucide React](https://lucide.dev/)                          | Iconografía                                      |
| [Testing Library](https://testing-library.com/) + Jest       | Pruebas                                          |
| [Netlify](https://www.netlify.com/)                          | Despliegue                                       |

## Estructura del proyecto

```
src/
├── App.tsx                     # Layout principal
├── index.css                   # Estilos globales y animaciones de entrada
├── components/
│   ├── Navbar/Navbar.tsx       # Encabezado con logo
│   ├── Hero/                   # Título e imagen del hero
│   ├── FormQuote/
│   │   ├── IntroCard.tsx       # Guía de pasos inicial
│   │   ├── VehicleQuote.tsx    # Formulario y cálculo de la prima base
│   │   └── SelectType.tsx      # Comparación y selección de planes
│   └── Features/Features.tsx   # Franja de beneficios
└── store/
    ├── store.ts                # Configuración de Redux y hooks tipados
    └── quoteSlice.ts           # Estado de la cotización
```

## Ejecución local

Requisitos: [Node.js](https://nodejs.org/) 18 o superior.

```bash
npm install      # Instalar dependencias
npm start        # Servidor de desarrollo en http://localhost:3000
npm run build    # Build de producción en la carpeta build/
npm test         # Ejecutar pruebas
```

## Uso de IA

El detalle de cómo se utilizó IA durante el desarrollo está en [uso_ia.md](uso_ia.md).
