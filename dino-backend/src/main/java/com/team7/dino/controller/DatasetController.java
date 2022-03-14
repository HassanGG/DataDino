package com.team7.dino.controller;

import com.team7.dino.entity.Dataset;
import com.team7.dino.repository.DatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class DatasetController {
    @Autowired
    private DatasetRepository repository;

    @RequestMapping(value="/dino-backend/datasets", method=GET)
    @ResponseBody
    private List<Dataset> getAllDatasets() {
        return repository.findAll();
    }

    @RequestMapping(value="/dino-backend/datasets/{id}", method=GET)
    @ResponseBody
    private Optional<Dataset> getDatasetById(@PathVariable String id) {
        return repository.findById(UUID.fromString(id));
    }

    // TODO: error checking
    // TODO: set time
    @PostMapping("/dino-backend/datasets")
    @ResponseBody
    private void saveDataset(@RequestBody Dataset dataset) {
        repository.save(dataset);
    }

    // TODO: error checking
    //TODO: change datasetID
    //TODO: partial object parameter patching
    @PatchMapping("/dino-backend/datasets")
    @ResponseBody
    private void patchDataset(@RequestBody Dataset dataset) {
        if(repository.existsById(dataset.getDatasetId())) {
            repository.deleteById(dataset.getDatasetId());
        }
        repository.save(dataset);
    }

}
