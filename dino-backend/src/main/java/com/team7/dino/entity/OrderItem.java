package com.team7.dino.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Column(nullable = false, unique = true)
    private UUID orderItemId;



    @Column(name = "order_id", insertable = false, updatable = false)
    private String orderId;
    @Column(name = "dataset_id", insertable = false, updatable = false)
    private String datasetId;

//    @ManyToOne
//    @JoinColumn(nullable = false)
//    private Order orderId;

//    @ManyToOne
//    @JoinColumn(nullable = false)
//    private Dataset datasetId;

    @Column(nullable = false)
    private int datapointCount;
}
