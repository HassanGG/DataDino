package com.team7.dino;

import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

public class Parse {

    public static List<Integer> getNums(String encodedString) {

        if (encodedString.length() == 0) {
            return new ArrayList<>();
        }

        byte[] decode = Base64.getDecoder().decode(encodedString);
        String csv = new String(decode, StandardCharsets.UTF_8);
        return Arrays
                .stream(csv.split(","))
                .map(String::trim)
                .map(Integer::parseInt)
                .toList();
    }

    public static byte[] blobToBytes(Blob blob) throws SQLException {
        return blob.getBytes(1, (int) (blob.length()));
    }

    public static byte[] getBytesFromEncodedString(String encodedString) {
        return Base64.getDecoder().decode(encodedString);

    }

    public static List<Integer> blobToList(Blob blob) throws SQLException {
        return Arrays
                .stream(new String(blobToBytes(blob), StandardCharsets.UTF_8)
                        .split(","))
                .map(String::trim)
                .map(Integer::parseInt)
                .toList();
    }

}
