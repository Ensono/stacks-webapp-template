package com.xxAMIDOxx.xxSTACKSxx.ui.starter.stepdefinitions;

import com.xxAMIDOxx.xxSTACKSxx.ui.fixtures.GenericPageSteps;
import com.xxAMIDOxx.xxSTACKSxx.ui.fixtures.Hooks;
import com.xxAMIDOxx.xxSTACKSxx.ui.pages.BlogPage;
import com.xxAMIDOxx.xxSTACKSxx.ui.pages.CreateMenuPage;
import com.xxAMIDOxx.xxSTACKSxx.ui.pages.MainPage;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Steps;
import org.junit.Assert;

public class CreateMenuStepDefinitions {

  @Steps GenericPageSteps genericPageSteps;

  @Steps MainPage mainPage;

  @Steps BlogPage blogPage;

  @Steps CreateMenuPage createMenuPage;

  private static boolean firstTestRun = false;

  @Before
  public static void beforeAll() {
    if (!firstTestRun) {
      System.out.println("Delete all data from the previous automated test");
      Hooks.deleteAllMenusFromPreviousRun();
      firstTestRun = true;
    }
  }

  @Given("^I open the main page$")
  public void iOpenNewPage() {
    genericPageSteps.iAmOnTheMainPage();
  }

  @When("I click on the 'Blog' button")
  public void iClickOnTheButton() {
    mainPage.blogButton.click();
  }

  @Then("I am redirected on the 'Blog' page")
  public void iAmRedirectedOnThePage() {
    Assert.assertTrue(blogPage.blogTitle.isDisplayed());
    Assert.assertEquals("Yumido Blog", blogPage.blogTitle().getText());
  }

  @When("I click on the 'Create menu' button")
  public void iClickOnTheCreateButton() {
    mainPage.createMenuButton.click();
  }

  @When("I click on the 'Cancel' button")
  public void iClickOnTheCancelButton() {
    createMenuPage.cancelButton.click();
  }

  @Then("I am redirected on the 'Create menu' page")
  public void iAmRedirectedOnTheCreatePage() {
    Assert.assertTrue(createMenuPage.createNewMenuTitle.isDisplayed());
    Assert.assertEquals("Create new menu", createMenuPage.createNewMenuTitle.getText());
  }

  @When("I click on the 'Save' button")
  public void iClickOnTheSaveButton() {
    createMenuPage.saveButton.click();
  }

  @When("I fill the following fields")
  public void fillTheFollowingFields(List<Map<String, String>> menuData) {
    genericPageSteps.fillAllCreateMenuFields(menuData);
  }

  @When("I fill the following fields again")
  public void fillTheFields(List<Map<String, String>> menuData) {
    fillTheFollowingFields(menuData);
  }

  @Then("the new menu is created")
  public void theNewMenuIsCreated() {
    checkTheCreateMenuAlert("menu created");
  }

  @Then("the {string} alert is displayed")
  public void checkTheCreateMenuAlert(String alertMessage) {
    Assert.assertTrue(createMenuPage.createNewMenuTitle.isPresent());
    if (createMenuPage.createMenuAlert.isPresent()) {
      Assert.assertTrue(createMenuPage.createMenuAlert.getText().contains(alertMessage));
    }
  }

  @Then("the menu with {string} name is displayed and has {string} status")
  public void theNewCreatedMenuIsDisplayedWithFollowingData(String menuName, String status) {
    Optional<WebElementFacade> currentMenu = mainPage.findMenuByName(menuName);
    boolean menuExists = currentMenu.isPresent();
    String parentPath = "../../..";

    if (menuExists) {
      if (status.equalsIgnoreCase("disabled")) {
        Assert.assertNotEquals(
            null, currentMenu.get().thenFind(parentPath).getAttribute("disabled"));
      } else {
        Assert.assertNull(currentMenu.get().thenFind(parentPath).getAttribute("disabled"));
      }
    }
  }

  @Then("the menu with {string} name is not created")
  public void theMenuWithNameIsNotCreated(String menuName) {
    Optional<WebElementFacade> currentMenu = mainPage.findMenuByName(menuName);
    Assert.assertFalse(currentMenu.isPresent());
  }
}
