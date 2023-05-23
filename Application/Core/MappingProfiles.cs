using Application.Activities;
using Application.Profile;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles:AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();
            CreateMap<Activity,ActivityDto>()
                .ForMember(x=>x.HostUsername, o=>o.MapFrom(s=>s.Attendees.FirstOrDefault(x=>x.IsHost).AppUser.UserName));
                CreateMap<ActivityAppUser,Attendees>()
                .ForMember(x=>x.DisplayName,o=>o.MapFrom(x=>x.AppUser.DisplayName))
                .ForMember(x=>x.Bio,o=>o.MapFrom(x=>x.AppUser.Bio))
                .ForMember(x=>x.UserName,o=>o.MapFrom(x=>x.AppUser.UserName));
        }        
    }
}