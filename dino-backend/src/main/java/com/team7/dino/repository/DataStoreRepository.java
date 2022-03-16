package com.team7.dino.repository;

import com.team7.dino.entity.DataStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DataStoreRepository extends JpaRepository<DataStore, UUID> {
    DataStore getDataStoreByDatasetId(String datasetId);
}