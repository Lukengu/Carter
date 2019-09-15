package com.heycarter.movies.rest;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.heycarter.movies.ApiConfig;
import com.uwetrottmann.tmdb2.Tmdb;
import com.uwetrottmann.tmdb2.entities.Account;
import com.uwetrottmann.tmdb2.entities.FavoriteMedia;
import com.uwetrottmann.tmdb2.entities.MovieResultsPage;
import com.uwetrottmann.tmdb2.entities.RequestToken;
import com.uwetrottmann.tmdb2.entities.Session;
import com.uwetrottmann.tmdb2.entities.Status;
import com.uwetrottmann.tmdb2.entities.WatchlistMedia;
import com.uwetrottmann.tmdb2.enumerations.SortBy;
import com.uwetrottmann.tmdb2.services.AccountService;
import com.uwetrottmann.tmdb2.services.AuthenticationService;

import retrofit2.Response;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {
	@Autowired
	ApiConfig apiConfig;

	private String getSessionId() throws IOException {
		Tmdb tmdb = new Tmdb(apiConfig.getApi_key());
	
		if (!tmdb.isLoggedIn()) {

			// tmdb.clearSessions();
			AuthenticationService authService = tmdb.authenticationService();

			Response<RequestToken> response = authService.requestToken().execute();
			if (response.isSuccessful()) {
				String request_token = response.body().request_token;
				String auth_token = authService
						.validateToken(apiConfig.getUsername(), apiConfig.getPassword(), request_token).execute()
						.body().request_token;
				Session session = authService.createSession(auth_token).execute().body();
				return session.session_id;
			}

			return "";
		} else {
			return tmdb.getSessionId();
		}

	}

	@PostMapping("favourites")
	public ResponseEntity<Status> markFavorite(@RequestBody FavoriteMedia favorite) throws IOException {
		
		System.out.println(favorite.favorite);
		
		Tmdb tmdb = new Tmdb(apiConfig.getApi_key());
		if (tmdb.getSessionId() == null)
			tmdb.setSessionId(getSessionId());

		AccountService accountService = tmdb.accountService();
		Account acccount = accountService.summary().execute().body();
		Status status = accountService.favorite(acccount.id, favorite).execute().body();
		return new ResponseEntity<Status>(status, HttpStatus.OK);
	}

	@GetMapping("favourites/{page}")
	public ResponseEntity<MovieResultsPage> getFavourite(@PathVariable("page") int page) throws IOException {
		page = page == 0 ? page + 1 : page;
		Tmdb tmdb = new Tmdb(apiConfig.getApi_key());

		if (tmdb.getSessionId() == null)
			tmdb.setSessionId(getSessionId());

		AccountService accountService = tmdb.accountService();
		Account acccount = accountService.summary().execute().body();

		MovieResultsPage moviesResultPage = accountService
				.favoriteMovies(acccount.id, "en", SortBy.ORIGINAL_TITLE_ASC, page).execute().body();
		return new ResponseEntity<MovieResultsPage>(moviesResultPage, HttpStatus.OK);
	}

	@PostMapping("watchlist")
	public ResponseEntity<Status> addToWartchList(@RequestBody WatchlistMedia media) throws IOException {

		Tmdb tmdb = new Tmdb(apiConfig.getApi_key());
		if (tmdb.getSessionId() == null)
			tmdb.setSessionId(getSessionId());

		AccountService accountService = tmdb.accountService();
		Account acccount = accountService.summary().execute().body();
		Status status = accountService.watchlist(acccount.id, media).execute().body();
		return new ResponseEntity<Status>(status, HttpStatus.OK);
	}

	@GetMapping("watchlist/{page}")
	public ResponseEntity<MovieResultsPage> getWatchlist(@PathVariable("page") int page) throws IOException {
		page = page == 0 ? page + 1 : page;
		Tmdb tmdb = new Tmdb(apiConfig.getApi_key());
		if (tmdb.getSessionId() == null)
			tmdb.setSessionId(getSessionId());

		AccountService accountService = tmdb.accountService();
		Account acccount = accountService.summary().execute().body();

		MovieResultsPage moviesResultPage = accountService
				.watchlistMovies(acccount.id, "en", SortBy.ORIGINAL_TITLE_ASC, page).execute().body();
		return new ResponseEntity<MovieResultsPage>(moviesResultPage, HttpStatus.OK);
	}

}
