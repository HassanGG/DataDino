package com.team7.dino.repository;

import com.team7.dino.entity.DataStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Blob;
import java.util.UUID;

public interface DataStoreRepository extends JpaRepository<DataStore, UUID> {
//    Blob[] getDataByDatasetId(String datasetId);
//    public DataStore getDataStoreByDatasetId(String datasetId);
    public DataStore getDataStoreByDatasetId(String datasetId);

//    String getDataByDatasetId(String datasetId);
}