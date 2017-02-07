import { browser, by, element } from 'protractor';

describe('App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let title = browser.getTitle();
    expect(title).toEqual('Angular Webpack Seed');
  });

  it('should begin with the dashboard', () => {
    let path = browser.getCurrentUrl();
    expect(path).toMatch(/\/dashboard$/);
  });

  it('should have a header', () => {
    let header = element(by.css('h1'));
    expect(header.isPresent()).toBe(true);
  });
});
