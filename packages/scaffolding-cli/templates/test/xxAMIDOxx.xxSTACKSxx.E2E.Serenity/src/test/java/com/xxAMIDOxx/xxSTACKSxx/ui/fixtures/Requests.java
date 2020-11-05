package com.xxAMIDOxx.xxSTACKSxx.ui.fixtures;

import java.util.HashMap;
import java.util.Map;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.environment.EnvironmentSpecificConfiguration;
import net.serenitybdd.rest.SerenityRest;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.SystemEnvironmentVariables;

public class Requests {

  private static EnvironmentVariables environmentVariables =
      SystemEnvironmentVariables.createEnvironmentVariables();

  private static String generateAuthorisation =
      EnvironmentSpecificConfiguration.from(environmentVariables)
          .getProperty("generate.auth0.token");

  boolean generateToken = Boolean.parseBoolean(generateAuthorisation);

  private static final Map<String, String> commonHeaders = new HashMap<>();

  private static String OAUTH_TOKEN_URL =
      OAuthConfigurations.OAUTH_TOKEN_URL.getOauthConfiguration();

  private static String authorizationToken;

  private static String BASE_URL =
      ((System.getenv("BASE_URL") != null))
          ? System.getenv("BASE_URL")
          : EnvironmentSpecificConfiguration.from(environmentVariables).getProperty("api.base.url");

  private static String MENU_PATH = "/v1/menu";

  private static String menuUrl = BASE_URL.concat(MENU_PATH);

  public Requests() {
    authorizationToken = String.valueOf(Serenity.getCurrentSession().get("Access Token"));

    if (generateToken) {
      commonHeaders.put("Authorization", "Bearer " + authorizationToken);
    }
  }

  public static void getAuthorizationToken(String body) {
    SerenityRest.given().contentType("application/json").body(body).when().post(OAUTH_TOKEN_URL);
  }

  private static String retrieveAccessTokenFromSerenity() {
    return String.valueOf(Serenity.getCurrentSession().get("Access Token"));
  }

  public static void getMenusBySearchTerm(String searchTerm) {
    SerenityRest.given()
        .header("Authorization", "Bearer " + retrieveAccessTokenFromSerenity())
        .when()
        .get(menuUrl.concat("?searchTerm=").concat(searchTerm));
  }

  public static void deleteTheMenu(String id) {
    SerenityRest.given()
        .header("Authorization", "Bearer " + retrieveAccessTokenFromSerenity())
        .when()
        .delete(menuUrl.concat("/").concat(id));
  }
}
