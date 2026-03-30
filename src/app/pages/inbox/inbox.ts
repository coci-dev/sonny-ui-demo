import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnyCardFooterDirective,
  SnyButtonDirective,
  SnyDividerComponent,
  SnyRadialProgressComponent,
  SnySliderComponent,
  SnyLoaderComponent,
  SnySkeletonDirective,
  SnyToggleDirective,
  SnyTagInputComponent,
  SnyNumberInputComponent,
  SnyFileInputComponent,
  SnyChatBubbleDirective,
  SnyChatBubbleAvatarDirective,
  SnyChatBubbleHeaderDirective,
  SnyChatBubbleContentDirective,
  SnyChatBubbleFooterDirective,
  SnyChatBubbleBodyDirective,
  SnyInputDirective,
  SnyAvatarComponent,
} from '@sonny-ui/core';

@Component({
  selector: 'app-inbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyCardDirective, SnyCardHeaderDirective, SnyCardTitleDirective,
    SnyCardDescriptionDirective, SnyCardContentDirective, SnyCardFooterDirective,
    SnyButtonDirective, SnyDividerComponent,
    SnyRadialProgressComponent, SnySliderComponent,
    SnyLoaderComponent, SnySkeletonDirective, SnyToggleDirective,
    SnyTagInputComponent, SnyNumberInputComponent, SnyFileInputComponent,
    SnyChatBubbleDirective, SnyChatBubbleAvatarDirective,
    SnyChatBubbleHeaderDirective, SnyChatBubbleContentDirective,
    SnyChatBubbleFooterDirective, SnyChatBubbleBodyDirective,
    SnyInputDirective, SnyAvatarComponent,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Inbox</h1>
        <p class="text-muted-foreground">Mensajes del equipo y herramientas de comunicación.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chat Section -->
        <div class="lg:col-span-2 space-y-6">
          <div snyCard>
            <div snyCardHeader>
              <h3 snyCardTitle>Conversación — Proyecto Heisenberg</h3>
              <p snyCardDescription>Canal del proyecto #p1</p>
            </div>
            <div snyCardContent class="space-y-4">
              <!-- Chat Bubbles -->
              <div snyChatBubble align="start">
                <div snyChatBubbleAvatar>
                  <sny-avatar src="https://i.pravatar.cc/150?u=walter" alt="Walter" size="sm" />
                </div>
                <div snyChatBubbleBody>
                  <div snyChatBubbleHeader>
                    <span class="font-medium text-sm">Walter White</span>
                    <span class="text-xs text-muted-foreground ml-2">10:30 AM</span>
                  </div>
                  <div snyChatBubbleContent>
                    I am not in danger, Skyler. I am the danger. El código tiene que ser 99.1% puro o no hacemos deploy.
                  </div>
                </div>
              </div>

              <div snyChatBubble align="start">
                <div snyChatBubbleAvatar>
                  <sny-avatar src="https://i.pravatar.cc/150?u=jesse" alt="Jesse" size="sm" />
                </div>
                <div snyChatBubbleBody>
                  <div snyChatBubbleHeader>
                    <span class="font-medium text-sm">Jesse Pinkman</span>
                    <span class="text-xs text-muted-foreground ml-2">10:45 AM</span>
                  </div>
                  <div snyChatBubbleContent>
                    Yeah Mr. White! Yeah science! Ya tengo el componente listo. Este código es tight tight tight!
                  </div>
                </div>
              </div>

              <div snyChatBubble align="end">
                <div snyChatBubbleBody>
                  <div snyChatBubbleHeader>
                    <span class="font-medium text-sm">Tú</span>
                    <span class="text-xs text-muted-foreground ml-2">11:00 AM</span>
                  </div>
                  <div snyChatBubbleContent variant="primary">
                    Tread lightly con el refactor. Agendemos review a las 3pm. I am the one who reviews.
                  </div>
                </div>
              </div>

              <div snyChatBubble align="start">
                <div snyChatBubbleAvatar>
                  <sny-avatar src="https://i.pravatar.cc/150?u=gus" alt="Gus" size="sm" />
                </div>
                <div snyChatBubbleBody>
                  <div snyChatBubbleHeader>
                    <span class="font-medium text-sm">Gustavo Fring</span>
                    <span class="text-xs text-muted-foreground ml-2">11:15 AM</span>
                  </div>
                  <div snyChatBubbleContent>
                    Les comparto los mockups. Un hombre que no cuida sus diseños... no es un hombre en absoluto.
                  </div>
                  <div snyChatBubbleFooter>
                    <span class="text-xs text-muted-foreground">📎 heisenberg-ui-v3.fig</span>
                  </div>
                </div>
              </div>
            </div>
            <div snyCardFooter class="flex gap-2">
              <input snyInput placeholder="Escribe un mensaje..." class="flex-1" />
              <button snyBtn>Enviar</button>
            </div>
          </div>

          <!-- File Upload + Tags -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div snyCard>
              <div snyCardHeader>
                <h3 snyCardTitle>Adjuntar Archivos</h3>
                <p snyCardDescription>Sube archivos al canal del proyecto.</p>
              </div>
              <div snyCardContent>
                <sny-file-input accept=".pdf,.png,.jpg,.fig" [multiple]="true" placeholder="Arrastra archivos aquí o haz click" />
              </div>
            </div>

            <div snyCard>
              <div snyCardHeader>
                <h3 snyCardTitle>Etiquetas del Hilo</h3>
                <p snyCardDescription>Organiza conversaciones con tags.</p>
              </div>
              <div snyCardContent>
                <sny-tag-input [(value)]="tags" placeholder="Agregar etiqueta..." />
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-4">
          <!-- Radial Progress -->
          <div snyCard>
            <div snyCardHeader>
              <h3 snyCardTitle>Sprint Actual</h3>
              <p snyCardDescription>Progreso del sprint 12</p>
            </div>
            <div snyCardContent class="flex flex-col items-center gap-4">
              <sny-radial-progress [value]="72" size="lg" />
              <div class="text-center">
                <p class="text-2xl font-bold">72%</p>
                <p class="text-sm text-muted-foreground">18 de 25 tareas completadas</p>
              </div>
            </div>
          </div>

          <!-- Slider -->
          <div snyCard>
            <div snyCardHeader>
              <h3 snyCardTitle>Prioridad del Hilo</h3>
            </div>
            <div snyCardContent class="space-y-4">
              <sny-slider [(value)]="priority" [min]="1" [max]="10" [step]="1" />
              <div class="flex justify-between text-xs text-muted-foreground">
                <span>Baja</span>
                <span class="font-medium text-foreground">{{ priority() }}</span>
                <span>Urgente</span>
              </div>
            </div>
          </div>

          <!-- Number Input -->
          <div snyCard>
            <div snyCardHeader>
              <h3 snyCardTitle>Estimación (horas)</h3>
            </div>
            <div snyCardContent>
              <sny-number-input [(value)]="hours" [min]="0" [max]="100" [step]="0.5" />
            </div>
          </div>

          <!-- Toggle + Loader + Skeleton -->
          <div snyCard>
            <div snyCardHeader>
              <h3 snyCardTitle>Notificaciones</h3>
            </div>
            <div snyCardContent class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm">Silenciar hilo</span>
                <button snyToggle [(pressed)]="muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64A9 9 0 0 1 20.77 15"/><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68"/><path d="M12 2v4"/><path d="m2 2 20 20"/></svg>
                </button>
              </div>
              <sny-divider />
              <div class="flex items-center justify-between">
                <span class="text-sm">Marcar como favorito</span>
                <button snyToggle [(pressed)]="starred">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Loading States Demo -->
          <div snyCard>
            <div snyCardHeader>
              <h3 snyCardTitle>Estados de Carga</h3>
              <p snyCardDescription>Componentes Loader y Skeleton.</p>
            </div>
            <div snyCardContent class="space-y-4">
              <div class="flex items-center gap-4">
                <sny-loader variant="spinner" size="sm" />
                <sny-loader variant="dots" size="sm" />
                <sny-loader variant="bars" size="sm" />
              </div>
              <sny-divider />
              <div class="space-y-2">
                <div snySkeleton class="h-4 w-3/4 rounded"></div>
                <div snySkeleton class="h-4 w-1/2 rounded"></div>
                <div snySkeleton class="h-8 w-full rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Inbox {
  protected readonly tags = signal<string[]>(['diseño', 'review', 'sprint-12']);
  protected readonly priority = signal(5);
  protected readonly hours = signal(8);
  protected readonly muted = signal(false);
  protected readonly starred = signal(true);
}
