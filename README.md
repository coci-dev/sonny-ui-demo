# PM Dashboard

Demo de un Project Management Dashboard construido con **Angular 21** y **[@sonny-ui/core](https://www.npmjs.com/package/@sonny-ui/core)** para mostrar el uso práctico de ~57 componentes de la librería en un contexto realista.

## Stack

- **Angular 21** — Zoneless, Signals, Standalone components, nuevo control flow
- **@sonny-ui/core** — Librería de componentes UI inspirada en shadcn/ui
- **Tailwind CSS v4** — Estilos utilitarios
- **TypeScript** — Strict mode

## Prácticas Angular Modernas

- `provideZonelessChangeDetection()` — Sin zone.js
- `signal()`, `computed()`, `model()`, `input()`, `viewChild()`, `linkedSignal()`
- `inject()` — Sin inyección por constructor
- `@if`, `@for`, `@switch`, `@let` — Nuevo control flow
- `ChangeDetectionStrategy.OnPush` en todos los componentes
- `loadComponent` / `loadChildren` — Lazy loading en todas las rutas
- `withComponentInputBinding()` — Parámetros de ruta directo a `input()`
- `withViewTransitions()` — Transiciones animadas entre páginas
- File naming 2025 — Sin sufijos `.component` / `.service`
- Typed Reactive Forms en dialogs

## Páginas

| Ruta | Descripción | Componentes Destacados |
|------|-------------|----------------------|
| `/dashboard` | Stats, actividad reciente, progreso | Card, Stat, Timeline, Progress, Badge |
| `/projects` | Lista con DataTable, CRUD con Dialog | DataTable, Dialog, Input, Select, Combobox, DatePicker, Switch, Toast |
| `/projects/:id` | Detalle con tabs, fases, tareas | Tabs, Steps, Breadcrumb, AvatarGroup |
| `/team` | Grid de miembros, FAQ, filtros | Accordion, Alert, Status, Indicator, Rating, Dropdown, Popover, List, Radio, Checkbox |
| `/reports` | Métricas, personalización, exportar | Carousel, ColorPicker, DateRangePicker, Diff, OTPInput, Fieldset, ButtonGroup, Dock, FAB, RadialProgress |
| `/inbox` | Chat, archivos, herramientas | ChatBubble, TagInput, FileInput, Slider, NumberInput, Toggle, Loader, Skeleton |
| `/settings` | Tema, notificaciones, preferencias | Switch, Select, Divider, Card |

## Componentes @sonny-ui/core Utilizados (~57)

**Layout:** DrawerLayout, DrawerSide, DrawerContent, Navbar, NavbarBrand, NavbarContent, NavbarEnd

**Data:** DataTable, CellDef, BulkActions, Progress, RadialProgress, Badge, AvatarGroup, Avatar, Rating

**Navigation:** Tabs, TabsList, TabsTrigger, TabsContent, Steps, Step, Breadcrumb, Carousel, Dock, FAB, Pagination

**Feedback:** Toaster, Toast, Timeline, Alert, Loader, Skeleton, Status, Indicator

**Forms:** Input, Select, Combobox, DatePicker, DateRangePicker, Switch, Checkbox, Radio, Slider, NumberInput, OTPInput, TagInput, FileInput, ColorPicker, Toggle, Label, Fieldset

**Overlays:** Dialog, CommandPalette, Tooltip, Popover, Dropdown

**UI:** Button, ButtonGroup, Card, Stat, Divider, Kbd, List, ChatBubble, Diff

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Build de producción
ng build
```

## Tema

Estilo shadcn/ui con paleta zinc neutral, fuente Geist, bordes limpios. Soporta light y dark mode via `ThemeService`.
