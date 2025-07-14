import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { authGuard } from './guards/auth.guard';
import { Pedidos } from './pages/chef/pedidos/pedidos';
import { Menu } from './pages/main/menu/menu';
import { Main } from './pages/main/main';
import { EmailRequest } from './pages/auth/reset-password/email-request/email-request';
import { VerifyCode } from './pages/auth/reset-password/verify-code/verify-code';
import { PasswordUpdated } from './pages/auth/reset-password/password-updated/password-updated';
import { ResetPassword } from './pages/auth/reset-password/reset-password/reset-password';
import { Plato } from './pages/main/menu/plato/plato';
import { Carrito } from './pages/main/menu/carrito/carrito';
import { Pago } from './pages/main/pago/pago';
import { ConfirmacionPago } from './pages/main/pago/confirmacion-pago/confirmacion-pago';

export const routes: Routes = [
  { path: '', canActivate: [authGuard], component: Main },
  {
    path: 'login',
    // canActivate: [authGuard],
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'cocina/pedidos',
    canActivate: [authGuard],
    component: Pedidos,
  },
  {
    path: 'reset-password/request-email',
    component: EmailRequest,
  },
  {
    path: 'reset-password/verify-code',
    component: VerifyCode,
  },
  {
    path: 'reset-password/update-password',
    component: ResetPassword,
  },
  {
    path: 'reset-password/sucess',
    component: PasswordUpdated,
  },
  {
    path: 'menu/plato/:id',
    component: Plato,
  },
  {
    path: 'menu/carrito',
    component: Carrito,
  },
  {
    path: 'menu/pago',
    component: Pago,
  },
  {
    path: 'menu/pago/sucess',
    component: ConfirmacionPago,
  },
  { path: 'menu', component: Menu },
];
