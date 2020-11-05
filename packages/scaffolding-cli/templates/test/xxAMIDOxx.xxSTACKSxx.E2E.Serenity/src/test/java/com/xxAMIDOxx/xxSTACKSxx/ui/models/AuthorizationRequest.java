package com.xxAMIDOxx.xxSTACKSxx.ui.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthorizationRequest {

  @JsonProperty("client_id")
  private String clientId;

  @JsonProperty("client_secret")
  private String clientSecret;

  @JsonProperty("audience")
  private String audience;

  @JsonProperty("grant_type")
  private String grantType;

  public AuthorizationRequest(
      String clientId, String clientSecret, String audience, String grantType) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.audience = audience;
    this.grantType = grantType;
  }

  public String getClientId() {
    return clientId;
  }

  public String getClientSecret() {
    return clientSecret;
  }

  public String getAudience() {
    return audience;
  }

  public String getGrantType() {
    return grantType;
  }
}
