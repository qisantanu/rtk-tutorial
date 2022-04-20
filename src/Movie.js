import logo from "./logo.svg";
import "./App.css";
import { useGetMoviesQuery, useGetMovieQuery, useAddMovieMutation } from "./services/moviesApi";

function Movie() {
  const { data, error, isLoading, isSuccess } = useGetMoviesQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    }
    else {
        // you can access all properties of `SerializedError` here
        return <div>{error.message}</div>
    }
  }

  return (
    <div className="App">
      <div><AddMovie/></div>
    
      {isLoading && <div>Loading...</div>}


      {isSuccess &&
        data?.map((movie) => (
          <pre key={movie.id}>
            <div>{movie.name}</div>
            <ul>
              <MovieDescription id={movie.id} />
            </ul>
            <ul>
              <MovieDetail id={movie.id} />
            </ul>
          </pre>
        ))}
    </div>

  );
}

export const MovieDescription = ({ id }) => {
  const { movie } = useGetMoviesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      movie: data?.find((m) => m.id === id),
    }),
  });

  return <li>{movie?.description}</li>;
};

export const MovieDetail = ({ id }) => {
  const { data, error, isLoading, isSuccess } = useGetMovieQuery(id, {
    skip: !id,
  });

  return (
    <div>
      {error && <div>Oh no ! there is error</div>}
      {isLoading && <div>Loading...</div>}
      {isSuccess && JSON.stringify(data)}
    </div>
  );
};

export const AddMovie = () => {
  const [addMovie] = useAddMovieMutation();
  const {refetch } = useGetMoviesQuery()
  const moviePayload = {
    "name":"Golden Eye",
    "description":"As you like it"
  }

  const addHandler = async() => {
    await addMovie(moviePayload);
    
  }

  return (
    <button onClick={addHandler }>Add movies</button>
  )
}

export default Movie;
