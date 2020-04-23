using OpenQA.Selenium;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Components
{
  public class MenuList : Pages.PageObject
  {
    public MenuList(IWebDriver webDriver) : base(webDriver)
    {
    }

    public By menuList = By.CssSelector("[data-testid='results']");

    public bool Displayed(By locator)
    {
      WaitForElementToBeVisible(locator);
      return true;
    }
  }
}
