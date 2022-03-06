package com.team7.dino;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

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

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
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
