@Functional
Feature: Yumido app - Create a new menu

  @Smoke
  Scenario: Create a new active menu
    Given I open the main page
    When I click on the 'Create menu' button
    Then I am redirected on the 'Create menu' page
    When I fill the following fields
      | Menu Name                               | Description                 | Activate |
      | Andy's Pizza Menu (Automated Test Data) | The best pizza in your town | true     |
    And I click on the 'Save' button
    Then the new menu is created
    When I open the main page
    And I search menu with "Andy's Pizza Menu (Automated Test Data)" name
    Then 1 menu with this search criteria are displayed
    Then the menu with "Andy's Pizza Menu (Automated Test Data)" name is displayed and has "enabled" status


  Scenario: Create 2 menus with the same data
    Given I open the main page
    When I click on the 'Create menu' button
    Then I am redirected on the 'Create menu' page
    When I fill the following fields
      | Menu Name                         | Description                               | Activate |
      | Salads Only (Automated Test Data) | This menu contains only vegetarian salads | true     |
    And I click on the 'Save' button
    Then the new menu is created
    When I fill the following fields again
      | Menu Name                         | Description                               | Activate |
      | Salads Only (Automated Test Data) | This menu contains only vegetarian salads | true     |
    And I click on the 'Save' button
    Then the "New menu creation failed" alert is displayed
    When I open the main page
    And I search menu with "Salads Only (Automated Test Data)" name
    Then 1 menu with this search criteria are displayed


  Scenario: Create a new menu with disabled status
    Given I open the main page
    When I click on the 'Create menu' button
    Then I am redirected on the 'Create menu' page
    When I fill the following fields
      | Menu Name                             | Description                           | Activate |
      | Vegetarian Menu (Automated Test Data) | The best vegetarian food in your town | false    |
    And I click on the 'Save' button
    Then the new menu is created
    When I open the main page
    And I search menu with "Vegetarian Menu (Automated Test Data)" name
    Then 1 menu with this search criteria are displayed
    And the menu with "Vegetarian Menu (Automated Test Data)" name is displayed and has "disabled" status


  Scenario: Cancel the menu creation
    Given I open the main page
    When I click on the 'Create menu' button
    Then I am redirected on the 'Create menu' page
    When I fill the following fields
      | Menu Name                     | Description  | Activate |
      | Seafood (Automated Test Data) | Seafood only | false    |
    When I click on the 'Cancel' button
    Then the menu with "Seafood (Automated Test Data)" name is not created
