package com.xxAMIDOxx.xxSTACKSxx.ui.pages;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.StaleElementReferenceException;

public class MainPage extends PageObject {

  private static final String SEARCH_BAR = "//*[@id='search-bar']";
  private static final String CREATE_MENU_BUTTON = "//button[@aria-label='create menu button']";
  private static final String BLOG_BUTTON = "//button[@aria-label='blogs menu button']/parent::a";
  private static final String ALL_MENUS = "//ul[@data-testid='results']";
  private static final String NO_RESULTS = "//*[@id=\"__next\"]/main/div/div[2]/h2";
  private static final String MENU_RESULTS = "//li/div/span/h2";

  @FindBy(xpath = CREATE_MENU_BUTTON)
  public WebElementFacade createMenuButton;

  @FindBy(xpath = BLOG_BUTTON)
  public WebElementFacade blogButton;

  @FindBy(xpath = ALL_MENUS)
  public WebElementFacade allMenus;

  @FindBy(xpath = NO_RESULTS)
  public WebElementFacade resultsLabel;

  @FindBy(xpath = SEARCH_BAR)
  public WebElementFacade searchBar;

  public void openMainPage() {
    open();
    waitABit(1000);
    getDriver().manage().window().maximize();
  }

  public Optional<WebElementFacade> findMenuByName(String menuName) {
    return allMenus.thenFindAll(MENU_RESULTS).stream()
        .filter(li -> li.getText().equals(menuName))
        .findFirst();
  }

  public List<WebElementFacade> findAllMenusByNameCriteria(String menuName) {
    List<WebElementFacade> listOfMenus = null;

    boolean staleElement = true;
    while (staleElement) {
      try {
        listOfMenus =
            allMenus.thenFindAll(MENU_RESULTS).stream()
                .filter(li -> li.getText().contains(menuName))
                .collect(Collectors.toList());
        staleElement = false;

      } catch (StaleElementReferenceException e) {
        staleElement = true;
      }
    }
    return listOfMenus;
  }
}
