import { Header } from "./features/Header";
import { Footer } from "./features/Footer";
import { HeroSection } from "./features/HeroSection";

const movies = [
  { id: 1, title: 'Dear Santa', rating: '6.8/10', image: 'https://via.placeholder.com/200x300' },
  { id: 2, title: 'How To Train Your Dragon', rating: '6.8/10', image: 'https://via.placeholder.com/200x300' },
  { id: 3, title: 'Alien: Romulus', rating: '6.8/10', image: 'https://via.placeholder.com/200x300' },
  { id: 4, title: 'From the Ashes', rating: '6.8/10', image: 'https://via.placeholder.com/200x300' },
  { id: 5, title: 'Space Dogg', rating: '6.8/10', image: 'https://via.placeholder.com/200x300' },
];

export default function MovieHome() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
<header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-lg text-indigo-600">
          <span>🎬</span> Movie Z
        </div>
        <div className="flex-1 max-w-md mx-8">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">☀️</button>
        </div>

      </header>
      <HeroSection />
        <main className="max-w-7xl mx-auto px-8 py-10 space-y-12">

        </main>

        <Footer className="bg-indigo-600 text-white mt-16 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-bold text-lg mb-2">Movie Z</div>
            <p className="text-indigo-200 text-xs">© 2026 Movie Z. All Rights Reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Information</h4>
            <p className="text-indigo-200 text-xs">Email: support@moviez.com</p>
            <p className="text-indigo-200 text-xs">Phone: +976 11 123456</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow us</h4>
            <div className="flex gap-4 text-indigo-200 text-xs">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </Footer>
    </div>


// Киноны сүлжээ хэсгийн компонент
function MovieSection({ title, movies }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <a href="#" className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1">
          See more <span>&gt;</span>
        </a>
      </div>

      {/* 5 баганатай сүлжээ (Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

// Нэг ширхэг киноны карт
function MovieCard({ movie }) {
  return (
    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 hover:shadow-md transition cursor-pointer">
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 mb-2">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="w-full h-full object-cover hover:scale-105 transition duration-300" 
        />
      </div>
      <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold mb-1">
        <span>⭐</span>
        <span className="text-gray-700">{movie.rating}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-800 truncate">{movie.title}</h3>
    </div>
  );
}
  );
}
