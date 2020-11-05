package com.xxAMIDOxx.xxSTACKSxx.ui.fixtures;

import static net.serenitybdd.rest.SerenityRest.lastResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xxAMIDOxx.xxSTACKSxx.ui.models.AuthorizationRequest;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.environment.EnvironmentSpecificConfiguration;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.SystemEnvironmentVariables;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuthorizationRequestActions {

  private static final Logger LOGGER = LoggerFactory.getLogger(AuthorizationRequestActions.class);
  private static final ObjectMapper objectMapper = new ObjectMapper();

  private static String client_id = OAuthConfigurations.CLIENT_ID.getOauthConfiguration();
  private static String client_secret = OAuthConfigurations.CLIENT_SECRET.getOauthConfiguration();
  private static String audience = OAuthConfigurations.AUDIENCE.getOauthConfiguration();
  private static String grant_type = OAuthConfigurations.GRANT_TYPE.getOauthConfiguration();
  private static EnvironmentVariables environmentVariables =
      SystemEnvironmentVariables.createEnvironmentVariables();
  private static String generateAuthorisation =
      EnvironmentSpecificConfiguration.from(environmentVariables)
          .getProperty("generate.auth0.token");
  private static String authBody;

  static {
    try {
      authBody =
          objectMapper.writeValueAsString(
              new AuthorizationRequest(client_id, client_secret, audience, grant_type));
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
  }

  public static void getAuthToken() {
    boolean generateToken = Boolean.parseBoolean(generateAuthorisation);

    if (generateToken) {
      Requests.getAuthorizationToken(authBody);
      String accessToken = lastResponse().jsonPath().get("access_token").toString();
      Serenity.setSessionVariable("Access Token").to(accessToken);

      if (accessToken.isEmpty()) {
        LOGGER.error("The access token could not be obtained");
      }
    } else {
      Serenity.setSessionVariable("Access Token").to("");
    }
  }
}
