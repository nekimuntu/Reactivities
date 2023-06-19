using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities(CancellationToken ct)
        {
            return HandleResult(await Mediator.Send(new List.Query(),ct));
        }
       
        [HttpGet("{id}")] //api/activities/?id
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
           
        }
                        ///Another way to send errors... just leaving the individuals Controllers handle it \\\
        //  [HttpGet("{id}")] //api/activities/?id
        // public async Task<IActionResult> GetActivity(Guid id)
        // {
        //     var result= await Mediator.Send(new Details.Query{Id = id});
        //     if(result.IsSucces && result.Value !=null)
        //         return Ok(result.Value);
        //     if(result.IsSucces && result.Value ==null)
        //         return NotFound();
        //     return BadRequest(result.Error);
        // }
        [HttpPost] //api/activities/
        public async Task<IActionResult> CreateActivity(Activity _activity)
        {
           return HandleResult( await Mediator.Send(new Create.Command{
                activity=_activity
            }));
        }

        [Authorize(Policy = "IsActivityPolicy")]
        [HttpPut("{id}")] //api/activities/?id
        public async Task<IActionResult> EditActivity(Guid id, Activity _activity)
        {
            _activity.Id=id;
            return HandleResult( await Mediator.Send(new Edit.Command{                
                activity=_activity
            }));
        }

        [Authorize(Policy = "IsActivityPolicy")]
        [HttpDelete("{id}")] //api/activities/
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
           return HandleResult( await Mediator.Send(new Remove.Command{
                Id=id
            }));
        }

        
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id=id}));
        }
    }
}