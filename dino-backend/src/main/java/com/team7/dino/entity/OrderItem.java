package com.team7.dino.entity;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order orderId;

    @ManyToOne
    @JoinColumn(name = "dataset_id", nullable = false)
    private Dataset datasetId;

    @Column(name = "datapoint_count", nullable = false)
    private int datapointCount;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Order getOrderId() {
        return orderId;
    }

    public void setOrderId(Order orderId) {
        this.orderId = orderId;
    }

    public Dataset getDatasetId() {
        return datasetId;
    }

    public void setDatasetId(Dataset datasetId) {
        this.datasetId = datasetId;
    }

    public int getDatapointCount() {
        return datapointCount;
    }

    public void setDatapointCount(int datapointCount) {
        this.datapointCount = datapointCount;
    }

}
