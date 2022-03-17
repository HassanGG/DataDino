package com.team7.dino.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
// @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {

    @Id
    // @GeneratedValue(generator = "UUID")
    @Type(type = "org.hibernate.type.UUIDCharType")
    // @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column
    private UUID id;

    @Column(name = "user_id")
    private String userId;

    @Column(nullable = false, length = 9)
    private String state;

    @Column(nullable = false)
    private double total;

    @Column(columnDefinition = "BIGINT(255)", nullable = false)
    private long purchasedAt;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "orderId")
    private Set<OrderItem> items;
}