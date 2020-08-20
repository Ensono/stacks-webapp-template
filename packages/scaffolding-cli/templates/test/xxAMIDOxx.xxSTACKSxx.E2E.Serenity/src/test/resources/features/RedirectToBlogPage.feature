@Functional
  Feature: Yumido app - Redirect to 'Blog' page


  Scenario: Redirect to the blog page
    Given I open the main page
    When I click on the 'Blog' button
    Then I am redirected on the 'Blog' page
