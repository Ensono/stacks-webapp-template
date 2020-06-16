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
      chromeOptions.AddArguments(new List<string>() { "no-sandbox", "disable-gpu", "headless", "remote-debugging-port=1559" });

      string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
      string chromeDriverPath = Path.GetFullPath(outPutDirectory);

      return remoteBrowser != false ? RemoteWebDriver() : ChromeDriver();
    }

    public static IWebDriver ChromeDriver()
    {
      var caps = new ChromeOptions();

      caps.AddArguments(new List<string>() { "no-sandbox", "disable-gpu", "remote-debugging-port=1559" });

      string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
      string chromeDriverPath = Path.GetFullPath(outPutDirectory);

      return new ChromeDriver(chromeDriverPath, caps);
    }

    [Obsolete]
    public static IWebDriver RemoteWebDriver()
    {
      DesiredCapabilities caps = new DesiredCapabilities();

      caps.SetCapability("user", RemoteBrowser.user);
      caps.SetCapability("accessKey", RemoteBrowser.accessKey);

      caps.SetCapability("build", "your build name");
      caps.SetCapability("name", "your test name");
      caps.SetCapability("platform", "Windows 10");
      caps.SetCapability("browserName", "Chrome");
      caps.SetCapability("version", "83.0");
      caps.SetCapability("console", "true");

      /* Note: Selenium >=3.14.0 release mars DesiredCapabilite is as obsolete.
       * This is not yet supported by LambdaTest. Once supported, the above
       * setup can become like below.*/

      //var caps = new RemoteSessionSettings();
      //caps.AddMetadataSetting("user", RemoteBrowser.user);
      //caps.AddMetadataSetting("accessKey", RemoteBrowser.accessKey);
      //caps.AddMetadataSetting("platform", "Windows 10");
      //caps.AddMetadataSetting("browserName", "Chrome");
      //caps.AddMetadataSetting("version", "83.0");
      //caps.AddMetadataSetting("console", true);

      return new RemoteWebDriver(RemoteBrowser.uri, caps);
    }
  }
}
