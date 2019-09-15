package com.heycarter.movies.rest;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heycarter.movies.ApiConfig;
import com.uwetrottmann.tmdb2.Tmdb;
import com.uwetrottmann.tmdb2.entities.MovieResultsPage;
import com.uwetrottmann.tmdb2.services.SearchService;

import java.io.IOException;

import retrofit2.Response;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {
	
	@Autowired
	ApiConfig apiConfig;
	
	
	@GetMapping("/movie")
	public  ResponseEntity<MovieResultsPage> search(@RequestParam String query, @RequestParam int page) throws IOException {
		MovieResultsPage movieResultsPage = null;	
		Tmdb tmdb = new Tmdb(apiConfig.getApi_key());
		
		page = page == 0 ? page + 1 : page;
		
		SearchService  searchService  = tmdb.searchService();
		Response<MovieResultsPage> response = searchService.movie(query, page,"en","US",true,0,0).execute();
		if(response.isSuccessful()) {
			movieResultsPage = response.body();
		}
		return new ResponseEntity<MovieResultsPage>(movieResultsPage, HttpStatus.OK);
	

		
	}

}
