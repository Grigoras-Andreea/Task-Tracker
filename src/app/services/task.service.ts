import { Injectable } from '@angular/core';
import { Task } from '../task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private httpClient: HttpClient) { }

  baseUrl="http://localhost:5168/Task";

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl);
  }

  addTask(newTask: Task) {
    const newTaskJson = <Task>{
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      assignedTo: "",
      
    };

    return this.httpClient.post<Task>(this.baseUrl, newTaskJson, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }

  editTask(task: Task) {
    return this.httpClient.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }

  deleteTask(task: Task) {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/${task.id}`,{ headers: this.httpOptions.headers,
         responseType: 'text' as 'json' });
  }

}
