using System;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Configuration;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Fixtures
{
    public class BaseSetup : IDisposable
    {
        private ConfigModel config;
        private string baseUrl;
        public SeleniumWrapper seleniumWrapper { get; private set; }

        public BaseSetup()
        {
            seleniumWrapper = new SeleniumWrapper();
            config = ConfigAccessor.GetApplicationConfiguration();
            baseUrl = config.BaseUrl;
        }

        public void homeUrl()
        {
            seleniumWrapper.Setup();
            seleniumWrapper.Navigate(baseUrl);
        }

        public void Dispose()
        {
            seleniumWrapper.CleanUp();
            seleniumWrapper.TearDown();
        }
    }
}
