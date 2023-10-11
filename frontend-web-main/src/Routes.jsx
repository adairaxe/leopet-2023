import { Fundacion } from './Components/Fundacion/Index.jsx';
import { Donador } from './Components/Donador/Index.jsx';
import { Admin } from './Components/Admin/Index.jsx';

const routes = [
  {
    name: 'Fundacion',
    path: '/fundacion',
    role: 2,
    component: Fundacion,
  },
  {
    name: 'Donador',
    path: '/donador',
    role: 3,
    component: Donador,
  },
  {
    name: 'Admin',
    path: '/admin',
    role: 1,
    component: Admin,
  },
];

export default routes;
