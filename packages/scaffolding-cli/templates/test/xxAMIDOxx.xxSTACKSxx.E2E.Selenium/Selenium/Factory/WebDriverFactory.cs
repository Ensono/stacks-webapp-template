using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.IO;
using System.Reflection;
using System.Collections.Generic;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Factory
{
    public class WebDriverFactory
    {
        public static IWebDriver GetWebDriver()
        {
            // Default: chromedriver headless
            // chromedriver executable is copied to the output folder from the package source folder
            // with the build process.
            // e.g. xxAMIDOxx.xxSTACKSxx.E2E.Selenium/bin/Debug/netcoreapp3.1/chromedriver

            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArguments(new List<string>() { "no-sandbox", "headless", "disable-gpu", "remote-debugging-port=1559" });

            string outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string chromeDriverPath = Path.GetFullPath(outPutDirectory);

            return new ChromeDriver(chromeDriverPath, chromeOptions);
        }
    }
}
