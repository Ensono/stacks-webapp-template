using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.IO;
using System.Reflection;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class WebDriverFactory
  {
    public static IWebDriver GetWebDriver()
    {
      // Default: chromedriver
      // chromedriver executable is copied to the output folder from the package source folder
      // with the build process.
      // e.g. xxAMIDOxx.xxSTACKSxx.E2E.Selenium/bin/Debug/netcoreapp3.1/chromedriver

      string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
      string chromeDriverPath = Path.GetFullPath(outPutDirectory);

      return new ChromeDriver(chromeDriverPath);
    }
  }
}
