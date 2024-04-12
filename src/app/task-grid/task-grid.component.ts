import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from "../task-card/task-card.component";
import { TaskService } from '../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { Status } from '../status_enum';

@Component({
    selector: 'app-task-grid',
    standalone: true,
    templateUrl: './task-grid.component.html',
    styleUrl: './task-grid.component.scss',
    imports: [MatCardModule, MatButtonModule, CommonModule, TaskCardComponent, MatIconModule],
    providers: [TaskService]
})
export class TaskGridComponent implements OnInit{

  tasks: Task[];
  editEvent: any;
  status = Status;

  clearTask() {
    this.tasks = null;
  }

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
       data: task,
     });
 
     dialogRef.afterClosed().subscribe((result) => {
       console.log('The dialog was closed');
       this.taskService.editTask(task).subscribe(() => {
         this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
       });
     });
   }

   ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  baseURL="https://tasksapi20240226164535.azurewebsites.net/api/Tasks";

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

}
