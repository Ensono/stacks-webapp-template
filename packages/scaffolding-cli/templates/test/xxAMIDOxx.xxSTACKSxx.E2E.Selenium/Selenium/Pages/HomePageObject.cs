using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Pages
{
    public class HomePageObject : PageObject
    {
        public HomePageObject(IWebDriver webDriver) : base(webDriver)
        {
        }
        public By menus = By.CssSelector("[data-testid='results']");

        public By createMenu = By.Id("Create menu");
        
        public void MenusDisplayed()
        {
            WaitForElementToBeVisible(menus);
        }

        public void CreateMenu()
        {
            ClickElementWhenVisible(createMenu);
        }
    }
}
