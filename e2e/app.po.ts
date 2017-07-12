import { browser, by, element } from 'protractor';

export class AngularStringcalcPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('mjv-root h1')).getText();
  }
}
