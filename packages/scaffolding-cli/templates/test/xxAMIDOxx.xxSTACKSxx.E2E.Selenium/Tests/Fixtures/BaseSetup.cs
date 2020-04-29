using System;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Configuration;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Fixtures
{
  public class BaseSetup : IDisposable
  {
    private readonly ConfigModel config;
    private readonly string baseUrl;
    public SeleniumWrapper SeleniumWrapper { get; private set; }

    public BaseSetup()
    {
      SeleniumWrapper = new SeleniumWrapper();
      config = ConfigAccessor.GetApplicationConfiguration();
      baseUrl = config.BaseUrl;
    }

    public void Home()
    {
      SeleniumWrapper.Setup();
      SeleniumWrapper.Open(baseUrl);
    }

    public void Dispose()
    {
      SeleniumWrapper.CleanUp();
      SeleniumWrapper.TearDown();
    }
  }
}
