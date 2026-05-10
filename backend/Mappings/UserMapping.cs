using backend.DTOs;
using backend.Entities;

namespace backend.Mappings;

// This class can be used to define mapping between User and UserDTO
public static class UserMapping
{
    public static UserDTO ToDTO(this User user)
    {
        return new UserDTO(user.Id, user.Name, user.Age, user.City, user.State, user.Pincode);
    }
    public static User ToEntity(this CreateUserDTO createUserDTO, int id = 0)
    {
        return new User
        {
            Id = id,
            Name = createUserDTO.Name,
            Age = createUserDTO.Age,
            City = createUserDTO.City,
            State = createUserDTO.State,
            Pincode = createUserDTO.Pincode
        };
    }
}