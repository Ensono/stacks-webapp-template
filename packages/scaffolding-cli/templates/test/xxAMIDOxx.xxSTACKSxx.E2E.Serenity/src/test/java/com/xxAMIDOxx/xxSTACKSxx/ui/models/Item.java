package com.xxAMIDOxx.xxSTACKSxx.ui.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class Item {

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("price")
    private Double price;

    @JsonProperty("available")
    private Boolean available;

    public Item() {
    }

    public Item(String id, String name, String description, Double price, Boolean available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.available = available;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return Objects.equals(id, item.id) &&
                Objects.equals(name, item.name) &&
                Objects.equals(description, item.description) &&
                Objects.equals(price, item.price) &&
                Objects.equals(available, item.available);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, price, available);
    }
}
