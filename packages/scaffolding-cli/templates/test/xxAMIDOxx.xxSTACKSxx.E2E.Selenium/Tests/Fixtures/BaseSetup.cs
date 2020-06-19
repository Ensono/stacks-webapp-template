using System;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Configuration;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium;


namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Fixtures
{
  public class BaseSetup : IDisposable
  {
    private readonly ConfigModel config;
    public bool remote;
    public SeleniumWrapper SeleniumWrapper { get; private set; }

    public BaseSetup()
    {
      SeleniumWrapper = new SeleniumWrapper();
      config = ConfigAccessor.GetApplicationConfiguration();
    }

    public void Home()
    {
      SeleniumWrapper.Setup(config.RemoteBrowser);
      SeleniumWrapper.Open(config.BaseUrl);
    }

    public void Dispose()
    {
      SeleniumWrapper.CleanUp();
      SeleniumWrapper.TearDown();
    }
  }
}
