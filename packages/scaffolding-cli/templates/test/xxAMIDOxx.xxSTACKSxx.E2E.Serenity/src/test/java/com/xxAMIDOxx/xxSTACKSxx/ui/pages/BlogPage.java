package com.xxAMIDOxx.xxSTACKSxx.ui.pages;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import org.openqa.selenium.WebElement;

public class BlogPage extends PageObject {

    private static final String BLOG_TITLE = "//h2[@data-testid='blog_title']";

    @FindBy(xpath = BLOG_TITLE)
    public WebElement blogTitle;

    public WebElement blogTitle() {
        return blogTitle;
    }
}
