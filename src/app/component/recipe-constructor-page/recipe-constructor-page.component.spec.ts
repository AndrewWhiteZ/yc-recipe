import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeConstructorPageComponent } from './recipe-constructor-page.component';

describe('RecipeConstructorPageComponent', () => {
  let component: RecipeConstructorPageComponent;
  let fixture: ComponentFixture<RecipeConstructorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeConstructorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeConstructorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
