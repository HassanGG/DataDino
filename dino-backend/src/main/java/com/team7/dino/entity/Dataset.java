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
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "dataset")
public class Dataset {
    @Id
//    @GeneratedValue(generator = "UUID")
    @Type(type = "org.hibernate.type.UUIDCharType")
//    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
//    @Column(length = 36)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private double datapointPrice;

    @Column(nullable = false)
    private int datapointCount;

    @Column(nullable = false)
    private int datapointMax;

    @Column(nullable = false)
    private int datapointMin;

    @Column(nullable = false)
    private int uploadedAt;

    @Column(nullable = false)
    private Boolean archived;


//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "datasetId")
//    private Set<CartItem> cartItems;
//
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "datasetId")
//    private Set<OrderItem> orderItems;
}
