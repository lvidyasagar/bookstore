import { DescriptionPipe } from './description.pipe';

describe('DescriptionPipe', () => {
  let pipe:DescriptionPipe;

  beforeEach(()=>{
    pipe=new DescriptionPipe();
  });


  it('create an instance', () => {
    const pipe = new DescriptionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should remove html tags if description containt',()=>{
    let string="<h1>Hello Description Pipe.</h1>";
    expect(pipe.transform(string)).toBe('Hello Description Pipe.')
  });

  it('should return No description if description is undefined or empty',()=>{
    expect(pipe.transform("")).toBe('No Description');
  })

});
