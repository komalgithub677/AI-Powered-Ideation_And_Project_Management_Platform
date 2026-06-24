package com.rbac.auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.rbac.auth.dto.LoginResponse;
import com.rbac.auth.dto.RegisterRequest;
import com.rbac.auth.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterRequest request);

    @Mapping(target = "token", source = "token")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", source = "user.role")
    LoginResponse toLoginResponse(User user, String token);
}