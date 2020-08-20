package com.xxAMIDOxx.xxSTACKSxx.ui.fixtures;

import net.serenitybdd.core.environment.EnvironmentSpecificConfiguration;
import net.serenitybdd.rest.SerenityRest;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.SystemEnvironmentVariables;

public class Requests {
    private static EnvironmentVariables environmentVariables = SystemEnvironmentVariables.createEnvironmentVariables();

    private static String BASE_URL = EnvironmentSpecificConfiguration.from(environmentVariables).getProperty("api.base.url");
    private static String MENU_PATH = "/v1/menu";

    private static String menuUrl = BASE_URL.concat(MENU_PATH);

    public static void getMenusBySearchTerm(String searchTerm) {
        SerenityRest.get(menuUrl.concat("?searchTerm=").concat(searchTerm));
    }

    public static void deleteTheMenu(String id) {
        SerenityRest.given()
                .contentType("application/json")
                .when()
                .delete(menuUrl.concat("/").concat(id));
    }
}
