import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  SnyAvatarComponent,
  SnyButtonDirective,
  SnyDividerComponent,
} from '@sonny-ui/core';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, SnyButtonDirective, SnyAvatarComponent],
  template: `
    <div class="flex flex-col h-full p-5">
      <div class="flex items-center gap-3 mb-8 px-1">
        <sny-avatar src="https://i.pravatar.cc/150?u=admin" alt="Admin" size="md" />
        <div class="min-w-0">
          <p class="font-semibold text-sm truncate">Joel Aldave</p>
          <p class="text-[11px] text-muted-foreground tracking-wide uppercase">Administrador</p>
        </div>
      </div>

      <p class="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70 px-3 mb-2">Menu</p>

      <nav class="flex flex-col gap-0.5">
        <a
          snyBtn
          variant="ghost"
          routerLink="/dashboard"
          routerLinkActive="bg-accent"
          class="justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          Dashboard
        </a>
        <a
          snyBtn
          variant="ghost"
          routerLink="/projects"
          routerLinkActive="bg-accent"
          class="justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
          Proyectos
        </a>
        <a
          snyBtn
          variant="ghost"
          routerLink="/team"
          routerLinkActive="bg-accent"
          class="justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Equipo
        </a>
        <a
          snyBtn
          variant="ghost"
          routerLink="/reports"
          routerLinkActive="bg-accent"
          class="justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          Reportes
        </a>
        <a
          snyBtn
          variant="ghost"
          routerLink="/inbox"
          routerLinkActive="bg-accent"
          class="justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Inbox
        </a>
        <a
          snyBtn
          variant="ghost"
          routerLink="/settings"
          routerLinkActive="bg-accent"
          class="justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          Configuración
        </a>
      </nav>
    </div>
  `,
})
export class Sidebar {}
