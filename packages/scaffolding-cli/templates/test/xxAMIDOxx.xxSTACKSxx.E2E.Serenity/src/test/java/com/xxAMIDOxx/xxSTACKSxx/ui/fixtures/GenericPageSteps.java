package com.xxAMIDOxx.xxSTACKSxx.ui.fixtures;

import com.xxAMIDOxx.xxSTACKSxx.ui.pages.CreateMenuPage;
import com.xxAMIDOxx.xxSTACKSxx.ui.pages.MainPage;
import java.util.List;
import java.util.Map;

public class GenericPageSteps {

  protected MainPage mainPage;
  protected CreateMenuPage createMenuPage;

  public void iAmOnTheMainPage() {
    mainPage.openMainPage();
  }

  public void fillAllCreateMenuFields(List<Map<String, String>> menuData) {
    createMenuPage.menuNameFiled.sendKeys(menuData.get(0).get("Menu Name"));
    createMenuPage.menuDescriptionField.sendKeys(menuData.get(0).get("Description"));
    createMenuPage.setActivateCheckbox(menuData.get(0).get("Activate"));
  }
}
