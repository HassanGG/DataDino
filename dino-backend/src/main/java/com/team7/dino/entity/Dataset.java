package com.team7.dino.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "dataset")
public class Dataset {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", length = 1000)
    private String description;
    @Column(name = "datapoint_price", nullable = false)
    private int datapointPrice;
    @Column(name = "datapoint_count", nullable = false)
    private int datapointCount;
    @Column(name = "uploaded_at", nullable = false, length = 50)
    private String uploadedAt;
    @Column(name = "archived", nullable = false)
    private Boolean Archived;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDatapointPrice() {
        return datapointPrice;
    }

    public void setDatapointPrice(int datapointPrice) {
        this.datapointPrice = datapointPrice;
    }

    public int getDatapointCount() {
        return datapointCount;
    }

    public void setDatapointCount(int datapointCount) {
        this.datapointCount = datapointCount;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(String uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Boolean getArchived() {
        return Archived;
    }

    public void setArchived(Boolean archived) {
        Archived = archived;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
