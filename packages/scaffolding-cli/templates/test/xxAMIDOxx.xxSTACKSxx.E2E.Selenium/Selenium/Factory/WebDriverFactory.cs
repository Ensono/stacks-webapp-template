using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System.IO;
using System.Reflection;
using System.Collections.Generic;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class WebDriverFactory
  {
    public static IWebDriver GetWebDriver(bool remoteBrowser = false)
    {
      // Default: chromedriver headless
      // chromedriver executable is copied to the output folder from the package source folder
      // with the build process.
      // e.g. xxAMIDOxx.xxSTACKSxx.E2E.Selenium/bin/Debug/netcoreapp3.1/chromedriver

      var chromeOptions = new ChromeOptions();
      chromeOptions.AddArguments(new List<string>() { "no-sandbox", "disable-gpu", "remote-debugging-port=1559" });

      string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
      string chromeDriverPath = Path.GetFullPath(outPutDirectory);

      return remoteBrowser != false ? RemoteWebDriver() : new ChromeDriver(chromeDriverPath, chromeOptions);
    }

    public static IWebDriver RemoteWebDriver()
    {

      var caps = new RemoteSessionSettings();

      caps.AddMetadataSetting("user", RemoteBrowser.user);
      caps.AddMetadataSetting("accessKey", RemoteBrowser.accessKey);

      // Default: chrome on windows - this should be configured to take anynumber of browser options
      caps.AddMetadataSetting("BrowserName","chrome"); // name of your browser
      caps.AddMetadataSetting("Version", "83"); // browser version
      caps.AddMetadataSetting("Platform", "Windows 10"); // operating system

      return new RemoteWebDriver(new Uri(RemoteBrowser.uri), caps, TimeSpan.FromSeconds(600));
    }
  }
}
