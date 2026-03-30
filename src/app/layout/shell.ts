import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  SnyDrawerLayoutComponent,
  SnyDrawerContentDirective,
  SnyDrawerSideDirective,
  SnyNavbarDirective,
  SnyNavbarBrandDirective,
  SnyNavbarContentDirective,
  SnyNavbarEndDirective,
  SnyToasterComponent,
  SnyButtonDirective,
  SnyKbdDirective,
  SnyCommandPaletteService,
  ThemeService,
} from '@sonny-ui/core';
import { Sidebar } from './sidebar';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    Sidebar,
    SnyDrawerLayoutComponent,
    SnyDrawerContentDirective,
    SnyDrawerSideDirective,
    SnyNavbarDirective,
    SnyNavbarBrandDirective,
    SnyNavbarContentDirective,
    SnyNavbarEndDirective,
    SnyToasterComponent,
    SnyButtonDirective,
    SnyKbdDirective,
  ],
  host: {
    '(document:keydown.control.k)': 'onCtrlK($event)',
  },
  template: `
    <div snyDrawerLayout #drawer="snyDrawerLayout" [overlay]="true">
      <div snyDrawerSide side="left">
        <app-sidebar />
      </div>

      <div snyDrawerContent>
        <nav snyNavbar [sticky]="true" class="border-b h-14">
          <div snyNavbarBrand class="gap-2">
            <button snyBtn variant="ghost" size="sm" (click)="drawerRef()?.toggle()">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>
            <span class="font-semibold tracking-tight">PM Dashboard</span>
          </div>

          <div snyNavbarContent></div>

          <div snyNavbarEnd class="gap-2">
            <button snyBtn variant="outline" size="sm" class="w-64 justify-start text-muted-foreground" (click)="openCommandPalette()">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span class="flex-1 text-left text-sm">Buscar...</span>
              <kbd snyKbd size="sm">Ctrl+K</kbd>
            </button>
            <button snyBtn variant="ghost" size="sm" (click)="toggleTheme()">
              @if (isDark()) {
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              }
            </button>
          </div>
        </nav>

        <main class="px-8 py-6 max-w-7xl mx-auto">
          <router-outlet />
        </main>
      </div>
    </div>

    <sny-toaster position="bottom-right" [maxToasts]="5" />
  `,
})
export class Shell {
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly commandPalette = inject(SnyCommandPaletteService);

  protected readonly drawerRef = viewChild<SnyDrawerLayoutComponent>('drawer');
  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');

  protected toggleTheme(): void {
    this.themeService.setTheme(this.isDark() ? 'light' : 'dark');
  }

  protected openCommandPalette(): void {
    this.commandPalette.open({
      commands: [
        { id: 'nav-dashboard', label: 'Ir al Dashboard', group: 'Navegación', action: () => this.router.navigate(['/dashboard']), keywords: ['home', 'inicio'] },
        { id: 'nav-projects', label: 'Ir a Proyectos', group: 'Navegación', action: () => this.router.navigate(['/projects']), keywords: ['projects'] },
        { id: 'nav-settings', label: 'Ir a Configuración', group: 'Navegación', action: () => this.router.navigate(['/settings']), keywords: ['settings', 'config'] },
        { id: 'toggle-theme', label: 'Cambiar Tema', group: 'Preferencias', action: () => this.toggleTheme(), keywords: ['dark', 'light', 'theme'] },
      ],
      placeholder: 'Escribe un comando...',
    });
  }

  protected onCtrlK(event: Event): void {
    event.preventDefault();
    this.openCommandPalette();
  }
}
