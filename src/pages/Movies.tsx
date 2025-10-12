import { useState, useMemo } from 'react';
import { movies, genres } from '@/data/mockMovies';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import GenreFilter from '@/components/GenreFilter';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [ratingFrom, setRatingFrom] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    // Поиск по названию
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по жанрам
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        movie.genres.some(genre => selectedGenres.includes(genre.id))
      );
    }

    // Фильтр по году (от)
    if (yearFrom) {
      filtered = filtered.filter(movie => movie.year >= parseInt(yearFrom));
    }

    // Фильтр по году (до)
    if (yearTo) {
      filtered = filtered.filter(movie => movie.year <= parseInt(yearTo));
    }

    // Фильтр по рейтингу
    if (ratingFrom) {
      filtered = filtered.filter(movie => movie.rating >= parseFloat(ratingFrom));
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [movies, searchQuery, selectedGenres, sortBy, yearFrom, yearTo, ratingFrom]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSortBy('rating');
    setYearFrom('');
    setYearTo('');
    setRatingFrom('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={setSearchQuery} />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Каталог фильмов</h1>
              <p className="text-muted-foreground">
                Найдено фильмов: {filteredMovies.length}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
          </div>

          {showFilters && (
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Расширенные фильтры</h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Сбросить все
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Год выпуска (от)</Label>
                    <Input
                      type="number"
                      placeholder="1990"
                      value={yearFrom}
                      onChange={(e) => setYearFrom(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Год выпуска (до)</Label>
                    <Input
                      type="number"
                      placeholder="2025"
                      value={yearTo}
                      onChange={(e) => setYearTo(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Минимальный рейтинг</Label>
                    <Select value={ratingFrom} onValueChange={setRatingFrom}>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любой</SelectItem>
                        <SelectItem value="9.0">9.0+</SelectItem>
                        <SelectItem value="8.5">8.5+</SelectItem>
                        <SelectItem value="8.0">8.0+</SelectItem>
                        <SelectItem value="7.5">7.5+</SelectItem>
                        <SelectItem value="7.0">7.0+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Сортировка</Label>
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">По рейтингу</SelectItem>
                        <SelectItem value="year">По году</SelectItem>
                        <SelectItem value="title">По названию</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Жанры</Label>
                  <GenreFilter
                    genres={genres}
                    selectedGenres={selectedGenres}
                    onGenreToggle={(genreId) => {
                      if (selectedGenres.includes(genreId)) {
                        setSelectedGenres(selectedGenres.filter(id => id !== genreId));
                      } else {
                        setSelectedGenres([...selectedGenres, genreId]);
                      }
                    }}
                    onClear={() => setSelectedGenres([])}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {filteredMovies.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Фильмы не найдены. Попробуйте изменить параметры поиска.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Movies;
