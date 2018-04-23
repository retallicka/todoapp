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
    this.activeTarget = e;
  }

  onDragDrop(e) {
    e.preventDefault();
    const droppedIndex = Number(e.target.dataset.id);
    const targetIndex = Number(this.activeTarget.target.dataset.id);
    const droppedDataIndex = this.data.findIndex(d => d.id === droppedIndex);
    const targetDataIndex = this.data.findIndex(d => d.id === targetIndex);
    this.data = arraySwap(droppedDataIndex, targetDataIndex, this.data);
  }

  createNewTask() {
    if (this.taskName === '') {
      alert('Please enter a task');
    } else {
      const obj = {id: this.newTaskNumber, task: this.taskName};
      this.data.push (obj);
      this.taskName = '';
      this.newTaskNumber++;
    }
  }

  save() {
    localStorage.setItem('todoapp', JSON.stringify(this.data));
    localStorage.setItem('todoappTaskNumber', JSON.stringify(this.newTaskNumber));
  }

  onTaskComplete(id) {
    const index = this.data.findIndex(d => d.id === id);
    this.data.splice(index, 1);
  }

  allowDrop(e) {
    e.preventDefault();
  }

}
