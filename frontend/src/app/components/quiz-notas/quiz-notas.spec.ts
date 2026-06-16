import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNotasComponent } from './quiz-notas';

describe('QuizNotas', () => {
  let component: QuizNotasComponent;
  let fixture: ComponentFixture<QuizNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizNotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizNotasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
