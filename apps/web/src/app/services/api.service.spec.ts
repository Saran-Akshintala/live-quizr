import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prefix base URL on GET', () => {
    let resp: any;
    service.get('/health').subscribe(r => resp = r);
    const req = httpMock.expectOne(environment.API_BASE_URL + '/health');
    expect(req.request.method).toBe('GET');
    req.flush({ ok: true });
    expect(resp).toEqual({ ok: true });
  });
});
