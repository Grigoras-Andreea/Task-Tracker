import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Status } from '../status_enum';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatButtonModule, NgFor, MatIconModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();
  
  statuses = Object.values(Status);
  
  constructor() { }

  ngOnInit(): void {
    console.log('FilterComponent initialized');
  }

  selectStatus(status: Status): void {
    console.log(status);
    this.statusSelected.emit(status);
  }
}
