import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';
import * as BooksActions from './book.action';
import * as BooksSelectors from './book.selector';
import { of } from 'rxjs';
import { BooksState } from './book.state';

@Injectable()
export class BookEffects {
  constructor(
    private action$: Actions,
    private service: ApiService,
    private store: Store<BooksState>
  ) {}

  loadSearchResults$ = createEffect(() => {
    return this.action$.pipe(
      ofType(BooksActions.loadSearchResults),
      withLatestFrom(this.store.select(BooksSelectors.getSearchString)),
      mergeMap(([action, searchString]) =>
        this.service.getBooksBySearch(searchString).pipe(
          map((books) =>{
            const ModifiedBooks=books.items.map((book) => {
              return { id: book.id, volumeInfo: book.volumeInfo }
            })
            return BooksActions.loadSearchResultsSuccess({books: ModifiedBooks})
          }
          ),
          catchError((error) =>
            of(BooksActions.loadSearchResultsFailure({ error }))
          )
        )
      )
    );
  });
}
