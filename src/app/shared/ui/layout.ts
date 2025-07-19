import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';

@Component({
  standalone: true,
  imports: [RouterModule, RouterLink],
  selector: 'app-layout',
  template: `
    <header class="h-[80px] mb-9 w-full max-w-screen-lg mx-auto px-4">
      <nav
        class="flex items-center justify-around h-full bg-blue-800 rounded-md"
      >
        <a
          class="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800   "
          routerLink="/products"
          >Listar Productos</a
        >
        <a
          routerLink="/products/new"
          class="cursor-pointer inline-block focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Nueva tarea
        </a>
        <a
          class="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800   "
          routerLink="/products/superList"
          >Super List</a
        >
        <a
          type="button"
          class="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          (click)="logOut()"
        >
          Salir
        </a>
      </nav>
    </header>
    <router-outlet />
  `,
})
export default class LayoutCompoent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  async logOut() {
    await this._authState.logOut();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
