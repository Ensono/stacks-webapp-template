using OpenQA.Selenium;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Components
{
  public class Header : Pages.PageObject
  {
    public Header(IWebDriver webDriver) : base(webDriver)
    {
    }

    public By createMenu = By.CssSelector("[data-testid='create_button']");

    public void Click(By locator)
    {
      ClickElementWhenVisible(locator);
    }
  }
}