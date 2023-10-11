import { Animals } from './Animals/Animals';
import { Historial } from './Animals/Historial';
import { Manadas } from './Manadas/Manadas';
import { User } from './User/User';
import { Fundaciones } from './Fundaciones/Fundaciones';
import { AnimalsDetalle } from './Animals/AnimalsDetalle';
import { FundacionDetalle } from './Fundaciones/FundacionDetalle';
import { Update } from './Animals/Update';
import { Notificacion } from './Shared/Notificacion/Notificacion';
import { NotificacionDetalle } from './Shared/Notificacion/NotificacionDetalle';
// import { NotificacionModal } from './Shared/Notificacion/NotificacionModal';

export const SECCIONES = [
  {
    id: 0,
    nombre: 'Animales',
    className: 'fas fa-paw',
    isVisibleSearch: true,
    isVisibleSpecies: true,
    component: Animals,
  },
  {
    id: 1,
    nombre: 'Manadas',
    className: 'fas fa-hand-holding-heart',
    isVisibleSearch: true,
    component: Manadas,
  },
  {
    id: 2,
    nombre: 'Fundaciones',
    //ClassName:'fas fa-paw',
    isVisibleSearch: true,
    component: Fundaciones,
  },
  {
    id: 3,
    nombre: 'Historial',
    oculto: true,
    component: Historial,
  },
  {
    id: 4,
    nombre: 'Perfil',
    className: 'fas fa-user',
    component: User,
  },
  {
    id: 5,
    nombre: 'Animal Detalle',
    className: 'fas fa-user',
    oculto: true,
    component: AnimalsDetalle,
  },
  {
    id: 6,
    nombre: 'Fundacion Detalle',
    className: 'fas fa-user',
    oculto: true,
    component: FundacionDetalle,
  },
  {
    id: 7,
    nombre: 'Update',
    className: 'fas fa-user',
    oculto: true,
    component: Update,
  },
  {
    id: 8,
    nombre: 'Notificacion',
    oculto: true,
    component: Notificacion,
  },
  {
    id: 9,
    nombre: 'Notificacion Detalle',
    oculto: true,
    component: NotificacionDetalle,
  },
  // {
  //   id: 10,
  //   nombre: 'NotificacionModal',
  //   oculto: true,
  //   component: NotificacionModal,
  // },
];
