import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIndexPageComponent } from './recipe-index-page.component';

describe('RecipeIndexPageComponent', () => {
  let component: RecipeIndexPageComponent;
  let fixture: ComponentFixture<RecipeIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
