package com.team7.dino.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(columnDefinition = "char(36)")
    private UUID id;

    @Column(length = 50)
    private String displayName;

    @Column(nullable = false, length = 250, unique = true)
    private String email;

    @Column(nullable = false)
    private Boolean isAdmin;

    @Column
    private String password;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "userId")
    private Set<Order> orders;

}
