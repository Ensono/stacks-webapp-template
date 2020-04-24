using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Pages
{
  public abstract class PageObject
  {
    protected readonly IWebDriver WebDriver;
    protected readonly WebDriverWait wait;

    protected PageObject(IWebDriver webDriver)
    {
      WebDriver = webDriver;
      wait = new WebDriverWait(WebDriver, TimeSpan.FromSeconds(5));
    }

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

    public string Text(By locator)
    {
      return GetElementTextWhenVisible(locator);
    }

    protected void WaitForElementToBeVisible(By locator, int timeoutSeconds = 5)
    {
      wait.Timeout = TimeSpan.FromSeconds(timeoutSeconds);

      try
      {
        wait.Until(WebDriver => WebDriver.FindElement(locator).Displayed);
      }
      catch (Exception e)
      {
        throw new TimeoutException(e.InnerException?.ToString() ?? e.ToString());
      }
    }

    protected void WaitForElementToBeClickable(By locator, int timeoutSeconds = 5)
    {
      wait.Timeout = TimeSpan.FromSeconds(timeoutSeconds);

      try
      {
        wait.Until(WebDriver => WebDriver.FindElement(locator).Enabled);
      }
      catch (Exception e)
      {
        throw new TimeoutException(e.InnerException?.ToString() ?? e.ToString());
      }
    }

    protected void ClickElementWhenVisible(By locator, int timeoutSeconds = 5)
    {
      WaitForElementToBeVisible(locator, timeoutSeconds);
      WebDriver.FindElement(locator).Click();
    }

    protected void SelectElementWhenClickable(By locator, int timeoutSeconds = 5)
    {
      WaitForElementToBeClickable(locator, timeoutSeconds);
      WebDriver.FindElement(locator).Click();
    }

    protected void SendKeysToElementWhenVisible(By locator, string text, int timeoutSeconds = 5)
    {
      WaitForElementToBeVisible(locator, timeoutSeconds);
      WebDriver.FindElement(locator).Clear();
      WebDriver.FindElement(locator).SendKeys(text);
    }

    protected string GetElementTextWhenVisible(By locator, int timeoutSeconds = 5)
    {
      WaitForElementToBeVisible(locator, timeoutSeconds);
      return WebDriver.FindElement(locator).Text;
    }
  }
}
