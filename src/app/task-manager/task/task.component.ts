import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() id;
  @Input() task;
  @Output() onTaskComplete = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  checkBoxChange() {
    this.onTaskComplete.emit(this.id);
  }
}
