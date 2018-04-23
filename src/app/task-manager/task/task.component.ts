import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  boxChecked = false;
  @Input() id;
  @Input() task;
  @Output() onTaskComplete = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  checkBoxChange() {
    this.boxChecked = !this.boxChecked;
    this.onTaskComplete.emit({checked: this.boxChecked, id: this.id});
  }
}
