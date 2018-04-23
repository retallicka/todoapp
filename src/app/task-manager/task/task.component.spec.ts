import {TaskComponent} from './task.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [TaskComponent],
      schemas: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit task complete when checkbox is clicked', () => {
    spyOn(component.onTaskComplete, 'emit').and.callThrough();
    fixture.detectChanges();
    const check = fixture.debugElement.query(By.css('input')).nativeElement;
    check.click();
    expect(component.onTaskComplete.emit).toHaveBeenCalled();
  });

});
