import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Redireciona o caminho raiz para a tela de login
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    // CORREÇÃO: Usando o caminho EXATO que você confirmou
    loadComponent: () =>
      import('./pagina/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pagina/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'opcoes',
    loadComponent: () =>
      import('./pagina/opcoes/opcoes.page').then((m) => m.OpcoesPage),
  },
  {
    path: 'gastos',
    loadComponent: () =>
      import('./pagina/gastos/gastos.page').then((m) => m.GastosPage),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];