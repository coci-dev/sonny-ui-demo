import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  SnyDialogHeaderDirective,
  SnyDialogTitleDirective,
  SnyDialogDescriptionDirective,
  SnyDialogContentDirective,
  SnyDialogFooterDirective,
  SnyInputDirective,
  SnySelectComponent,
  SnyComboboxComponent,
  SnyDatePickerComponent,
  SnySwitchComponent,
  SnyButtonDirective,
  SnyToastService,
  SnyLabelDirective,
  type SelectOption,
  type ComboboxOption,
} from '@sonny-ui/core';
import { ProjectService } from '../../core/services/project';
import { UserService } from '../../core/services/user';
import { Project, ProjectStatus, Priority } from '../../core/models/project';

@Component({
  selector: 'app-project-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    SnyDialogHeaderDirective,
    SnyDialogTitleDirective,
    SnyDialogDescriptionDirective,
    SnyDialogContentDirective,
    SnyDialogFooterDirective,
    SnyInputDirective,
    SnySelectComponent,
    SnyComboboxComponent,
    SnyDatePickerComponent,
    SnySwitchComponent,
    SnyButtonDirective,
    SnyLabelDirective,
  ],
  template: `
    <div snyDialogHeader>
      <h2 snyDialogTitle>{{ isEdit ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h2>
      <p snyDialogDescription>
        {{ isEdit ? 'Modifica los datos del proyecto.' : 'Completa los datos para crear un nuevo proyecto.' }}
      </p>
    </div>

    <div snyDialogContent>
      <form [formGroup]="form" class="space-y-4">
        <div class="space-y-2">
          <label snyLabel>Nombre</label>
          <input snyInput formControlName="name" placeholder="Nombre del proyecto" />
        </div>

        <div class="space-y-2">
          <label snyLabel>Descripción</label>
          <textarea snyInput formControlName="description" placeholder="Descripción del proyecto" rows="3"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label snyLabel>Estado</label>
            <sny-select [options]="statusOptions" formControlName="status" placeholder="Seleccionar estado" />
          </div>
          <div class="space-y-2">
            <label snyLabel>Prioridad</label>
            <sny-select [options]="priorityOptions" formControlName="priority" placeholder="Seleccionar prioridad" />
          </div>
        </div>

        <div class="space-y-2">
          <label snyLabel>Miembros del equipo</label>
          <sny-combobox [options]="memberOptions" formControlName="teamLead" placeholder="Buscar miembro..." searchPlaceholder="Escribe un nombre..." />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label snyLabel>Fecha de Inicio</label>
            <sny-date-picker formControlName="startDate" placeholder="Seleccionar fecha" locale="es" [clearable]="true" />
          </div>
          <div class="space-y-2">
            <label snyLabel>Fecha Límite</label>
            <sny-date-picker formControlName="endDate" placeholder="Seleccionar fecha" locale="es" [clearable]="true" />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <sny-switch formControlName="notifyTeam" />
          <label snyLabel>Notificar al equipo</label>
        </div>
      </form>
    </div>

    <div snyDialogFooter>
      <button snyBtn variant="outline" (click)="cancel()">Cancelar</button>
      <button snyBtn [disabled]="form.invalid" (click)="save()">
        {{ isEdit ? 'Guardar Cambios' : 'Crear Proyecto' }}
      </button>
    </div>
  `,
})
export class ProjectDialog {
  private readonly dialogRef = inject(DialogRef);
  private readonly dialogData = inject<Project | undefined>(DIALOG_DATA, { optional: true });
  private readonly projectService = inject(ProjectService);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(SnyToastService);

  protected readonly isEdit = !!this.dialogData;

  protected readonly statusOptions: SelectOption[] = [
    { value: 'planning', label: 'Planificación' },
    { value: 'in-progress', label: 'En Progreso' },
    { value: 'review', label: 'En Revisión' },
    { value: 'completed', label: 'Completado' },
    { value: 'on-hold', label: 'En Espera' },
  ];

  protected readonly priorityOptions: SelectOption[] = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' },
  ];

  protected readonly memberOptions: ComboboxOption[] = this.userService.users().map((u) => ({
    value: u.id,
    label: u.name,
  }));

  protected readonly form = new FormGroup({
    name: new FormControl(this.dialogData?.name ?? '', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl(this.dialogData?.description ?? '', { nonNullable: true }),
    status: new FormControl<string>(this.dialogData?.status ?? 'planning', { nonNullable: true }),
    priority: new FormControl<string>(this.dialogData?.priority ?? 'medium', { nonNullable: true }),
    teamLead: new FormControl<string>(this.dialogData?.teamMemberIds?.[0] ?? '', { nonNullable: true }),
    startDate: new FormControl<Date | null>(this.dialogData ? new Date(this.dialogData.startDate) : null),
    endDate: new FormControl<Date | null>(this.dialogData ? new Date(this.dialogData.endDate) : null),
    notifyTeam: new FormControl(false, { nonNullable: true }),
  });

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected save(): void {
    if (this.form.invalid) return;

    const val = this.form.getRawValue();

    if (this.isEdit && this.dialogData) {
      this.projectService.update(this.dialogData.id, {
        name: val.name,
        description: val.description,
        status: val.status as ProjectStatus,
        priority: val.priority as Priority,
        startDate: val.startDate?.toISOString().split('T')[0] ?? this.dialogData.startDate,
        endDate: val.endDate?.toISOString().split('T')[0] ?? this.dialogData.endDate,
      });
      this.toastService.success('Proyecto actualizado', `"${val.name}" fue actualizado correctamente.`);
    } else {
      const newProject: Project = {
        id: 'p' + Date.now(),
        name: val.name,
        description: val.description,
        status: val.status as ProjectStatus,
        priority: val.priority as Priority,
        startDate: val.startDate?.toISOString().split('T')[0] ?? new Date().toISOString().split('T')[0],
        endDate: val.endDate?.toISOString().split('T')[0] ?? '',
        progress: 0,
        teamMemberIds: val.teamLead ? [val.teamLead] : [],
        createdAt: new Date().toISOString().split('T')[0],
        phases: [
          { name: 'Planificación', status: 'active' },
          { name: 'Desarrollo', status: 'default' },
          { name: 'Testing', status: 'default' },
          { name: 'Deploy', status: 'default' },
        ],
      };
      this.projectService.add(newProject);
      this.toastService.success('Proyecto creado', `"${val.name}" fue creado correctamente.`);
    }

    this.dialogRef.close();
  }
}
