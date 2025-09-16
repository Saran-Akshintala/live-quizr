import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { EventsListComponent } from './events-list.component';
import { ApiService } from '../../services/api.service';
import { DemoService } from '../../services/demo.service';

describe('EventsListComponent', () => {
  let fixture: ComponentFixture<EventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EventsListComponent],
      providers: [
        DemoService,
        { provide: ApiService, useValue: { get: () => throwError(() => new Error('fail')) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsListComponent);
    fixture.detectChanges();
  });

  it('falls back to demo events when API fails', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Demo Event');
  });

  it('uses API events when available', async () => {
    const api = TestBed.inject(ApiService) as any;
    api.get = () => of([{ id: 'api1', name: 'API Event', description: 'From API' }]);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('API Event');
  });
});
