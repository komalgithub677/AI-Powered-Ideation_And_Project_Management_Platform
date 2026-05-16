package com.rbac.auth.mapper;

import org.mapstruct.Mapper;

import com.rbac.auth.dto.LoginResponse;
import com.rbac.auth.dto.RegisterRequest;
import com.rbac.auth.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterRequest request);

    LoginResponse toLoginResponse(User user, String token);
}
