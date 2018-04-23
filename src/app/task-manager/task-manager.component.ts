import { Component, OnInit } from '@angular/core';
import {arraySwap} from '../utils/utils';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  data = [];
  taskName = '';
  newTaskNumber = 0;
  activeTarget = null;

  constructor() { }

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('todoapp'));
    const newTaskNumber = JSON.parse(localStorage.getItem('todoappTaskNumber'));
    if (data) {
      this.data = data;
      this.newTaskNumber = newTaskNumber;
    }
  }

  onDragChange(e) {
    console.log('drag change', e);
    this.activeTarget = e;
  }

  onDragDrop(e) {
    e.preventDefault();
    console.log('swap');
    console.log(e.target.dataset.id);
    console.log('with');
    console.log(this.activeTarget.target.dataset.id);

    const droppedIndex = Number(e.target.dataset.id);
    const targetIndex = Number(this.activeTarget.target.dataset.id);

    const droppedDataIndex = this.data.findIndex(d => d.id === droppedIndex);
    const targetDataIndex = this.data.findIndex(d => d.id === targetIndex);

    console.log('dropped', droppedDataIndex);
    console.log('targ', targetDataIndex);

    const arr = arraySwap(droppedDataIndex, targetDataIndex, this.data);
    if (arr) {
      console.log('swap successful',arr);
      this.data = arr;
    }
  }

  createNewTask() {
    console.log('create new task!');
    if (this.taskName === '') {
      alert('Task is blank');
    } else {
      const obj = {id: this.newTaskNumber, task: this.taskName};
      this.data.push (obj);
      this.taskName = '';
    }
  }

  save() {
    console.log('save!');
    localStorage.setItem('todoapp', JSON.stringify(this.data));
    this.newTaskNumber++;
    localStorage.setItem('todoappTaskNumber', JSON.stringify(this.newTaskNumber));
  }

  onTaskComplete(e) {
    console.log('completed', e);
    const index = this.data.findIndex(d => d.id === e.id);
    this.data.splice(index, 1);
  }

  allowDrop(e) {
    e.preventDefault();
  }

}
