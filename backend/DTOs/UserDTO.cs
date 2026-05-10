namespace backend.DTOs;

public record UserDTO(
    int Id,
    string Name,
    int Age,
    string City,
    string State,
    string Pincode
);