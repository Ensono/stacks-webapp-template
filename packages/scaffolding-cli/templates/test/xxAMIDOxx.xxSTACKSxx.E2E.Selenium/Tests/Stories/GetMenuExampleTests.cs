using TestStack.BDDfy;
using Xunit;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Fixtures;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Steps;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Stories
{
  [Story(
      AsA = "an exisiting restaurant on Yumido",
      IWant = "to create a new menu",
      SoThat = "hungry customers can view my offerings")]

  public class GetMenuExampleTests : IClassFixture<BaseSetup>
  {
    private readonly BaseSetup fixtures;
    private readonly CreateMenu steps;

    public GetMenuExampleTests(BaseSetup fixture)
    {
      this.fixtures = fixture;
      steps = new CreateMenu(fixture.seleniumWrapper);
    }

    [Fact]
    public void CreateNewMenu()
    {
      this.Given(step => fixtures.Home())
          .Given(step => steps.ARestaurantWithMenus())
          .When(step => steps.ICreateANewMenu())
          .Then(step => steps.TheResturantShouldHaveANewMenu())
          .BDDfy();
    }
  }
}
