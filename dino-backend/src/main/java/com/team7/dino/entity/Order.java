package com.team7.dino.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
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
public class Order {

    @Id
    @GeneratedValue(generator = "UUID")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "char(36)")
    private UUID orderId;

    @ManyToOne()
    @JoinColumn(nullable = false)
    private User userId;

    @Column(nullable = false, length = 8)
    private String state;

    @Column(nullable = false)
    private int total;

    @Column(nullable = false, length = 50)
    private String purchasedAt;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "orderId")
    private Set<OrderItem> orderItems;
}