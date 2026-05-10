using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public record CreateUserDTO(
    [Required, MinLength(2), MaxLength(100)] string Name,
    [Required][Range(0, 120)] int Age,
    [Required] string City,
    [Required] string State,
    [Required, MinLength(4), MaxLength(10)] string Pincode
);
