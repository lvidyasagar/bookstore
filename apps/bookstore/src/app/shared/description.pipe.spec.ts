import { DescriptionPipe } from './description.pipe';

describe('DescriptionPipe', () => {
  let pipe: DescriptionPipe;

  beforeEach(() => {
    pipe = new DescriptionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should remove html tags if description containt', () => {
    const text = '<h1>Hello Description Pipe.</h1>';
    expect(pipe.transform(text)).toBe('Hello Description Pipe.');
  });

  it('should return No description if description is undefined or empty', () => {
    expect(pipe.transform('')).toBe('No Description');
  });
});
