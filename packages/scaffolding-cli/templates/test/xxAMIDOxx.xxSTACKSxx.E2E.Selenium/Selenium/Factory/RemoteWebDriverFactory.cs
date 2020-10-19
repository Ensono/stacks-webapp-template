using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class RemoteWebDriverFactory
  {
    public static string user = Environment.GetEnvironmentVariable("USERNAME") == null ? "%SET_USER_ENV_VAR%" : Environment.GetEnvironmentVariable("USERNAME");
    public static string accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY") == null ? "%SET_ACCESS_KEY_ENV_VAR%" : Environment.GetEnvironmentVariable("ACCESS_KEY");
    public static string server = Environment.GetEnvironmentVariable("SERVER") == null ? "%SET_SERVER_ENV_VAR%" : Environment.GetEnvironmentVariable("SERVER");
    public static Uri uri = new Uri($"https://{user}:{accessKey}{server}/wd/hub");


    [Obsolete("Please see note about Selenium and LambdaTest changes to DesiredCapabilities")]
    public static IWebDriver RemoteWebDriver()
    {
      DesiredCapabilities caps = new DesiredCapabilities();

      caps.SetCapability("user", user);
      caps.SetCapability("accessKey", accessKey);

      caps.SetCapability("platform", "Windows 10");
      caps.SetCapability("browserName", "Chrome");
      caps.SetCapability("version", "84.0");
      caps.SetCapability("console", "true");

      /* Note: Selenium >=3.14.0 release mars DesiredCapabilities is as obsolete.
       * This is not yet supported by LambdaTest. Once supported, the above
       * setup can become like below.*/

      //var caps = new RemoteSessionSettings();
      //caps.AddMetadataSetting("user", user);
      //caps.AddMetadataSetting("accessKey", accessKey);
      //caps.AddMetadataSetting("platform", "Windows 10");
      //caps.AddMetadataSetting("browserName", "Chrome");
      //caps.AddMetadataSetting("version", "84.0");
      //caps.AddMetadataSetting("console", true);

      return new RemoteWebDriver(uri, caps);
    }
  }
}
