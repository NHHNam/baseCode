using Aiking.Dtos;
using Aiking.Models;
using AutoMapper;

namespace Aiking.Mapper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() 
        {
            CreateMap<Payment, PaymentDto>().ReverseMap();
            CreateMap<Post, PostDto>().ReverseMap();
        }
    }
}
