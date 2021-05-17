import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component:AppComponent;
  let fixture:ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'enlight'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('enlight');
  });

  it('should cart length is zero on application load ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app=fixture.componentInstance;
    expect(app.cartLength).toEqual(0);
    // fixture.detectChanges();
    // const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('.content span').textContent).toContain('bookstore app is running!');
  });

  it('should change cartlength when new book added to cart',()=>{
    //spyOn(ApiService,'updateCartCount').
  })
});
