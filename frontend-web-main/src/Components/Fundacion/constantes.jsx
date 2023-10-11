import { Animales } from './Animales/Animales';
import { Donaciones } from './Donaciones/Donaciones';
import { Cuenta } from './Animales/Cuenta';
import { Update } from './Animales/Update';
import { Reporte } from './Animales/Reporte';


export const SECCIONES = [
  {
    id: 0,
    nombre: 'Animales',
    className: 'fas fa-paw',

    component: Animales,
  },
  {
    id: 1,
    nombre: 'Donaciones',
    className: 'fas fa-hand-holding-usd',
    component: Donaciones,
  },
  {
    id: 2,
    nombre: 'Cuentas',
    className: 'fas fa-file',
   /*Atributo  oculto: true, */
    component: Cuenta,
  },
  {
    id: 3,
    nombre: 'Actualizaciones',
    className: 'fas fa-file',
   /*Atributo  oculto: true, */
    component: Update,
  },
  {
    id: 4,
    nombre: 'Reporte',
    className: 'fas fa-file',
   /*Atributo  oculto: true, */
    component: Reporte,
  },
];
