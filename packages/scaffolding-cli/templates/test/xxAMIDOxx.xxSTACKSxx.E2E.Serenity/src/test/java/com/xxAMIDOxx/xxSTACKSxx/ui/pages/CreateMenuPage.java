package com.xxAMIDOxx.xxSTACKSxx.ui.pages;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class CreateMenuPage extends PageObject {

  public static final String CANCEL_BUTTON = "//button[@data-testid='cancel_btn']";
  public static final String SAVE_BUTTON = "//button[@data-testid='save_btn']";
  public static final String CREATE_NEW_MENU = "//*[@id=\"__next\"]/main/div/main/div/h3";
  public static final String HOME_BUTTON = "//*[@id=\"__next\"]/main/div/header/div/h2/a";

  @FindBy(id = "name")
  public WebElement menuNameFiled;

  @FindBy(id = "description")
  public WebElement menuDescriptionField;

  @FindBy(xpath = "//*[@id=\"snackbar-message-id\"]")
  public WebElementFacade createMenuAlert;

  @FindBy(xpath = ".//*[@name='enabled']/parent::span")
  public WebElementFacade activateCheckbox;

  @FindBy(xpath = CANCEL_BUTTON)
  public WebElementFacade cancelButton;

  @FindBy(xpath = HOME_BUTTON)
  public WebElementFacade homeButton;

  @FindBy(xpath = SAVE_BUTTON)
  public WebElementFacade saveButton;

  @FindBy(xpath = CREATE_NEW_MENU)
  public WebElementFacade createNewMenuTitle;

  public void setActivateCheckbox(String activateCheckbox) {
    WebElementFacade activateChkBxInput = this.activateCheckbox.find(By.name("enabled"));
    if (Boolean.parseBoolean(activateCheckbox)) {
      this.activateCheckbox.click();
      Assert.assertTrue(activateChkBxInput.isSelected());
    } else {
      Assert.assertFalse(activateChkBxInput.isSelected());
    }
  }
}
