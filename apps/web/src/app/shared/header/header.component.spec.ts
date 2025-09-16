import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('should render top nav links', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = Array.from(el.querySelectorAll('a')) as HTMLAnchorElement[];
    const hrefs = links.map(a => a.getAttribute('ng-reflect-router-link') || a.getAttribute('href'));
    expect(links.length).toBeGreaterThan(0);
    // Expect known routes
    expect(hrefs.join(' ')).toContain('/about');
    expect(hrefs.join(' ')).toContain('/events');
    expect(hrefs.join(' ')).toContain('/host/demo');
    expect(hrefs.join(' ')).toContain('/display/demo');
    expect(hrefs.join(' ')).toContain('/join/demo');
    expect(hrefs.join(' ')).toContain('/admin');
    expect(hrefs.join(' ')).toContain('/demo');
  });
});
