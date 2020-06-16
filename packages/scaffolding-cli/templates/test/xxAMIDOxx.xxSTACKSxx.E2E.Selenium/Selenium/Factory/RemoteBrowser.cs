using System;
namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
  public class RemoteBrowser
  {
      // Example using with LambdaTest
      public static string user = Environment.GetEnvironmentVariable("LT_USERNAME") == null ? "your username" : Environment.GetEnvironmentVariable("LT_USERNAME");
      public static string accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY") == null ? "your accessKey" : Environment.GetEnvironmentVariable("LT_ACCESS_KEY");
      public static bool tunnel = Boolean.Parse(Environment.GetEnvironmentVariable("LT_TUNNEL") == null ? "false" : Environment.GetEnvironmentVariable("LT_TUNNEL"));
      public static string build = Environment.GetEnvironmentVariable("LT_BUILD") == null ? "your build name" : Environment.GetEnvironmentVariable("LT_BUILD");
      public static string uri = $"https://{user}:{accessKey}@hub.lambdatest.com/wd/hub";
  }
}
