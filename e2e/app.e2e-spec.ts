import { AngularStringcalcPage } from './app.po';

describe('angular-stringcalc App', () => {
  let page: AngularStringcalcPage;

  beforeEach(() => {
    page = new AngularStringcalcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to mjv!!');
  });
});
