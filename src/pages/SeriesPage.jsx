import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Dropdown from "/src/components/common/GenreDrop.jsx";
import Hero from "../components/common/Hero";
import Category from "../components/common/Category";
import Footer from "../components/common/Footer";
import Popup from "../components/Popup";
import HoverPoster from "/src/components/common/HoverPoster";
import Rating from "/src/components/common/Rating";
import backgroundImage from "../assets/Rectangle 9 (1).png";


// Komponen utama halaman series
const Series = (props) => {
  // State utk mengelola status popup trailer
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [series, setSeries] = useState([]);
  const [newSeriesRating, setNewSeriesRating] = useState(0);

  // Fungsi memutar trailer (unfinished)
  const handleOpenTrailer = (trailerUrl, series) => {
    const autoplayUrl = trailerUrl.includes("?")
      ? `${trailerUrl}&autoplay=1`
      : `${trailerUrl}?autoplay=1`;
    setCurrentTrailerUrl(autoplayUrl);
    setSelectedSeries(series);
    setIsTrailerOpen(true);
  };
  // Fungsi menutup trailer
  const handleCloseTrailer = (trailerUrl, series) => {
    setIsTrailerOpen(false);
    setCurrentTrailerUrl("");
  };

  // Fungsi utk mengubah genre yg dipilih
  const handleDropdownChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Fungsi untuk menangani hover pd item
  const handleMouseEnter = (item) => {
    setHoveredItemId(item.id);
};

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  // Daftar genre yg tersedia dlm dropdwon
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

  // Data untuk seri yg sedang dilanjutkan
  const continueWatching = [
    {
      id: 1,
      title: "Alice in Borderland",
      image: "src/assets/aliceinborderlandpopup.webp",
      isNewEpisode: true,
      rating: 4.5,
      trailerUrl: "https://www.youtube.com/embed/example1",
      date: "2020",
      totalEpisodes: "10 Episode",
      ageRating: "18+",
      description:
        "Serial televisi Jepang yang bercerita tentang sekelompok anak muda yang terperangkap di dunia paralel dan harus bertahan hidup dengan mengikuti serangkaian permainan maut.",
      genre: ["Thriller", "Drama", "Games"],
      cast: ["Kento Yamazaki", "Tao Tsuchiya"],
      filmmaker: "Shinsuke Sato",
      // data episode dari "Alice in Borderland"
      episodes: [
        {
          title: "Episode 1",
          duration: "49m",
          description:
            "Arisu dan teman-temannya menemukan kamar mandi umum untuk bersembunyi dari polisi. Namun saat mereka keluar, jalanan Tokyo tiba-tiba kosong sama sekali.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/alice_in_borderland_cast-f8b0233.jpg",
        },
        {
          title: "Episode 2",
          duration: "51m",
          description:
            "Meninggalkan Chota yang terluka, Arisu dan Karube keluar untuk bereksplorasi. Saat tiba di sebuah apartemen luas, permainan kejar-kejaran berbahaya sudah menanti mereka.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/aliceepisode2.jpg",
        },
        {
          title: "Episode 3",
          duration: "43m",
          description:
            "Visa Chota dan visa Shibuki hampir kedaluwarsa. Empat sekawan itu pun masuk ke taman botani luas di Shinjuku, lalu mengikuti permainan pengkhianatan yang kejam di sana.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/aliceeps3.jpg",
        },
        {
          title: "Episode 4",
          duration: "48m",
          description:
            "Arisu dilanda rasa bersalah dan hampir menyerah, tetapi Usagi mendorongnya untuk terus berjuang. Selanjutnya adalah permainan ketahanan di sebuah jalan raya bawah tanah.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/aliceeps4.jpg",
        },
        {
          title: "Episode 5",
          duration: "53m",
          description:
            "Setelah Arisu dan Usagi berhasil tiba di Pantai, penguasa dari tempat berlindung utopia ini memaksa mereka untuk membantu mengumpulkan kartu bermain yang tersisa.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/aliceeps5.jpg",
        },
        {
          title: "Episode 6",
          duration: "42m",
          description:
            "Chishiya mengajak Arisu dan Usagi untuk membantunya mengubah status quo. Sebuah kejadian tak terduga mengguncang dinamika kekuasaan Pantai yang rapuh.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/aliceeps6.jpg",
        },
        {
          title: "Episode 7",
          duration: "49m",
          description:
            "Awalnya tempat berlindung, kini Pantai menjadi arena permainan selanjutnya: perburuan penyihir sengit, yang membuat semua orang saling bertarung dalam pertempuran keji.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/aliceeps7.jpg",
        },
        {
          title: "Episode 8",
          duration: "54m",
          description:
            "Ketegangan di dalam resor mencapai puncaknya. Dengan waktu permainan yang hampir habis, mereka yang bertahan hidup kini menghadapi masa depan yang tak pasti.",
          trailerUrl: "https://www.youtube.com/embed/episode1_trailer",
          image: "src/assets/aliceeps8.jpg",
        },
      ],
    },

    // Data series "Ted Lasso"
    {
      id: 2,
      title: "Ted Lasso",
      image: "src/assets/image 237.png",
      isNewEpisode: true,
      rating: 4.4,
      trailerUrl: "//www.youtube.com/watch?v=bnceO8VsMis",
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
          trailerUrl: "https://www.youtube.com/watch?v=bnceO8VsMis",
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

    // Data dari series "All of us are Dead"
    {
      id: 3,
      title: "All of Us are Dead",
      image: "src/assets/all of us are dead.jpg",
      isNewEpisode: true,
      rating: 4.2,
      date: "2022",
      totalEpisodes: "1 Season",
      ageRating: "18+",
      trailerUrl: "https://www.youtube.com/embed/example3",
      description:
        "Sebuah SMA menjadi titik nol merebaknya wabah virus zombi. Para murid yang terperangkap pun harus berjuang untuk kabur jika tak mau terinfeksi dan berubah menjadi buas.",
      genre: ["Horor", "Thriler", "Suicide"],
      cast: ["Park Ji-hu,Yoon Chan-young,Cho Yi-hyun"],
      filmmaker: "Lee JQ,Chun Sung-il,Kim Nam-su",
      episodes: [
        {
          title: "∙ Episode #1.1",
          duration: "66 min",
          description:
            "Di lab sains Lee Byeong-chan, seorang siswa terkena gigitan yang tampaknya tidak berbahaya. Tak lama kemudian, wabah yang menyebar cepat menggenangi sekolah dengan darah.",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer1",
          image: "src/assets/image 223 (1).png",
        },
        {
          title: "∙ Episode #1.2",
          duration: "70 min",
          description:
            "Orang yang terinfeksi berkembang biak dalam jumlah besar. Guna bertahan hidup, Nam On-jo & Lee Cheong-san berlindung bersama orang lain di dalam kelas, tetapi tidak lama.",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer1",
          image: "src/assets/allofusaredeadeps2.webp",
        },
        {
          title: "∙ Episode #1.3",
          duration: "62 min",
          description:
            "Ketika salah satu anggota kelompok tergores saat melawan zombi, Lee Na-yeon mendesak agar mereka mengusirnya. Di luar, virus menjalar di seluruh kota.",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer1",
          image: "src/assets/allofusaredeadeps3.webp",
        },
        {
          title: "∙ Episode #1.4",
          duration: "67 min",
          description:
            "Karena membutuhkan ponsel, dua siswa melakukan perjalanan berisiko ke kantor guru. Byeong-chan menyampaikan informasi penting kepada Detektif Song Jae-ik.",
          trailerUrl: "https://www.youtube.com/embed/episode_trailer1",
          image: "src/assets/allofusaredeadeps4.jpg",
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
      title: "My Hero Academia",
      image: "src/assets/image 231.png",
      rating: 5,
      isNewEpisode: true,
    },
    {
      title: "Blue Lock",
      image: "src/assets/image 219.png",
      isNewEpisode: true,
      rating: 4.8,
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

    { id: 11, title: "Interstellar", image: "src/assets/interstellarrr1.jpeg" },
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

  // Menggabungkan semua kategori seri
  const allSeries = [
    ...continueWatching,
    ...topRated,
    ...trendingMovies,
    ...newReleases,
  ];

   return (
    <div className="bg-stone-900 min-h-screen overflow-hidden text-white">
      <Navbar />

      <Hero
        title="Happiness"
        description="Berlatar waktu masa depan, sebuah gedung apartemen bertingkat tinggi baru saja dibangun di kota besar. Gedung apartemen tersebut memiliki penghuni dari berbagai latar belakang, tetapi sebuah penyakit menular baru merebak. Karena wabah tersebut, apartemen bertingkat tinggi tersebut ditutup. Para penghuni berjuang untuk bertahan hidup, sambil dilanda ketakutan dan ketidakpercayaan terhadap orang lain."
        options={options}
        onDropdownChange={handleDropdownChange}
        showDropdown={true}
        backgroundImage={backgroundImage}
      />

      {/* Menampilkan kategori untuk melanjutkan tonton series */}
      <Category
        title="Melanjutkan Tonton Series"
        items={continueWatching}
        onOpenTrailer={handleOpenTrailer}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        showRating={true}
      />

      {/* Menampilkan kategori untuk series persembahan chill */}
      <Category title="Series Persembahan Chill" items={topRated} />
      <Category title="Top Rating Series Hari Ini" items={topRated} />
      <Category title="Series Trending" items={trendingMovies} />
      <Category title="Rilis Baru" items={newReleases} />

      <Footer />

      {/* Menampilkan popup jika trailer dibuka */}
      {selectedSeries && (
        <Popup
          series={selectedSeries}
          isOpen={isTrailerOpen}
          videoUrl={currentTrailerUrl}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}

      {/* Menampilkan poster hover jika ada item yang di-hover */}
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

export default Series;
