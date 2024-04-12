import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskGridComponent } from '../task-grid/task-grid.component'
import { Task } from '../task';
import { Status } from '../status_enum';
import { TaskListComponent } from '../task-list/task-list.component';
import {MatIconModule} from '@angular/material/icon';
import { TaskService } from '../services/task.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [TaskGridComponent, TaskListComponent, CommonModule, MatIconModule, MatButtonModule],
  providers:[TaskService],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.scss'
})

export class TasksViewComponent {

  isList: boolean;

  constructor() {
   
  }

}
