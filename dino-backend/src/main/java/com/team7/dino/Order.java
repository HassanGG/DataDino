package com.team7.dino;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;
    @Column(name = "state", nullable = false, length = 8)
    String state;
    @Column(name = "total", nullable = false)
    private int total;
    @Column(name = "purchased_at", nullable = false, length = 50)
    private String purchasedAt;


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getPurchasedAt() {
        return purchasedAt;
    }

    public void setPurchasedAt(String purchasedAt) {
        this.purchasedAt = purchasedAt;
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

