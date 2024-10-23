import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Dropdown from "/src/components/common/GenreDrop.jsx";
import Hero from "../components/common/Hero";
import Category from "../components/common/Category";
import Footer from "../components/common/Footer";
import Popup from "../components/Popup";
import HoverPoster from "/src/components/common/HoverPoster";
import Rating from "/src/components/common/Rating";


// Komponen utama halaman mylist
const MyList = (props) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [series, setSeries] = useState([]);
  const [newSeriesRating, setNewSeriesRating] = useState(0);

//
  const handleOpenTrailer = (trailerUrl, series) => {
    setCurrentTrailerUrl(trailerUrl);
    setSelectedSeries(series);
    setIsTrailerOpen(true);
  };
//
  const handleCloseTrailer = (trailerUrl, series) => {
    setIsTrailerOpen(false);
    setCurrentTrailerUrl("");
  };
// Logika genre ddropdown //
  const handleDropdownChange = (e) => {
    setSelectedGenre(e.target.value);
  };
// hover in 
  const handleMouseEnter = (item) => {
    setHoveredItemId(item.id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
 //  hover out //

  {/* List Genre */}
  const options = [
    { value: "Aksi", label: "Aksi" },
    { value: "KDrama", label: "KDrama" },
    { value: "Anak-anak", label: "Anak-anak" },
    { value: "Komedi", label: "Komedi" },
    { value: "Anime", label: "Anime" },
    { value: "Petualangan", label: "Petualangan" },
    { value: "Britania", label: "Britania" },
    { value: "Perang", label: "Perang" },
    { value: "Drama", label: "Drama" },
    { value: "Romantis", label: "Romantis" },
    { value: "Sains Ilmiah", label: "Sains Ilmiah" },
    { value: "Kejahatan", label: "Kejahatan" },
    { value: "Fantasi", label: "Fantasi" },
  ];

  {/* lanjutkan nonton */}
  const continueWatching = [
    {
      id: 1,
      title: "Alice in Borderland |",
      image: "src/assets/aliceinborderlandpopup.webp",
      isNewEpisode: true,
      rating: 4.5,
      trailerUrl: "https://www.youtube.com/embed/example1",
      date: "2020",
      totalEpisodes: "10 Episode",
      ageRating: "17+",
      description:
        "Serial televisi Jepang yang bercerita tentang sekelompok anak muda yang terperangkap di dunia paralel dan harus bertahan hidup dengan mengikuti serangkaian permainan maut.",
      genre: ["Thriller", "Drama"],
      cast: ["Kento Yamazaki", "Tao Tsuchiya"],
      filmmaker: "Shinsuke Sato",
      episodes: [
        {
          title: "Episode 1",
          duration: "40m",
          description: "Introduction",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
        },
      ],
    },
    {
      id: 2,
      title: "Ted Lasso",
      image: "src/assets/image 237.png",
      isNewEpisode: true,
      rating: 4.4,
      trailerUrl: "https://www.youtube.com/embed/example2",
      date: "2020",
      totalEpisodes: "10 Episode",
      ageRating: "16+",
      description:
        "Pelatih sepak bola perguruan tinggi Amerika Ted Lasso pergi ke London untuk mengelola AFC Richmond, tim sepakbola Liga Utama Inggris yang kesulitan.",
      genre: ["Komedi", "Drama", "Olahraga"],
      cast: [
        "Jason Sudeikis",
        "Brett Goldstein",
        "Brendan Hunt",
        "Nick Mohammed",
        "dan lain-lain",
      ],
      filmmaker: "Brendan Hunt,Joe Killy,Bill Lawrence",
      episodes: [
        {
          title: "Pilot",
          duration: "30 min",
          description:
            "American football coach Ted Lasso is hired by a wealthy divorcee to coach the English soccer team AFC Richmond",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer1",
          image: "src/assets/image 214.png",
        },
        {
          title: "Biscuits",
          duration: "29 min",
          description:
            "It's Ted's first day of coaching, and fans aren't happy. He makes little headway but remains undeterred as the team...",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer2",
          image: "src/assets/image 209.png",
        },
        {
          title: "Trent Crimm: Independent",
          duration: "30 min",
          description:
            "To arrange an in-depth expose, Rebecca pairs cynical journalist Trent Crimm with Ted for a day.Ted and Roy...",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer2",
          image: "src/assets/image 210.png",
        },
        {
          title: "For The Children",
          duration: "33 min",
          description:
            "Rebecca hosts the team's annual charity benefit, where Ted stages a reconciliation between Roy and Jamie.",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer2",
          image: "src/assets/image 211.png",
        },
        {
          title: "Tan Lines",
          duration: "31 min",
          description:
            "With his wife and son visiting from America, Ted makes drastic changes to the lineup during a critical match.",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer2",
          image: "src/assets/image 212.png",
        },
      ],
    },
    {
      id: 3,
      title: "All of Us are Dead |",
      image: "src/assets/image 223 (1).png",
      isNewEpisode: true,
      rating: 4.2,
      trailerUrl: "https://www.youtube.com/embed/example3",
      description:
        "An American football coach is hired to manage an English soccer team.",
      genre: ["Comedy", "Drama", "Sports"],
      cast: ["Jason Sudeikis", "Hannah Waddingham", "Brett Goldstein"],
      filmmaker: "Bill Lawrence",
      episodes: [
        {
          title: "Pilot",
          duration: "30 min",
          description: "The team is introduced to their new coach.",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer1",
        },
      ],
    },
    {
      id: 4,
      title: "The Tomorrow War",
      image: "src/assets/tomorow war.png",
      isNewEpisode: true,
    },
    {
      id: 100,
      title: "My Hero Academia | ",
      image: "src/assets/image 231.png",
      rating: 5,
      isNewEpisode: true,
    },
    {
      title: "Blue Lock",
      image: "src/assets/image 219.png",
      isNewEpisode: true,
      rating: 4.8
    },
  ];

  const topRated = [
    {
      id: 5,
      title: "Antman",
      image: "/src/assets/antman.jpg",
    },
    {
    id: 6,
    title: "Big Hero 6",
    image: "src/assets/image 217 (1).png",
  },
    {
      id: 7,
      title: "Oppenheimer",
      image: "src/assets/opeenheiii.jpeg",
      isPremium: true,
    },
    {
      id: 8,
      title: "Game of Thrones",
      image: "src/assets/gameofthornes.jpg",
      isNewEpisode: true,
      isTop10: true,
    },
    {
      id: 9,
      title: "Jurassic World",
      image: " src/assets/image 230.png",
      isNewEpisode: true,
      isTop10: true,
    },
   
    {
      id: 10,
      title: "Peaky Blinders",
      image: "src/assets/peakyblinderas.jpg",
      isNewEpisode: true,
    },

    { id: 11, title: "Interstellar", 
      image: "src/assets/interstellarrr1.jpeg" },
    {
      id: 12,
      title: "Money Heist",
      image: "src/assets/moneyheist.webp",
      isNewEpisode: true,
    },
    {
      id: 13,
      title: "Thor Ragnarok",
      image: "src/assets/ragnarok.jpg",
    },
  ];

  // Film Trending //
  const trendingMovies = [
    {
      id: 14,
      title: "The Dark Knight",
      image: "src/assets/darkknight.jpg",
      isTop10: true,
    },
    {
      id: 15,
      title: "Avengers: Endgame",
      image: "src/assets/endgame.webp",
      isTop10: true,
    },
    {
      id: 16,
      title: "The Godfather",
      image: "src/assets/thegodfatherrr.jpeg",
      isTop10: true,
    },
    {
      id: 17,
      title: "Shawshank Redemption",
      image: "src/assets/theshawshankredemptionnn.jpeg",
      isTop10: true,
    },
    {
      id: 18,
      title: "a Man called Otto",
      image: "src/assets/image 215.png",
      isTop10: true,
    },
    {
      id: 19,
      title: "Interstellar",
      image: "src/assets/interstellarrr1.jpeg",
      isTop10: true,
    },
    {
      id: 20,
      title: "Guardians of the Galaxy",
      image: "src/assets/gotg.jpg",
      isTop10: true,
    },
    {
      id: 21,
      title: "Love & thunder",
      image: "src/assets/love&thunder.jpg",
      isTop10: true,
    },
  ];

  // Rilis Terbaru //
  const newReleases = [
    {
      id: 20,
      title: "No Way Home",
      image: "src/assets/nowayhome.webp",
      isPremium: true,
    },

    {
      id: 21,
      title: "Thunderbolts",
      image: "src/assets/thunderbolts.webp",
    },
    {
      id: 22,
      title: "Sonic 2",
      image: "src/assets/Number=29.png",
    },
    {
      id: 23,
      title: "Miles Morales",
      image: "src/assets/milesmorales.jpeg",
    },
    {
      id: 24,
      title: "Ted Lasso",
      image: "src/assets/Number=23.png",
    },
    {
      id: 25,
      title: "Captain Marvel",
      image: "src/assets/captmarvel.jpg",
    },
  ];

  const allSeries = [
    ...continueWatching,
    ...topRated,
    ...trendingMovies,
    ...newReleases,
  ];

  return (
    <div className="bg-stone-900 min-h-screen overflow-hidden text-white ">
      <Navbar />

      <Hero
        title="Avatar: The Way of Water"
        description="Melanjutkan cerita konflik antara manusia dan Na'vi di planet Pandora. Dalam pertempuran untuk sumber daya dan kekuasaan, manusia dan sekutu Na'vi bersatu untuk melindungi tanah mereka. Film ini mengangkat tema persatuan dan perlawanan terhadap eksploitasi.
"
        options={options}
        onDropdownChange={handleDropdownChange}
        showDropdown={true}
        backgroundImage="src/assets/Rectangle 9 (2).png"
      />

      <Category
        title="Melanjutkan Tonton Film"
        items={continueWatching}
        onOpenTrailer={handleOpenTrailer}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        showRating={true}   
      />
     
      <Category
        title="Film Persembahan Chill"
        items={topRated}
       
      />
      <Category
        title="Top Rating Film Hari Ini"
        items={topRated}
     
      />

      <Category
        title="Film Trending"
        items={trendingMovies}
  
      />

      <Category
        title="Rilis Baru"
        items={newReleases}
        
      />

      <Footer />
     
      {selectedSeries && (
        <Popup
          series={selectedSeries}
          isOpen={isTrailerOpen}
          videoUrl={currentTrailerUrl}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
{/* Apa yg muncul saat du hover */}
      {hoveredItemId && (
        <div className="hover-poster-container relative w-full bg-cover bg-center h-auto items-center justify-center">
          <HoverPoster
            series={allSeries.filter((item) => item.id === hoveredItemId)}
            onClick={(item) => console.log(`Clicked: ${item.title}`)}
            onOpenTrailer={handleOpenTrailer}
          />
        </div>
      )}
    </div>
  );
};

export default MyList;
