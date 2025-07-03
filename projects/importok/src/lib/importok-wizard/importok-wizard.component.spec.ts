import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportokWizardComponent } from './importok-wizard.component';

describe('ImportokWizardComponent', () => {
  let component: ImportokWizardComponent;
  let fixture: ComponentFixture<ImportokWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportokWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportokWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
