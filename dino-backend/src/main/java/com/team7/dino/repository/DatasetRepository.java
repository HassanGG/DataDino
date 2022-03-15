package com.team7.dino.repository;

import com.team7.dino.entity.Dataset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.util.List;
import java.util.UUID;

@Repository
public interface DatasetRepository extends JpaRepository<Dataset, UUID> {
    public List<Dataset> findAllById(UUID datasetId);
    public List<Dataset> findAllByArchivedFalse();
}
