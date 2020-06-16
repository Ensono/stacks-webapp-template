using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class WebDriverFactory
  {
    public static string GetNamespace()
    {
      return typeof(WebDriverFactory).Namespace;
    }

    public static IWebDriver GetWebDriver(bool remoteBrowser = false)
    {
      // Default: chromedriver headless
      // chromedriver executable is copied to the output folder from the package source folder
      // with the build process.
      // e.g. xxAMIDOxx.xxSTACKSxx.E2E.Selenium/bin/Debug/netcoreapp3.1/chromedriver

      var chromeOptions = new ChromeOptions();
      chromeOptions.AddArguments(new List<string>() { "no-sandbox", "disable-gpu", "headless", "remote-debugging-port=1559" });

      string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
      string chromeDriverPath = Path.GetFullPath(outPutDirectory);

      // Checks for the presence of the RemoteBrowser class. If missing, then defaults to Chrome.
      return Type.GetType(typeName: $"{GetNamespace()}.RemoteBrowser") != null ? RemoteBrowser.RemoteWebDriver() : ChromeDriver();
    }

    public static IWebDriver ChromeDriver()
    {
      var caps = new ChromeOptions();

      caps.AddArguments(new List<string>() { "no-sandbox", "disable-gpu", "remote-debugging-port=1559" });

      string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
      string chromeDriverPath = Path.GetFullPath(outPutDirectory);

      return new ChromeDriver(chromeDriverPath, caps);
    }
  }
}
