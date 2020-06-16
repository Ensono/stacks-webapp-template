using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class RemoteBrowser
  {
    // Example using LambdaTest
    public static string user = Environment.GetEnvironmentVariable("LT_USERNAME") == null ? "your username" : Environment.GetEnvironmentVariable("LT_USERNAME");
    public static string accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY") == null ? "your accessKey" : Environment.GetEnvironmentVariable("LT_ACCESS_KEY");
    public static Uri uri = new Uri($"https://{user}:{accessKey}@hub.lambdatest.com/wd/hub");


    [Obsolete]
    public static IWebDriver RemoteWebDriver()
    {
      DesiredCapabilities caps = new DesiredCapabilities();

      caps.SetCapability("user", RemoteBrowser.user);
      caps.SetCapability("accessKey", RemoteBrowser.accessKey);

      caps.SetCapability("platform", "Windows 10");
      caps.SetCapability("browserName", "Chrome");
      caps.SetCapability("version", "83.0");
      caps.SetCapability("console", "true");

      /* Note: Selenium >=3.14.0 release mars DesiredCapabilities is as obsolete.
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
