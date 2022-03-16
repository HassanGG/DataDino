package com.team7.dino.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.team7.dino.Parse;
import com.team7.dino.entity.DataStore;
import com.team7.dino.entity.Dataset;
import com.team7.dino.repository.DataStoreRepository;
import com.team7.dino.repository.DatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.SQLException;
import java.util.*;
import java.util.function.BiFunction;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@CrossOrigin
@RequestMapping("/dino-backend/datasets")
@Controller
public class DatasetController {
    private final BiFunction<JsonNode, String, String> removeQuotes = (jsonObj, str) -> jsonObj
            .get(str)
            .toString()
            .replace("\"", "");
    @Autowired
    private DatasetRepository repository;
    @Autowired
    private DataStoreRepository repoData;

    @RequestMapping(value = "", method = GET)
    @ResponseBody
    private ResponseEntity<List<Dataset>> getAllDatasets() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = GET)
    @ResponseBody
    private ResponseEntity<Dataset> getDatasetById(@PathVariable String id) {
        Optional<Dataset> dataset = repository.findById(UUID.fromString(id));

        if (dataset.isEmpty()) {
            new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(dataset.get(), HttpStatus.OK);
    }

    @PostMapping("")
    @ResponseBody
    private ResponseEntity<String> saveDataset(@RequestBody JsonNode json) throws SQLException {
        if (!json.hasNonNull("file") || removeQuotes.apply(json, "file").isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Integer> nums = Parse.getNums(removeQuotes.apply(json, "file"));

        Dataset dataset = Dataset
                .builder()
                .id(UUID.randomUUID())
                .name(json.get("name").toString().substring(1, json.get("name").toString().length() - 1))
                .archived(json.get("archived").asBoolean())
                .datapointPrice(json.get("datapointPrice").asDouble())
                .datapointCount(nums.toArray().length)
                .uploadedAt(json.get("uploadedAt").asLong())
                .datapointMax(nums.stream().max(Integer::compare).orElseGet(() -> 0)) // TODO: possible fuckup
                .datapointMin(nums.stream().min(Integer::compare).orElseGet(() -> 0))
                .build();

        if (json.hasNonNull("description")) {
            dataset.setDescription(removeQuotes.apply(json, "description"));
        }

        DataStore data = DataStore
                .builder()
                .datasetId(dataset.getId().toString())
                .data(new SerialBlob(Parse.getBytesFromEncodedString(removeQuotes.apply(json, "file"))))
                .build();

        repository.save(dataset);
        repoData.save(data);

        return new ResponseEntity<String>(dataset.getId().toString(), HttpStatus.OK);
    }

    @GetMapping("/{id}/data")
    @ResponseBody
    private ResponseEntity<List<Integer>> getDataByCount(
            @RequestParam(name = "datapointCount") Optional<Integer> datapointCount,
            @PathVariable(name = "id") String id) throws SQLException {
        DataStore datastore;
        try {
            datastore = repoData.getDataStoreByDatasetId(id);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Integer> nums = Parse.blobToList(datastore.getData());
        if (datapointCount.isEmpty()) {
            return new ResponseEntity<List<Integer>>(nums, HttpStatus.OK);
        }

        if (nums.size() <= datapointCount.get()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ArrayList<Integer> items = new ArrayList<>(nums);
        Collections.shuffle(items);
        List<Integer> data = items.subList(0, datapointCount.get());
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    private ResponseEntity<String> patchDataset(@RequestBody JsonNode json, @PathVariable(name = "id") String id)
            throws SQLException {
        if (!repository.existsById(UUID.fromString(id))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Dataset dataset = repository.getById(UUID.fromString(id));
        if (json.hasNonNull("name")) {
            dataset.setName(removeQuotes.apply(json, "name"));
        }

        if (json.hasNonNull("description")) {
            dataset.setDescription(removeQuotes.apply(json, "description"));
        }

        if (json.hasNonNull("datapointPrice")) {
            dataset.setDatapointPrice(json.get("datapointPrice").asInt());
        }

        if (json.hasNonNull("archived")) {
            dataset.setArchived(json.get("archived").asBoolean());
        }

        // DataStore dataStore = repoData.getDataStoreByDatasetId(id);
        // if (json.hasNonNull("file")) {
        // dataStore.setData(new
        // SerialBlob(Parse.getBytesFromEncodedString(removeQuotes.apply(json,
        // "file"))));
        // }

        repository.save(dataset);
        // repoData.save(dataStore);

        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
