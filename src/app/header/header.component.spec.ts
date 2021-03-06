import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR
        })
      ],
      declarations: [
        HeaderComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
