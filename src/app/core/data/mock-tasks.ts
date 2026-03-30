import { Task } from '../models/task';

export const MOCK_TASKS: Task[] = [
  // Proyecto Heisenberg (p1)
  { id: 't1', projectId: 'p1', title: 'Cocinar wireframes con 99% de pureza', assigneeId: 'u6', status: 'done', priority: 'high', dueDate: '2026-02-15' },
  { id: 't2', projectId: 'p1', title: 'Implementar layout responsivo, bitch!', assigneeId: 'u2', status: 'in-progress', priority: 'high', dueDate: '2026-03-20' },
  { id: 't3', projectId: 'p1', title: 'Integrar componentes de gráficos azules', assigneeId: 'u2', status: 'todo', priority: 'medium', dueDate: '2026-03-30' },
  { id: 't4', projectId: 'p1', title: 'Tread lightly con la accesibilidad', assigneeId: 'u1', status: 'todo', priority: 'medium', dueDate: '2026-04-05' },
  { id: 't5', projectId: 'p1', title: 'Optimizar rendimiento — no half measures', assigneeId: 'u1', status: 'todo', priority: 'low', dueDate: '2026-04-10' },

  // Los Pollos Hermanos API (p2)
  { id: 't6', projectId: 'p2', title: 'Diseñar esquema de datos del restaurante', assigneeId: 'u3', status: 'done', priority: 'urgent', dueDate: '2026-02-01' },
  { id: 't7', projectId: 'p2', title: 'Implementar endpoint de órdenes de pollo', assigneeId: 'u3', status: 'done', priority: 'urgent', dueDate: '2026-02-20' },
  { id: 't8', projectId: 'p2', title: 'Integrar proveedor de pagos — gabagool', assigneeId: 'u3', status: 'in-progress', priority: 'high', dueDate: '2026-03-15' },
  { id: 't9', projectId: 'p2', title: 'Tests de integración — leave the gun, take the cannoli', assigneeId: 'u5', status: 'todo', priority: 'high', dueDate: '2026-03-25' },
  { id: 't10', projectId: 'p2', title: 'Documentar API — I am the danger', assigneeId: 'u1', status: 'blocked', priority: 'medium', dueDate: '2026-03-28' },

  // Dunder Mifflin Mobile (p3)
  { id: 't11', projectId: 'p3', title: 'Definir user stories — that\'s what she said', assigneeId: 'u4', status: 'in-progress', priority: 'high', dueDate: '2026-04-10' },
  { id: 't12', projectId: 'p3', title: 'Investigar frameworks — bears, beets, Battlestar Galactica', assigneeId: 'u5', status: 'done', priority: 'medium', dueDate: '2026-03-25' },
  { id: 't13', projectId: 'p3', title: 'Crear prototipos en Figma como Picasso', assigneeId: 'u6', status: 'todo', priority: 'medium', dueDate: '2026-04-20' },

  // Bada Bing Notificaciones (p4)
  { id: 't14', projectId: 'p4', title: 'Implementar WebSocket — make him an offer he can\'t refuse', assigneeId: 'u3', status: 'done', priority: 'urgent', dueDate: '2026-03-01' },
  { id: 't15', projectId: 'p4', title: 'Crear componente de notificaciones push', assigneeId: 'u2', status: 'done', priority: 'high', dueDate: '2026-03-10' },
  { id: 't16', projectId: 'p4', title: 'Revisar errores — woke up this morning', assigneeId: 'u5', status: 'in-progress', priority: 'medium', dueDate: '2026-03-22' },

  // Migración a la Nube (p5)
  { id: 't17', projectId: 'p5', title: 'Auditar servicios — say my name', assigneeId: 'u1', status: 'done', priority: 'high', dueDate: '2026-03-15' },
  { id: 't18', projectId: 'p5', title: 'Crear terraform scripts — science!', assigneeId: 'u2', status: 'blocked', priority: 'high', dueDate: '2026-04-01' },

  // Wiki de Schrute Farms (p6)
  { id: 't19', projectId: 'p6', title: 'Configurar framework — Assistant Regional Manager docs', assigneeId: 'u5', status: 'done', priority: 'medium', dueDate: '2026-01-20' },
  { id: 't20', projectId: 'p6', title: 'Escribir guías — Wikipedia is the best thing ever', assigneeId: 'u4', status: 'done', priority: 'low', dueDate: '2026-02-15' },
];
