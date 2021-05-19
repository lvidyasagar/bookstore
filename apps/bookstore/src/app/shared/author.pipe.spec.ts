import { AuthorPipe } from './author.pipe';

describe('AuthorPipe', () => {
  let pipe: AuthorPipe;

  beforeEach(() => {
    pipe = new AuthorPipe();
  });

  it('create an instance', () => {
     expect(pipe).toBeTruthy();
  });

  it('should add text /"and"/ in between authors if authors length is greater than 2', () => {
    const authors = ['Brad Green', 'Shyam Seshadri'];
    expect(pipe.transform(authors)).toBe('Brad Green and Shyam Seshadri');
  });

  it('should not add text /"and"/ in between authors if authors length is equal to 1', () => {
    const authors = ['Brad Green'];
    expect(pipe.transform(authors)).toBe('Brad Green');
  });

  it('should return No authors if authors list is empty', () => {
    expect(pipe.transform([])).toBe('No Authors');
  });
});
