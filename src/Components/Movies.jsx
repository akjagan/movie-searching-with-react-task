import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import Search from "./Search";
import Details from "./Details";
import { CardBody, CardContainer, CardItem } from "../utils/3dCard";
import PlaceHolder from "/watching.png";
import toast from "react-hot-toast";

const Movies = () => {
  const [movies, setMovies] = useState({
    results: [],
    selected: {},
  });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiurl = "https://www.omdbapi.com/";
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  console.log("Component mounted. API Key:", apiKey);

  const fetchMovies = async (searchTerm) => {
    console.log("fetchMovies called with:", searchTerm);

    if (searchTerm.trim() === "") {
      console.log("Search term is empty, returning");
      return;
    }

    setIsLoading(true);
    const fullUrl = `${apiurl}?apikey=${apiKey}&s=${encodeURIComponent(
      searchTerm
    )}`;
    console.log("API URL:", fullUrl);

    try {
      console.log("Sending request to API...");
      const response = await axios.get(fullUrl);
      console.log("API Response:", response.data);

      const data = response.data;

      if (data.Response === "True") {
        setMovies((prevState) => ({
          ...prevState,
          results: data.Search,
        }));
      } else {
        console.log("API returned an error:", data.Error);
        toast.error(data.Error || "An error occurred", {
          position: "bottom-center",
        });
        setMovies((prevState) => ({
          ...prevState,
          results: [],
          selected: {},
        }));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : "No response data"
      );
      toast.error("Failed to fetch movies. Please try again.", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
    };
    

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    console.log("API Key loaded:", apiKey); // Check if API key is loaded

    if (apiKey) {
      fetchMovies("avengers");
      console.log("Fetching movies for:", "avengers"); // Indicate fetching process
    } else {
      console.error("API key is not defined"); // Error handling
      toast.error("API key is missing. Please check your configuration.");
    }
  }, []);

//   useEffect(() => {
//     if (apiKey) {
//       fetchMovies("avengers");
//     } else {
//       console.error("API key is not defined");
//       toast.error("API key is missing. Please check your configuration.");
//     }
//   }, []);

  const handleChange = (value) => {
    setSearch(value);
    searchHandler(value.trim());
  };

  const searchHandler = useDebouncedCallback((search) => {
    fetchMovies(search);
  }, 800);

  const openDetail = async (id) => {
    const fullUrl = `${apiurl}?apikey=${apiKey}&i=${id}&plot=full`;
    console.log("Detail API URL:", fullUrl);

    try {
      const response = await axios.get(fullUrl);
      const data = response.data;
      setMovies((prevState) => ({
        ...prevState,
        selected: data,
      }));
    } catch (error) {
      console.error("Error fetching movie details:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : "No response data"
      );
      toast.error("Failed to fetch movie details. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  const closeDetail = () => {
    setMovies((prevState) => ({
      ...prevState,
      selected: {},
    }));
  };

  return (
    <>
      <Search search={search} handleChange={handleChange} />
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : movies.results.length > 0 ? (
          <>
            {movies.results.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex flex-col items-center gap-2 text-left cursor-pointer"
                onClick={() => openDetail(movie.imdbID)}
              >
                <CardContainer className="inter-var">
                  <CardBody className="relative border-2 border-slate-900/[0.2] dark:border-white/[0.2] bg-slate-50 dark:bg-[#1c1722] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] mx-auto p-4 rounded-xl w-full max-w-sm group/card">
                    <CardItem
                      translateZ="50"
                      className="w-full font-bold text-lg text-neutral-800 sm:text-xl dark:text-slate-100 truncate"
                    >
                      {movie.Title}
                    </CardItem>
                    <CardItem translateZ="100" className="mt-4 w-full">
                      <img
                        src={
                          movie.Poster !== "N/A" ? movie.Poster : PlaceHolder
                        }
                        width={200}
                        style={{ height: "250px", objectFit: "cover" }}
                        className="border-slate-100 dark:border-[#120e16] group-hover/card:shadow-xl border rounded-xl w-full"
                        alt="Movie Poster"
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </>
        ) : (
          <img src={PlaceHolder} alt="Placeholder" width={500} />
        )}
      </div>
      {typeof movies.selected.Title !== "undefined" && (
        <Details selected={movies.selected} closeDetail={closeDetail} />
      )}
    </>
  );
};

export default Movies;