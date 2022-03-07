package com.team7.dino.repository;

import com.team7.dino.entity.Dataset;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class DatasetRepositoryTest {
    @Autowired
    private DatasetRepository repository;

    @Test
    public void saveDataset() {
        Dataset dataSet = Dataset
                .builder()
                .name("Tesla")
                .description("This is a company")
                .datapointCount(12)
                .datapointCount(10000)
                .uploadedAt("2022-03-06T17:08:50Z")
                .archived(true)
                .build();

        repository.save(dataSet);
    }

    @Test
    public void printAllDatasets() {
        List<Dataset> datasets = repository.findAll();

        System.out.println("datasets = " + datasets);
    }

    @Test
    public void findAllUnarchivedDatatsets() {
        List<Dataset> datasets = repository.findAllByArchivedFalse();

        System.out.println("datasets = " + datasets);
    }
}
