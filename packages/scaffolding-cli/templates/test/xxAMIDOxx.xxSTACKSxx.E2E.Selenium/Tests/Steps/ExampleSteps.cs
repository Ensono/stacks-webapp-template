using Shouldly;
using System;
using System.Threading.Tasks;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Configuration;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Pages;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Steps
{
    /// <summary>
    /// These are the steps required for testing the menu endpoints
    /// </summary>
    public class ExampleSteps
    {
        private readonly SeleniumWrapper seleniumWrapper;
        public ExampleSteps(SeleniumWrapper seleniumWrapper)
        {
            this.seleniumWrapper = seleniumWrapper;
        }

        #region Step Definitions

        #region Given
        public void IAmOnTheHomePage()
        {
            var homePageObject = new HomePageObject(seleniumWrapper.Instance());
            homePageObject.MenusDisplayed();
        }
        #endregion Given

        #region When
        public void IWaitForThePageToLoad()
        {
           // Wait for list of menus
        }
        #endregion When

        #region Then
        public void TheRestaurantsMenusAreReturned()
        {
            //Assert menus returned
        }
        #endregion Then

        #endregion Step Definitions
    }
}
