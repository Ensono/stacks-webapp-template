using System;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory;
using OpenQA.Selenium;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium
{
  public class SeleniumWrapper
  {
    private IWebDriver webDriver;

    public void Setup()
    {
      webDriver = WebDriverFactory.GetWebDriver();
      webDriver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    }

    public IWebDriver Instance()
    {
      return webDriver;
    }

    public void Open(string baseUrl)
    {
      webDriver.Navigate().GoToUrl(baseUrl);
    }

    public void CleanUp()
    {
      webDriver.Manage().Cookies.DeleteAllCookies();
    }

    public void TearDown()
    {
      webDriver.Close();
      webDriver.Quit();
    }
  }
}
