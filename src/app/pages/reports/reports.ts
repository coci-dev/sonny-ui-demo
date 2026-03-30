import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnyCardFooterDirective,
  SnyButtonDirective,
  SnyButtonGroupDirective,
  SnyBadgeDirective,
  SnyDividerComponent,
  SnyColorPickerComponent,
  SnyDateRangePickerComponent,
  SnyOtpInputComponent,
  SnyCarouselDirective,
  SnyCarouselContentDirective,
  SnyCarouselItemDirective,
  SnyCarouselPrevDirective,
  SnyCarouselNextDirective,
  SnyDiffComponent,
  SnyDockDirective,
  SnyDockItemDirective,
  SnyFieldsetDirective,
  SnyFieldsetLegendDirective,
  SnyFieldsetContentDirective,
  SnyFabDirective,
  SnyFabTriggerDirective,
  SnyFabActionDirective,
  SnyInputDirective,
  SnySelectComponent,
  SnyLabelDirective,
  SnyProgressComponent,
  SnyRadialProgressComponent,
  SnyAlertDirective,
  SnyAlertTitleDirective,
  SnyAlertDescriptionDirective,
  SnyToastService,
  type SelectOption,
} from '@sonny-ui/core';

@Component({
  selector: 'app-reports',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyCardDirective, SnyCardHeaderDirective, SnyCardTitleDirective,
    SnyCardDescriptionDirective, SnyCardContentDirective, SnyCardFooterDirective,
    SnyButtonDirective, SnyButtonGroupDirective, SnyBadgeDirective, SnyDividerComponent,
    SnyColorPickerComponent, SnyDateRangePickerComponent, SnyOtpInputComponent,
    SnyCarouselDirective, SnyCarouselContentDirective, SnyCarouselItemDirective,
    SnyCarouselPrevDirective, SnyCarouselNextDirective,
    SnyDiffComponent,
    SnyDockDirective, SnyDockItemDirective,
    SnyFieldsetDirective, SnyFieldsetLegendDirective, SnyFieldsetContentDirective,
    SnyFabDirective, SnyFabTriggerDirective, SnyFabActionDirective,
    SnyInputDirective, SnySelectComponent, SnyLabelDirective,
    SnyProgressComponent, SnyRadialProgressComponent,
    SnyAlertDirective, SnyAlertTitleDirective, SnyAlertDescriptionDirective,
  ],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Reportes</h1>
          <p class="text-muted-foreground">Analíticas y personalización de reportes del proyecto.</p>
        </div>
        <!-- ButtonGroup -->
        <div snyButtonGroup>
          <button snyBtn [variant]="period() === 'week' ? 'default' : 'outline'" size="sm" (click)="period.set('week')">Semana</button>
          <button snyBtn [variant]="period() === 'month' ? 'default' : 'outline'" size="sm" (click)="period.set('month')">Mes</button>
          <button snyBtn [variant]="period() === 'year' ? 'default' : 'outline'" size="sm" (click)="period.set('year')">Año</button>
        </div>
      </div>

      <!-- DateRangePicker -->
      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Rango de Fechas</h3>
          <p snyCardDescription>Selecciona el período para generar el reporte.</p>
        </div>
        <div snyCardContent>
          <sny-date-range-picker
            [(value)]="dateRange"
            placeholder="Seleccionar rango..."
            locale="es"
            [dualCalendar]="true"
            [clearable]="true"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Carousel de métricas -->
        <div class="lg:col-span-2">
          <div snyCard>
            <div snyCardHeader>
              <h3 snyCardTitle>Métricas Clave</h3>
              <p snyCardDescription>Desliza para ver las métricas del período.</p>
            </div>
            <div snyCardContent>
              <div snyCarousel [loop]="true">
                <div snyCarouselContent>
                  <div snyCarouselItem class="basis-full md:basis-1/2 pl-4">
                    <div class="border rounded-lg p-6 space-y-2">
                      <p class="text-sm text-muted-foreground">Velocidad del Equipo</p>
                      <p class="text-3xl font-bold">42</p>
                      <p class="text-xs text-muted-foreground">story points por sprint</p>
                      <sny-progress [value]="84" size="sm" />
                    </div>
                  </div>
                  <div snyCarouselItem class="basis-full md:basis-1/2 pl-4">
                    <div class="border rounded-lg p-6 space-y-2">
                      <p class="text-sm text-muted-foreground">Tasa de Completado</p>
                      <p class="text-3xl font-bold">87%</p>
                      <p class="text-xs text-muted-foreground">tareas cerradas vs abiertas</p>
                      <sny-progress [value]="87" size="sm" />
                    </div>
                  </div>
                  <div snyCarouselItem class="basis-full md:basis-1/2 pl-4">
                    <div class="border rounded-lg p-6 space-y-2">
                      <p class="text-sm text-muted-foreground">Tiempo Medio de Resolución</p>
                      <p class="text-3xl font-bold">2.4d</p>
                      <p class="text-xs text-muted-foreground">días promedio por tarea</p>
                      <sny-progress [value]="60" size="sm" />
                    </div>
                  </div>
                  <div snyCarouselItem class="basis-full md:basis-1/2 pl-4">
                    <div class="border rounded-lg p-6 space-y-2">
                      <p class="text-sm text-muted-foreground">Bugs en Producción</p>
                      <p class="text-3xl font-bold">3</p>
                      <p class="text-xs text-muted-foreground">esta semana (↓ 40%)</p>
                      <sny-progress [value]="15" size="sm" />
                    </div>
                  </div>
                </div>
                <button snyCarouselPrev></button>
                <button snyCarouselNext></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Radial Progress resumen -->
        <div snyCard>
          <div snyCardHeader>
            <h3 snyCardTitle>Salud del Proyecto</h3>
          </div>
          <div snyCardContent class="flex flex-col items-center gap-4">
            <sny-radial-progress [value]="85" size="lg" variant="success" />
            <div class="text-center">
              <p class="text-2xl font-bold">85%</p>
              <p class="text-sm text-muted-foreground">Índice de salud general</p>
            </div>
            <div class="w-full space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Calidad</span>
                <span class="font-medium">92%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Velocidad</span>
                <span class="font-medium">78%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Cobertura</span>
                <span class="font-medium">84%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Color Picker — full width, inline pickers side by side -->
      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Colores del Reporte</h3>
          <p snyCardDescription>Personaliza los colores de los gráficos para el PDF exportado.</p>
        </div>
        <div snyCardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <label snyLabel>Color primario</label>
              <sny-color-picker
                [(value)]="primaryColor"
                [presets]="colorPresets"
                [showEyeDropper]="true"
                [inline]="true"
              />
            </div>
            <div class="space-y-3">
              <label snyLabel>Color secundario</label>
              <sny-color-picker
                [(value)]="secondaryColor"
                [presets]="colorPresets"
                [showEyeDropper]="true"
                [inline]="true"
              />
            </div>
          </div>
          <sny-divider class="my-4" />
          <div class="flex items-center gap-3">
            <span class="text-sm text-muted-foreground">Vista previa:</span>
            <div class="flex gap-2">
              <div class="h-8 w-20 rounded-md border" [style.background]="primaryColor()"></div>
              <div class="h-8 w-20 rounded-md border" [style.background]="secondaryColor()"></div>
              <div class="h-8 w-20 rounded-md border" style="background: linear-gradient(135deg, var(--c1), var(--c2))" [style.--c1]="primaryColor()" [style.--c2]="secondaryColor()"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Diff viewer — uses snyDiffBefore / snyDiffAfter selectors -->
      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Comparar Sprints</h3>
          <p snyCardDescription>Arrastra el divisor para comparar el rendimiento entre sprints.</p>
        </div>
        <div snyCardContent>
          <sny-diff [(value)]="diffPosition">
            <div snyDiffBefore class="absolute inset-0 bg-muted p-6">
              <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Sprint 11 — Anterior</p>
              <div class="space-y-3">
                <div class="flex justify-between items-center"><span class="text-sm">Tareas completadas</span><span class="text-xl font-bold">18</span></div>
                <sny-progress [value]="72" size="sm" />
                <div class="flex justify-between items-center"><span class="text-sm">Velocidad</span><span class="text-xl font-bold">36 pts</span></div>
                <sny-progress [value]="72" size="sm" />
                <div class="flex justify-between items-center"><span class="text-sm">Bugs</span><span class="text-xl font-bold text-destructive">5</span></div>
                <div class="flex justify-between items-center"><span class="text-sm">Cobertura</span><span class="text-xl font-bold">72%</span></div>
                <sny-progress [value]="72" size="sm" />
              </div>
            </div>
            <div snyDiffAfter class="absolute inset-0 bg-card p-6">
              <p class="text-xs font-medium uppercase tracking-wider text-primary mb-4">Sprint 12 — Actual</p>
              <div class="space-y-3">
                <div class="flex justify-between items-center"><span class="text-sm">Tareas completadas</span><span class="text-xl font-bold">25 <span snyBadge variant="success" size="sm">+39%</span></span></div>
                <sny-progress [value]="100" size="sm" />
                <div class="flex justify-between items-center"><span class="text-sm">Velocidad</span><span class="text-xl font-bold">42 pts <span snyBadge variant="success" size="sm">+17%</span></span></div>
                <sny-progress [value]="84" size="sm" />
                <div class="flex justify-between items-center"><span class="text-sm">Bugs</span><span class="text-xl font-bold">3 <span snyBadge variant="success" size="sm">-40%</span></span></div>
                <div class="flex justify-between items-center"><span class="text-sm">Cobertura</span><span class="text-xl font-bold">84% <span snyBadge variant="success" size="sm">+12%</span></span></div>
                <sny-progress [value]="84" size="sm" />
              </div>
            </div>
          </sny-diff>
        </div>
      </div>

      <!-- Exportar con verificación OTP -->
      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Exportar Reporte</h3>
          <p snyCardDescription>Verifica tu identidad para exportar datos sensibles.</p>
        </div>
        <div snyCardContent class="space-y-4">
          <fieldset snyFieldset>
            <legend snyFieldsetLegend>Configuración de Exportación</legend>
            <div snyFieldsetContent class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label snyLabel>Formato</label>
                  <sny-select [options]="formatOptions" [(value)]="exportFormat" />
                </div>
                <div class="space-y-2">
                  <label snyLabel>Nombre del archivo</label>
                  <input snyInput [(value)]="fileName" placeholder="reporte-sprint-12" />
                </div>
              </div>
            </div>
          </fieldset>

          <sny-divider />

          <div>
            <p class="text-sm font-medium mb-2">Código de verificación</p>
            <p class="text-sm text-muted-foreground mb-4">Ingresa el código enviado a tu email para autorizar la exportación.</p>
            <sny-otp-input
              [(value)]="otpCode"
              [length]="6"
              [separator]="3"
              [status]="otpStatus()"
              size="md"
            />
          </div>

          @if (otpStatus() === 'success') {
            <div snyAlert variant="success">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              <h4 snyAlertTitle>Verificación exitosa</h4>
              <p snyAlertDescription>Puedes proceder con la exportación del reporte.</p>
            </div>
          }
        </div>
        <div snyCardFooter>
          <button snyBtn [disabled]="otpStatus() !== 'success'" (click)="exportReport()">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/></svg>
            Exportar Reporte
          </button>
        </div>
      </div>

      <!-- Dock flotante -->
      <div snyDock position="bottom">
        <button snyDockItem [active]="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
        </button>
        <button snyDockItem>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
        </button>
        <button snyDockItem>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        </button>
        <button snyDockItem>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        </button>
      </div>

      <!-- FAB -->
      <div snyFab position="bottom-right" direction="up">
        <button snyFabTrigger snyBtn class="rounded-full size-12 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
        <button snyFabAction ariaLabel="Nuevo reporte" snyBtn variant="outline" class="rounded-full size-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
        </button>
        <button snyFabAction ariaLabel="Compartir" snyBtn variant="outline" class="rounded-full size-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
        </button>
      </div>
    </div>
  `,
})
export class Reports {
  private readonly toastService = SnyToastService;

  protected readonly period = signal<'week' | 'month' | 'year'>('month');
  protected readonly dateRange = signal<{ start: Date; end: Date } | null>(null);
  protected readonly primaryColor = signal('#2563eb');
  protected readonly secondaryColor = signal('#7c3aed');
  protected readonly diffPosition = signal(50);
  protected readonly exportFormat = signal('pdf');
  protected readonly fileName = signal('reporte-sprint-12');
  protected readonly otpCode = signal('');
  protected readonly otpStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  protected readonly colorPresets = [
    { label: 'Marca', colors: ['#2563eb', '#7c3aed', '#db2777'] },
    { label: 'Neutros', colors: ['#71717a', '#18181b', '#a1a1aa'] },
    { label: 'Semáforo', colors: ['#16a34a', '#ea580c', '#dc2626'] },
  ];

  protected readonly formatOptions: SelectOption[] = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'xlsx', label: 'Excel' },
    { value: 'json', label: 'JSON' },
  ];

  constructor() {
    // Simulate OTP verification
    let timeout: ReturnType<typeof setTimeout>;
    const checkOtp = () => {
      if (this.otpCode().length === 6) {
        this.otpStatus.set('loading');
        timeout = setTimeout(() => this.otpStatus.set('success'), 1000);
      } else {
        this.otpStatus.set('idle');
      }
    };
    // We'd use effect() in real code, but keeping it simple for demo
  }

  protected exportReport(): void {
    // toastService.success would go here
  }
}
