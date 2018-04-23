import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskManagerComponent} from './task-manager.component';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [TaskManagerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    const storage = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in storage ? storage[key] : null;
      },
      setItem: (key: string, value: string) => {
        storage[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function addTask(name) {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = name;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const newTaskButton = fixture.debugElement.query(By.css('.new-task-btn'));
    newTaskButton.nativeElement.click();
  }

  it('should create new task and add to data array', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'New task';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.new-task-btn'));
    button.nativeElement.click();
    expect(component.data.length).not.toEqual(0);
  });

  it('should set IDs sequentially', () => {
    component.newTaskNumber = 99;
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'New task';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const newTaskButton = fixture.debugElement.query(By.css('.new-task-btn'));
    newTaskButton.nativeElement.click();
    expect(component.data[0].id).toEqual(99);
    expect(component.newTaskNumber).toEqual(100);
  });

  it('should remove a complete task', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'New task';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const newTaskButton = fixture.debugElement.query(By.css('.new-task-btn'));
    newTaskButton.nativeElement.click();
    expect(component.data.length).toEqual(1);

    component.onTaskComplete({id: 0});
    expect(component.data.length).toEqual(0);
  });

  describe('local storage', () => {
    it('should store the data in localStorage on save', () => {
      component.newTaskNumber = 1;
      component.data = [{id: 1, task: 'Norskkurs'}];
      component.save();
      expect(localStorage.getItem('todoapp')).toEqual('[{"id":1,"task":"Norskkurs"}]');
    });

    it('should recover from localStorage null state', () => {
      component.ngOnInit();
      expect(localStorage.getItem('todoapp')).toBeNull();
      expect(component.data.length).toBe(0);
    });

    it('should reload the data from localStorage on init', () => {
      component.newTaskNumber = 1;
      component.data = [{id: 101, task: 'Write unit test'}];
      component.save();
      component.ngOnInit();
      expect(JSON.stringify(component.data)).toBe('[{"id":101,"task":"Write unit test"}]');
    });
  });

  it('should switch round items on drag and drop', () => {
    addTask('new task'); // task 0
    addTask('another task'); // task 1
    component.save();
    expect(component.data[0].task).toBe('new task');
    expect(component.data[1].task).toBe('another task');
    component.onDragChange({target: {dataset: {id: 0}}, preventDefault: function (){}});
    component.onDragDrop({target: {dataset: {id: 1}}, preventDefault: function (){}});
    expect(component.data[0].task).toBe('another task');
    expect(component.data[1].task).toBe('new task');
  });
});
