import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Items } from './shared/models/Books';
import { ApiService } from './shared/services/api.service';

const book: Items = {
  id: '123',
  volumeInfo: {
    title: 'Test',
    authors: ['test1'],
    averageRating: 1,
    description: 'Sample',
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    language: 'en',
    pageCount: 12,
    publisher: 'Test',
    subtitle: 'Test12',
  },
};


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
     expect(component).toBeTruthy();
  });

  it(`should have as title 'enlight'`, () => {
     expect(component.title).toEqual('enlight');
  });

  it('should cart length is zero on application load ', () => {
     expect(component.cartLength).toEqual(0);
  });

  it('should change cartlength when new book added to cart', () => {
    apiService.setCartBooks(book);
    apiService.updateCartCount();
    expect(component.cartLength).toBe(1);
  });
});
