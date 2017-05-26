import { Ng101Page } from './app.po';

describe('ng101 App', () => {
  let page: Ng101Page;

  beforeEach(() => {
    page = new Ng101Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
