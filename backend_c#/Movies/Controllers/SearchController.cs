using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TMDbLib.Client;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Search;

namespace Movies.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private IConfiguration configuration;

        public SearchController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // GET api/v1/search/movie
        [Route("movie")]
        [HttpGet]
        public ActionResult<SearchContainer<SearchMovie>> Movies([FromQuery] String query, [FromQuery] int page)
        {
            String apiKey = configuration.GetValue<String>("api:api_key");
            TMDbClient client = new TMDbClient(apiKey);
            Task<SearchContainer<SearchMovie>> task = client.SearchMovieAsync(query, page, true);
            return task.Result;
        }
    }
}