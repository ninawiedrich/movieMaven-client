import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movie, setMovie] = useState([
    {
      _id: { $oid: "649d6e7d277f56f07f1e6025" },
      title: "The Lord of the Rings: The Return of the King",
      director: {
        name: "Peter Jackson",
        bio: "Born on October 31, 1961, in New Zealand, Peter Jackson started his prolific career as a child, creating short films with an 8-mm movie camera. Without any formal training, Jackson has directed a number of successful films ranging across all genres.",
        birth: "October 31, 1961"
      },
      description: "The Lord of the Rings: The Return of the King is the third installment of the epic fantasy trilogy directed by Peter Jackson. It follows the journey of Frodo Baggins as he and his companions fight against the forces of evil to destroy the One Ring and save Middle-earth.",
      genre: {
        name: "Fantasy",
        description: "Fantasy movies involve imaginative and often magical elements, taking viewers into fictional worlds filled with mythical creatures, supernatural powers, and epic quests."
      },
      imageUrl: "https://image.tmdb.org/t/p/w1280/9I3n4G2ckZJq8XMotcUWqPLGnhI.jpg",
      featured: true
    },
    {
      _id: { $oid: "649d6ea8277f56f07f1e6027" },
      title: "The Hobbit: An Unexpected Journey",
      director: {
        name: "Peter Jackson",
        bio: "Born on October 31, 1961, in New Zealand, Peter Jackson started his prolific career as a child, creating short films with an 8-mm movie camera. Without any formal training, Jackson has directed a number of successful films ranging across all genres.",
        birth: "October 31, 1961"
      },
      description: "The Hobbit: An Unexpected Journey is the first film in the three-part series directed by Peter Jackson. The movie follows Bilbo Baggins, who is thrust into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug, along with the wizard Gandalf and thirteen dwarves.",
      genre: {
        name: "Fantasy",
        description: "Fantasy movies involve imaginative and often magical elements, taking viewers into fictional worlds filled with mythical creatures, supernatural powers, and epic quests."
      },
      imageUrl: "https://spotlightreport.net/wp-content/uploads/2012/12/the-hobbit-review-banner.jpg",
      featured: true
    },
    {
      _id: { $oid: "649d6ec0277f56f07f1e6029" },
      title: "The Social Network",
      director: {
        name: "David Fincher",
        bio: "David Fincher is an American filmmaker known for his meticulous approach to filmmaking and his visually striking style. He has directed several critically acclaimed movies across various genres.",
        birth: "August 28, 1962"
      },
      description: "The Social Network is a biographical drama film directed by David Fincher. It explores the founding of the social networking website Facebook and the legal battles and personal conflicts that arise among its creators.",
      genre: {
        name: "Biography",
        description: "Biography movies depict the life and achievements of real people, often focusing on notable figures from history, politics, arts, sports, or other fields. They provide insights into their personal stories, struggles, and accomplishments."
      },
      imageUrl: "https://lh5.googleusercontent.com/-04PMi6R7k34/TWyZOqHKj6I/AAAAAAAACpU/sNmX-estL7s/s400/the-social-network-1.jpeg",
      featured: true
    }
  ]);

  if (movie.length === 0) {
    return <div>The list is empty!</div>;
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  return (
    <div>
      {movie.map((movie) => (
        <MovieCard
          key={movie._id.$oid}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};