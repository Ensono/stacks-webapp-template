package com.xxAMIDOxx.xxSTACKSxx.ui.starter;

import com.xxAMIDOxx.xxSTACKSxx.ui.fixtures.Hooks;
import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        plugin = {"pretty"},
        features = "src/test/resources/features",
        tags = "(not @Ignore) and (@Smoke or @Functional)"

)
public class CucumberTestSuiteUI {

    @BeforeClass
    public static void setup() {
        System.out.println("Delete all data from the previous automated test");
        Hooks.deleteAllMenusFromPreviousRun();
    }
}
