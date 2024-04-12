import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  providers: [TaskService]
})
export class TaskCardComponent {

  @Input() task: Task;
  @Output() deleteEvent = new EventEmitter<Task>();
  @Output() editEvent = new EventEmitter<Task>();
  taskService: any;

  clearTask() {
    this.task = null;
  }

  openEditDialog() {
    this.editEvent.emit(this.task);
  }

  constructor(private dialog: MatDialog) {}
}
