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

        //Note: please do not use the FindBy locator straegy. See README for more information.
        protected void WaitForElementToBeVisible(IWebElement element, int timeoutSeconds = 5)
        {
            wait.Timeout = TimeSpan.FromSeconds(timeoutSeconds);

            try
            {
                wait.Until(x => element.Displayed);
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

        protected void WaitForElementToBeClickable(IWebElement element, int timeoutSeconds = 5)
        {
            wait.Timeout = TimeSpan.FromSeconds(timeoutSeconds);

            try
            {
                wait.Until(WebDriver => element.Enabled);
            }
            catch (Exception e)
            {
                throw new TimeoutException(e.InnerException?.ToString() ?? e.ToString());
            }
        }

        protected void ClickElementWhenVisible(IWebElement element, int timeoutSeconds = 5)
        {
            WaitForElementToBeVisible(element, timeoutSeconds);
            element.Click();
        }

        protected void ClickElementWhenVisible(By locator, int timeoutSeconds = 5)
        {
            WaitForElementToBeVisible(locator, timeoutSeconds);
            WebDriver.FindElement(locator).Click();
        }

        protected void SendKeysToElementWhenVisible(IWebElement element, string text, int timeoutSeconds = 5)
        {
            WaitForElementToBeVisible(element, timeoutSeconds);
            element.Clear();
            element.SendKeys(text);
        }
    }
}
