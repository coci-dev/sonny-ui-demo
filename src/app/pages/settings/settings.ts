import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnySwitchComponent,
  SnySelectComponent,
  SnyDividerComponent,
  SnyButtonDirective,
  SnyLabelDirective,
  ThemeService,
  SnyToastService,
  type SelectOption,
} from '@sonny-ui/core';

@Component({
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyCardDirective,
    SnyCardHeaderDirective,
    SnyCardTitleDirective,
    SnyCardDescriptionDirective,
    SnyCardContentDirective,
    SnySwitchComponent,
    SnySelectComponent,
    SnyDividerComponent,
    SnyButtonDirective,
    SnyLabelDirective,
  ],
  template: `
    <div class="space-y-6 max-w-2xl">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Configuración</h1>
        <p class="text-muted-foreground">Personaliza tu experiencia en el dashboard.</p>
      </div>

      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Apariencia</h3>
          <p snyCardDescription>Configura el tema visual de la aplicación.</p>
        </div>
        <div snyCardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label snyLabel>Modo Oscuro</label>
              <p class="text-sm text-muted-foreground">Activa el tema oscuro para reducir fatiga visual.</p>
            </div>
            <sny-switch [checked]="darkMode()" (checkedChange)="onThemeChange()" />
          </div>

          <sny-divider />

          <div class="space-y-2">
            <label snyLabel>Vista por defecto</label>
            <sny-select [options]="viewOptions" [(value)]="defaultView" placeholder="Seleccionar vista" />
          </div>
        </div>
      </div>

      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Notificaciones</h3>
          <p snyCardDescription>Configura cómo quieres recibir las notificaciones.</p>
        </div>
        <div snyCardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label snyLabel>Notificaciones por Email</label>
              <p class="text-sm text-muted-foreground">Recibe actualizaciones de proyectos en tu email.</p>
            </div>
            <sny-switch [(checked)]="emailNotif" />
          </div>

          <sny-divider />

          <div class="flex items-center justify-between">
            <div>
              <label snyLabel>Notificaciones Push</label>
              <p class="text-sm text-muted-foreground">Notificaciones en tiempo real en el navegador.</p>
            </div>
            <sny-switch [(checked)]="pushNotif" />
          </div>

          <sny-divider />

          <div class="flex items-center justify-between">
            <div>
              <label snyLabel>Resumen Semanal</label>
              <p class="text-sm text-muted-foreground">Recibe un resumen cada lunes por email.</p>
            </div>
            <sny-switch [(checked)]="weeklyDigest" />
          </div>
        </div>
      </div>

      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Zona de Peligro</h3>
          <p snyCardDescription>Acciones que no se pueden deshacer.</p>
        </div>
        <div snyCardContent>
          <button snyBtn variant="destructive" (click)="resetData()">
            Restablecer Datos de Prueba
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Settings {
  private readonly themeService = inject(ThemeService);
  private readonly toastService = inject(SnyToastService);

  protected readonly darkMode = computed(() => this.themeService.theme() === 'dark');
  protected readonly emailNotif = signal(true);
  protected readonly pushNotif = signal(false);
  protected readonly weeklyDigest = signal(true);
  protected readonly defaultView = signal('dashboard');

  protected readonly viewOptions: SelectOption[] = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'projects', label: 'Proyectos' },
  ];

  protected onThemeChange(): void {
    const next = this.darkMode() ? 'light' : 'dark';
    this.themeService.setTheme(next);
    this.toastService.success('Tema actualizado', next === 'dark' ? 'Modo oscuro activado.' : 'Modo claro activado.');
  }

  protected resetData(): void {
    this.toastService.warning('Datos restablecidos', 'Los datos de prueba fueron restablecidos. Recarga la página.');
  }
}
