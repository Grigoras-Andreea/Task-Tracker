import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../task';
import { Status } from '../status_enum';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  providers: [TaskService]
})
export class AddTaskComponent {
taskName: string;
taskDescription: string;
  tasks: Task[];

constructor(private router: Router, private taskService: TaskService, private notificationService: NotificationService) {
  this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
}

onSubmit() {
  console.log('Task Name: ' + this.taskName);
  console.log('Task Description: ' + this.taskDescription);
  
  const newTask: Task = {
    id: 'unique_id',
    description: this.taskDescription,
    status: Status.ToDo,
    title: this.taskName,
    assignedTo: ""
  };
  
  this.taskService.addTask(newTask)
      .subscribe(task => {
        this.notificationService.sendMessage("BroadcastMessage", [task])
        
        this.router.navigate(['/']);
      });

}

cancel() {
  this.router.navigate(['/']);
}

}
