using OpenQA.Selenium;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Components
{
  public class Notifier : Pages.PageObject
  {
    public Notifier(IWebDriver webDriver) : base(webDriver)
    {
    }

    public By message = By.Id("snackbar-message-id");
  }
}