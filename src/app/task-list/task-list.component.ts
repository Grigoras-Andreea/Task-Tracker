import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FilterComponent } from "../filter/filter.component";
import { MatIconModule } from '@angular/material/icon';
import { TaskCardComponent } from "../task-card/task-card.component";
import { Status } from '../status_enum';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
    imports: [CommonModule, FilterComponent, MatIconModule, TaskCardComponent],
    providers: [TaskService]
})
export class TaskListComponent implements OnInit{
  filteredTasks: any;

  handleStatusSelected(status: Status) {
    this.filteredTasks = this.tasks.filter(task => task.status === status);
  }
  
  tasks: Task[];

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
      this.tasks = this.tasks.filter(task2 => task2 !== task);
      this.filteredTasks = this.filteredTasks.filter(task2 => task2 !== task);
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
        data: task,
    });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
      });
    }

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    // this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = this.tasks;
    });
  }
}
