package com.team7.dino.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(generator = "UUID")
    @Type(type = "org.hibernate.type.UUIDCharType")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "char(36)")
    private UUID cartItemId;

    @ManyToOne
    @JoinColumn(referencedColumnName = "userId", nullable = false)
    private User userId;

    @ManyToOne
    @JoinColumn(referencedColumnName = "datasetId", nullable = false)
    private Dataset datasetId;

    @Column(nullable = false)
    private int datapointCount;
}