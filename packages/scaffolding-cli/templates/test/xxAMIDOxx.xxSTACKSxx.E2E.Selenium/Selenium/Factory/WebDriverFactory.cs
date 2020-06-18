using System.Collections.Generic;
using System.IO;
using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class WebDriverFactory
  {
    public static IWebDriver GetWebDriver(bool remoteBrowser = false)
    {
      // Checks for the RemoteBrowser flag in appsettings.json. Default: Chrome
      return remoteBrowser ? RemoteBrowser.RemoteWebDriver() : ChromeDriver();
    }

    public static IWebDriver ChromeDriver()
    {
      // Default: chromedriver headless
      // chromedriver executable is copied to the output folder from the package source folder
      // with the build process.
      // e.g. xxAMIDOxx.xxSTACKSxx.E2E.Selenium/bin/Debug/netcoreapp3.1/chromedriver

      var caps = new ChromeOptions();

      caps.AddArguments(new List<string>() { "no-sandbox", "disable-gpu", "remote-debugging-port=1559" });

      string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
      string chromeDriverPath = Path.GetFullPath(outPutDirectory);

      return new ChromeDriver(chromeDriverPath, caps);
    }
  }
}
