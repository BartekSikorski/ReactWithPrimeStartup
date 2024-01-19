using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactWithPrimeStarter.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        [HttpGet(Name = "GetProducts")]
        public IEnumerable<Product> Get()
        {
            return Enumerable.Range(1, 10).Select(index => new Product
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Id = Random.Shared.Next(-20, 55),
                Name = $"Nazwa {index}"
            })
            .ToArray();
        }
    }
}
