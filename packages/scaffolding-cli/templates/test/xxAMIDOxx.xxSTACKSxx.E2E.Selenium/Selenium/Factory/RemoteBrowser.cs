using System;
namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class RemoteBrowser
  {
      // Example using LambdaTest
      public static string user = Environment.GetEnvironmentVariable("LT_USERNAME") == null ? "your username" : Environment.GetEnvironmentVariable("LT_USERNAME");
      public static string accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY") == null ? "your accessKey" : Environment.GetEnvironmentVariable("LT_ACCESS_KEY");
      public static Uri uri = new Uri($"https://{user}:{accessKey}@hub.lambdatest.com/wd/hub");
  }
}
