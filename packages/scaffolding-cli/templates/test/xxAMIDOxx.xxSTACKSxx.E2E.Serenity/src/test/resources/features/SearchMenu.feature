@Functional
Feature: Yumido app - Search the menu


  Scenario: Search non-existent menu
    Given I open the main page
    When I search menu with "This menu does not exist" name
    Then the "No results" message is displayed

  @Smoke
  Scenario: Search an existent menu
    Given I open the main page
    When I click on the 'Create menu' button
    Then I am redirected on the 'Create menu' page
    When I fill the following fields
      | Menu Name                                       | Description                 | Activate |
      | Traditional Romanian food (Automated Test Data) | Traditional Romanian plated | true     |
    And I click on the 'Save' button
    Then the new menu is created

    When I open the main page
    And I search menu with "Traditional Romanian food (Automated Test Data)" name
    Then 1 menu with this search criteria are displayed

  @Smoke
  Scenario: Search an existing menu - partial menu name match
    Given I open the main page
    When I click on the 'Create menu' button
    Then I am redirected on the 'Create menu' page
    When I fill the following fields
      | Menu Name                                 | Description                       | Activate |
      | Chinese Main Course (Automated Test Data) | So delicious Chinese main courses | true     |
    And I click on the 'Save' button
    Then the new menu is created
    When I fill the following fields
      | Menu Name                              | Description                            | Activate |
      | Chinese Desserts (Automated Test Data) | The best Chinese desserts in your town | true     |
    And I click on the 'Save' button
    Then the new menu is created

    When I open the main page
    And I search menu with "Chinese" name
    Then 2 menu with this search criteria are displayed
