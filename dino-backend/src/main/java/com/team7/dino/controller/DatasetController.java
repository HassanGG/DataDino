package com.team7.dino.controller;

import com.team7.dino.entity.Dataset;
import com.team7.dino.repository.DatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class DatasetController {
    @Autowired
    private DatasetRepository repository;

    @RequestMapping(value="/datasets", method=GET)
    @ResponseBody
    private List<Dataset> getAllDatasets() {
        return repository.findAll();
    }

    @RequestMapping(value="/datasets{id}", method=GET)
    @ResponseBody
    private Optional<Dataset> getDatasetById(@PathVariable String id) {
        id = id.substring(1, id.length() - 1);
        return repository.findById(UUID.fromString(id));
    }
}
