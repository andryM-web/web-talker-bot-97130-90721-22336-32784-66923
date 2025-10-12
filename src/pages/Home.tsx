import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import MovieGrid from '@/components/MovieGrid';
import GenreFilter from '@/components/GenreFilter';
import { movies, genres } from '@/data/mockMovies';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'year'>('rating');

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Поиск
    if (searchQuery) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по жанрам
    if (selectedGenres.length > 0) {
      result = result.filter((movie) =>
        movie.genres.some((genre) => selectedGenres.includes(genre.id))
      );
    }

    // Сортировка
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return b.year - a.year;
    });

    return result;
  }, [searchQuery, selectedGenres, sortBy]);

  const popularMovies = useMemo(
    () => movies.sort((a, b) => b.rating - a.rating).slice(0, 5),
    []
  );

  const newMovies = useMemo(
    () => movies.sort((a, b) => b.year - a.year).slice(0, 5),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container px-4 py-8 space-y-12">
        {/* Hero секция с популярными фильмами */}
        <section>
          <div className="relative rounded-2xl overflow-hidden mb-8" style={{ background: 'var(--gradient-hero)' }}>
            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Добро пожаловать в Kinoclone
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Смотрите, отслеживайте и оценивайте фильмы. Находите расписание кинотеатров Краснодара.
              </p>
            </div>
          </div>

          <MovieGrid movies={popularMovies} title="🔥 Популярные фильмы" />
        </section>

        {/* Новинки */}
        <section>
          <MovieGrid movies={newMovies} title="✨ Новинки" />
        </section>

        {/* Фильтры и каталог */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Каталог фильмов</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <GenreFilter
                  genres={genres}
                  selectedGenres={selectedGenres}
                  onGenreToggle={handleGenreToggle}
                />
              </div>
              
              <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as 'rating' | 'year')}>
                <TabsList>
                  <TabsTrigger value="rating">По рейтингу</TabsTrigger>
                  <TabsTrigger value="year">По году</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <MovieGrid movies={filteredMovies} />
        </section>
      </main>
    </div>
  );
};

export default Home;
