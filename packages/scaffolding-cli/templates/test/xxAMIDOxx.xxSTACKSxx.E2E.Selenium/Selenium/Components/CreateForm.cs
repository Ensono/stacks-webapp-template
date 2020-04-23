using OpenQA.Selenium;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Components
{
  public class CreateForm : Pages.PageObject
  {
    public CreateForm(IWebDriver webDriver) : base(webDriver)
    {
    }

    public By name = By.Id("name");
    public By description = By.Id("description");
    public By active = By.CssSelector("[name='enabled']");
    public By save = By.CssSelector("[data-testid='save_btn']");

    public void Select(By locator)
    {
      SelectElementWhenClickable(locator);
    }

    public void Click(By locator)
    {
      ClickElementWhenVisible(locator);
    }

    public bool Displayed(By locator)
    {
      WaitForElementToBeVisible(locator);
      return true;
    }

    public void TypeText(By locator, string text)
    {
      SendKeysToElementWhenVisible(locator, text);
    }
  }
}