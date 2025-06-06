package in.visheshsharma.billingsoftware.service;

import in.visheshsharma.billingsoftware.io.UserRequest;
import in.visheshsharma.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
