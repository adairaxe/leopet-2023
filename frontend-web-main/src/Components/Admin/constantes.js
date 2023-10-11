import { Fundaciones } from './Fundaciones/Fundaciones';
import { Reportes } from './Reportes/Reportes';
import { ReporteComision } from './Reportes/ReporteComision';

import { Notificaciones } from './Notificaciones/Notificaciones';

export const SECCIONES = [
  {
    id: 0,
    nombre: 'Fundaciones',
    className: 'fas fa-home-heart',
    isVisibleSearch: true,
    isVisibleSpecies: true,
    component: Fundaciones,
  },
  {
    id: 1,
    nombre: 'Reportes',
    className: 'fas fa-file-alt',
    isVisibleSearch: true,
    component: Reportes,
  },
  {
    id: 2,
    nombre: 'Notificaciones',
    className: 'fas fa-bell',
    isVisibleSearch: true,
    oculto: true,
    component: Notificaciones,
  }, 
  {
    id: 3,
    nombre: 'ReporteComision',
    className: 'fas fa-file-alt',
    oculto: true,
    component: ReporteComision,
  },
];

export const BANCOS = [
  'Banco Guayaquil',
  'Banco del Pacífico',
  'Banco Pichincha',
  'Banco Bolivariano',
  'Banco Internacional',
  'Diners Club',
  'Banco ProCredit',
  'Banco General Rumiñahui',
  'Produbanco',
  'Banco del Austro',
  'Banco Coopnacional',
  'Banco Delbank',
  'BanEcuador',
  'Banco de Loja',
];
