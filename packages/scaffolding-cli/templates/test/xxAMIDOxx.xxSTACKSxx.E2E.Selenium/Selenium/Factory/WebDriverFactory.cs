using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
    public class WebDriverFactory
    {
        public static IWebDriver GetWebDriver()
        {
            return new ChromeDriver();
        }
    }
}
