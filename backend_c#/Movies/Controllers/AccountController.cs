using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TMDbLib.Client;
using TMDbLib.Objects.Authentication;
using TMDbLib.Objects.Account;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Search;

namespace Movies.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration configuration;

        public AccountController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

       
        public TMDbClient GetTMDbClient()
        {
            String apiKey = configuration.GetValue<String>("api:api_key");
            String username = configuration.GetValue<String>("api:username");
            String password = configuration.GetValue<String>("api:password");

          

            TMDbClient client = new TMDbClient(apiKey);
            Token token = client.AuthenticationRequestAutenticationTokenAsync().Result;
          
            Task task = client.AuthenticationValidateUserTokenAsync(token.RequestToken, username, password);
            task.GetAwaiter().GetResult();

            UserSession session = client.AuthenticationGetUserSessionAsync(token.RequestToken).Result;
            client.SetSessionInformation(session.SessionId, SessionType.UserSession);

            return client;

        }

        [Route("favourites/{page}")]
        [HttpGet]
        public ActionResult<SearchContainer<SearchMovie>> getFavourites(int page) {
            TMDbClient client = GetTMDbClient();
            return client.AccountGetFavoriteMoviesAsync(page, AccountSortBy.CreatedAt).Result;
        }

        [Route("watchlist/{page}")]
        [HttpGet]
        public ActionResult<SearchContainer<SearchMovie>> getWatchList(int page)
        {
            TMDbClient client = GetTMDbClient();
            return client.AccountGetMovieWatchlistAsync(page, AccountSortBy.CreatedAt).Result;
        }

        [Route("favourites")]
        [HttpPost]
        public void addToFavorite([FromBody] int media_id) {
            TMDbClient client = GetTMDbClient();
            bool completed  = client.AccountChangeFavoriteStatusAsync(MediaType.Movie, media_id, true).Result;
        }

        [Route("watchlist")]
        [HttpPost]
        public void addToWatchList([FromBody] int media_id)
        {
            TMDbClient client = GetTMDbClient();
            bool completed = client.AccountChangeWatchlistStatusAsync(MediaType.Movie, media_id, true).Result;
        }
    }
}