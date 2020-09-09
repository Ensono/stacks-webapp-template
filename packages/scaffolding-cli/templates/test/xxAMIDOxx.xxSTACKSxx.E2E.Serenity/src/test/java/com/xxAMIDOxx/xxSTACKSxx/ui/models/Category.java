package com.xxAMIDOxx.xxSTACKSxx.ui.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Category {

  @JsonProperty("id")
  private String id;

  @JsonProperty("name")
  private String name;

  @JsonProperty("description")
  private String description;

  @JsonProperty("items")
  private List<Item> items = new ArrayList<>();

  public Category() {}

  public Category(String id, String name, String description, List<Item> items) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.items = items;
  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public List<Item> getItems() {
    return items;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Category category = (Category) o;
    return Objects.equals(id, category.id)
        && Objects.equals(name, category.name)
        && Objects.equals(description, category.description)
        && Objects.equals(items, category.items);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, description, items);
  }
}
