import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectDashboard } from './architect-dashboard';

describe('ArchitectDashboard', () => {
  let component: ArchitectDashboard;
  let fixture: ComponentFixture<ArchitectDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitectDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
