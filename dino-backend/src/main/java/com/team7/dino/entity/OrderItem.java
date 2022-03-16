package com.team7.dino.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, nullable = false, unique = true)
    private UUID orderItemId;

    @Column(name = "order_id")
    private String orderId;

    @Column(name = "dataset_id")
    private String datasetId;

    @Column(nullable = false)
    private int datapointCount;
}
