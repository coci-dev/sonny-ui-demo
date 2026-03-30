import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnyAvatarComponent,
  SnyBadgeDirective,
  SnyButtonDirective,
  SnyStatusDirective,
  SnyIndicatorDirective,
  SnyIndicatorBadgeDirective,
  SnyRatingComponent,
  SnyRadioDirective,
  SnyCheckboxDirective,
  SnyAlertDirective,
  SnyAlertTitleDirective,
  SnyAlertDescriptionDirective,
  SnyAccordionDirective,
  SnyAccordionItemDirective,
  SnyAccordionTriggerDirective,
  SnyAccordionContentDirective,
  SnyListDirective,
  SnyListItemDirective,
  SnyListItemIconDirective,
  SnyListItemContentDirective,
  SnyListItemActionDirective,
  SnyDropdownDirective,
  SnyDropdownTriggerDirective,
  SnyDropdownContentDirective,
  SnyMenuItemDirective,
  SnyMenuSeparatorDirective,
  SnyMenuLabelDirective,
  SnyPopoverDirective,
  SnyPopoverTriggerDirective,
  SnyPopoverContentDirective,
  SnyDividerComponent,
} from '@sonny-ui/core';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyCardDirective, SnyCardHeaderDirective, SnyCardTitleDirective,
    SnyCardDescriptionDirective, SnyCardContentDirective,
    SnyAvatarComponent, SnyBadgeDirective, SnyButtonDirective,
    SnyStatusDirective, SnyIndicatorDirective, SnyIndicatorBadgeDirective,
    SnyRatingComponent, SnyRadioDirective, SnyCheckboxDirective,
    SnyAlertDirective, SnyAlertTitleDirective, SnyAlertDescriptionDirective,
    SnyAccordionDirective, SnyAccordionItemDirective,
    SnyAccordionTriggerDirective, SnyAccordionContentDirective,
    SnyListDirective, SnyListItemDirective, SnyListItemIconDirective,
    SnyListItemContentDirective, SnyListItemActionDirective,
    SnyDropdownDirective, SnyDropdownTriggerDirective,
    SnyDropdownContentDirective, SnyMenuItemDirective,
    SnyMenuSeparatorDirective, SnyMenuLabelDirective,
    SnyPopoverDirective, SnyPopoverTriggerDirective,
    SnyPopoverContentDirective, SnyDividerComponent,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Equipo</h1>
        <p class="text-muted-foreground">Gestiona los miembros del equipo y sus roles.</p>
      </div>

      <!-- Alert -->
      <div snyAlert variant="default">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <h4 snyAlertTitle>Revisión de permisos pendiente</h4>
        <p snyAlertDescription>Hay 2 miembros con acceso temporal que expira esta semana.</p>
      </div>

      <!-- Team Grid with Avatar, Status, Indicator, Dropdown, Popover, Rating -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (user of userService.users(); track user.id) {
          <div snyCard>
            <div snyCardContent class="pt-6">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div snyIndicator position="bottom-right">
                    <sny-avatar [src]="user.avatarUrl" [alt]="user.name" size="lg" />
                    <span snyIndicatorBadge variant="success"></span>
                  </div>
                  <div>
                    <p class="font-semibold">{{ user.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ user.role }}</p>
                    <div class="flex items-center gap-1.5 mt-1">
                      <span snyStatus variant="success" size="sm"></span>
                      <span class="text-xs text-muted-foreground">En línea</span>
                    </div>
                  </div>
                </div>

                <!-- Dropdown Menu -->
                <div snyDropdown>
                  <button snyBtn variant="ghost" size="sm" snyDropdownTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                  <div snyDropdownContent>
                    <span snyMenuLabel>Acciones</span>
                    <button snyMenuItem>Ver perfil</button>
                    <button snyMenuItem>Enviar mensaje</button>
                    <span snyMenuSeparator></span>
                    <button snyMenuItem class="text-destructive">Eliminar</button>
                  </div>
                </div>
              </div>

              <sny-divider class="my-4" />

              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Rendimiento</span>
                <!-- Popover -->
                <div snyPopover>
                  <div snyPopoverTrigger>
                    <sny-rating [value]="3 + ($index % 3)" [max]="5" size="sm" [readonly]="true" />
                  </div>
                  <div snyPopoverContent class="text-sm">
                    Puntuación: {{ 3 + ($index % 3) }}/5 basado en los últimos 30 días.
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- List Component -->
        <div snyCard>
          <div snyCardHeader>
            <h3 snyCardTitle>Actividad del Equipo</h3>
            <p snyCardDescription>Últimas acciones realizadas por los miembros.</p>
          </div>
          <div snyCardContent>
            <ul snyList>
              <li snyListItem>
                <div snyListItemIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                </div>
                <div snyListItemContent>
                  <p class="text-sm font-medium">Walter White completó revisión de código — 99.1% puro</p>
                  <p class="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
                <div snyListItemAction>
                  <span snyBadge variant="success" size="sm">Completado</span>
                </div>
              </li>
              <li snyListItem>
                <div snyListItemIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div snyListItemContent>
                  <p class="text-sm font-medium">Jesse Pinkman comentó en PR #142: "Yeah science!"</p>
                  <p class="text-xs text-muted-foreground">Hace 4 horas</p>
                </div>
                <div snyListItemAction>
                  <span snyBadge variant="outline" size="sm">Comentario</span>
                </div>
              </li>
              <li snyListItem>
                <div snyListItemIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                </div>
                <div snyListItemContent>
                  <p class="text-sm font-medium">Michael Scott añadió a Dwight al proyecto — "that's what she said"</p>
                  <p class="text-xs text-muted-foreground">Ayer</p>
                </div>
                <div snyListItemAction>
                  <span snyBadge variant="secondary" size="sm">Nuevo</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Accordion FAQ -->
        <div snyCard>
          <div snyCardHeader>
            <h3 snyCardTitle>Preguntas Frecuentes</h3>
            <p snyCardDescription>Información sobre roles y permisos del equipo.</p>
          </div>
          <div snyCardContent>
            <div snyAccordion>
              <div snyAccordionItem value="roles">
                <button snyAccordionTrigger>¿Cómo asigno un nuevo rol?</button>
                <div snyAccordionContent>
                  Ve al perfil del miembro, haz click en "Editar rol" y selecciona el nuevo rol del dropdown. Los cambios se aplican inmediatamente.
                </div>
              </div>
              <div snyAccordionItem value="permisos">
                <button snyAccordionTrigger>¿Qué permisos tiene cada rol?</button>
                <div snyAccordionContent>
                  <strong>Admin:</strong> Acceso total. <strong>Tech Lead:</strong> Gestión de proyectos y equipo. <strong>Developer:</strong> Acceso a código y tareas. <strong>Designer:</strong> Acceso a diseño y assets.
                </div>
              </div>
              <div snyAccordionItem value="eliminar">
                <button snyAccordionTrigger>¿Cómo elimino a un miembro?</button>
                <div snyAccordionContent>
                  Desde el menú de tres puntos en la tarjeta del miembro, selecciona "Eliminar". Se te pedirá confirmación antes de proceder.
                </div>
              </div>
              <div snyAccordionItem value="temporal">
                <button snyAccordionTrigger>¿Se pueden tener accesos temporales?</button>
                <div snyAccordionContent>
                  Sí, al invitar un miembro puedes establecer una fecha de expiración. Recibirás una alerta cuando el acceso esté por vencer.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters with Radio + Checkbox -->
      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Filtros de Equipo</h3>
          <p snyCardDescription>Filtra miembros por rol y estado.</p>
        </div>
        <div snyCardContent>
          <div class="flex flex-wrap gap-8">
            <div class="space-y-3">
              <p class="text-sm font-medium">Ordenar por</p>
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm">
                  <input type="radio" snyRadio name="sort" value="name" checked /> Nombre
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input type="radio" snyRadio name="sort" value="role" /> Rol
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input type="radio" snyRadio name="sort" value="rating" /> Rendimiento
                </label>
              </div>
            </div>
            <div class="space-y-3">
              <p class="text-sm font-medium">Mostrar</p>
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm">
                  <input type="checkbox" snyCheckbox checked /> Activos
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input type="checkbox" snyCheckbox checked /> Inactivos
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input type="checkbox" snyCheckbox /> Acceso temporal
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Team {
  protected readonly userService = inject(UserService);
}
