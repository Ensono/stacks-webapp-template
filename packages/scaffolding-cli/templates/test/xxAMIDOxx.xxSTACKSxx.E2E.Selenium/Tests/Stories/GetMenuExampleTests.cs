using TestStack.BDDfy;
using Xunit;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Fixtures;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Steps;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Stories
{
    //Define the story/feature being tested
    [Story(
        AsA = "Yumido customer",
        IWant = "to get a list of menus at the restaurant",
        SoThat = "I know what I can order")]

    public class GetMenuExampleTests : IClassFixture<BaseSetup>
    {
        private readonly ExampleSteps steps;
        private readonly BaseSetup fixtures;

        public GetMenuExampleTests(BaseSetup fixture)
        {
            //Get instances of the fixture and steps required for the test
            this.fixtures = fixture;
            steps = new ExampleSteps(fixture.seleniumWrapper);
        }
        //Todo: rename steps
        //assert on page
        [Fact]
        public void Get_list_menus()
        {
            this.Given(step => fixtures.homeUrl())
                .Given(step => steps.IAmOnTheHomePage())
                .When(step => steps.IWaitForThePageToLoad())
                .Then(step => steps.TheRestaurantsMenusAreReturned())
                .BDDfy();
        }
    }
}
