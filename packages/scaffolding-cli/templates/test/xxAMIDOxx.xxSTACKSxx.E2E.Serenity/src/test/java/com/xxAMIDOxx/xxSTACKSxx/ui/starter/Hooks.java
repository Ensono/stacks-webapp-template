package com.xxAMIDOxx.xxSTACKSxx.ui.starter;

import static net.serenitybdd.rest.SerenityRest.lastResponse;
import static net.serenitybdd.rest.SerenityRest.restAssuredThat;

import com.xxAMIDOxx.xxSTACKSxx.ui.fixtures.AuthorizationRequestActions;
import com.xxAMIDOxx.xxSTACKSxx.ui.fixtures.Requests;
import com.xxAMIDOxx.xxSTACKSxx.ui.models.Menu;
import com.xxAMIDOxx.xxSTACKSxx.ui.models.ResponseWrapper;
import io.cucumber.java.Before;
import java.util.List;
import net.serenitybdd.core.Serenity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Hooks {

  private static final Logger LOGGER = LoggerFactory.getLogger(Hooks.class);
  private static boolean firstTestRun = false;

  @Before
  public static void beforeAll() {
    if (!firstTestRun) {
      LOGGER.info("Get the Authorization Token");
      if (Serenity.getCurrentSession().get("Access Token") == null) {
        AuthorizationRequestActions.getAuthToken();
      }
      LOGGER.info("Delete all data from previous automated tests:");
      deleteAllMenusFromPreviousRun();
      firstTestRun = true;
    }
  }

  public static void deleteAllMenusFromPreviousRun() {
    Requests.getMenusBySearchTerm("(Automated Test Data)");
    ResponseWrapper responseWrapper = lastResponse().body().as(ResponseWrapper.class);
    List<Menu> listOfMenusToDelete = responseWrapper.getResults();

    for (Menu currentMenu : listOfMenusToDelete) {
      Requests.deleteTheMenu(currentMenu.getId());
      restAssuredThat(response -> response.statusCode(200));

      LOGGER.info(
          String.format("The menu with '%s' id was successfully deleted.", currentMenu.getId()));
    }
  }
}
