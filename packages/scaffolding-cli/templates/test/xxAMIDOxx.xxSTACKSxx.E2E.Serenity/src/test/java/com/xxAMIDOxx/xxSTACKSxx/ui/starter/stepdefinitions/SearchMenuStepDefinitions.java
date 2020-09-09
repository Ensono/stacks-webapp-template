package com.xxAMIDOxx.xxSTACKSxx.ui.starter.stepdefinitions;

import com.xxAMIDOxx.xxSTACKSxx.ui.pages.MainPage;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Steps;
import org.junit.Assert;

public class SearchMenuStepDefinitions {

  @Steps MainPage mainPage;

  @When("I search menu with {string} name")
  public void iSearchMenuWithName(String menuName) {
    Assert.assertTrue(mainPage.searchBar.isPresent());

    mainPage.searchBar.click();
    mainPage.searchBar.sendKeys(menuName);
    Serenity.setSessionVariable("Searched Menu Name").to(menuName);
  }

  @Then("the {string} message is displayed")
  public void theMessageIsDisplayed(String message) {
    Assert.assertTrue(mainPage.resultsLabel.isDisplayed());
    Assert.assertEquals(message, mainPage.resultsLabel.getText());
  }

  @Then("{int} menu with this search criteria are displayed")
  public void menuWithThisSearchCriteriaExists(int numberOfMenus) {
    int actualMenus =
        mainPage
            .findAllMenusByNameCriteria(
                (String) Serenity.getCurrentSession().get("Searched Menu Name"))
            .size();
    Assert.assertEquals(numberOfMenus, actualMenus);
  }
}
