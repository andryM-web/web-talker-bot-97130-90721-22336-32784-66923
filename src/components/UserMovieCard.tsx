import { Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Movie, MovieStatus, UserMovie } from '@/types/movie';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface UserMovieCardProps {
  movie: Movie;
  userMovie: UserMovie;
}

const statusLabels: Record<MovieStatus, string> = {
  planned: 'В планах',
  watching: 'Смотрю',
  completed: 'Просмотрено',
  dropped: 'Брошено',
};

const statusColors: Record<MovieStatus, string> = {
  planned: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  watching: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  completed: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  dropped: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
};

const UserMovieCard = ({ movie, userMovie }: UserMovieCardProps) => {
  const { updateUserMovie } = useAuth();

  const handleStatusChange = (newStatus: string) => {
    updateUserMovie(movie.id, newStatus as MovieStatus, userMovie.rating);
  };

  const handleRatingChange = (newRating: string) => {
    updateUserMovie(movie.id, userMovie.status, parseInt(newRating));
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link to={`/movies/${movie.id}`} className="flex-shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-24 h-36 object-cover rounded"
            />
          </Link>

          <div className="flex-1 space-y-3">
            <div>
              <Link to={`/movies/${movie.id}`}>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                  {movie.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">{movie.year} • {movie.director}</p>
            </div>

            <div className="flex flex-wrap gap-1">
              {movie.genres.map(genre => (
                <Badge key={genre.id} variant="secondary" className="text-xs">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">{movie.rating}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={userMovie.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">В планах</SelectItem>
                  <SelectItem value="watching">Смотрю</SelectItem>
                  <SelectItem value="completed">Просмотрено</SelectItem>
                  <SelectItem value="dropped">Брошено</SelectItem>
                </SelectContent>
              </Select>

              {(userMovie.status === 'completed' || userMovie.status === 'dropped') && (
                <Select 
                  value={userMovie.rating?.toString() || ''} 
                  onValueChange={handleRatingChange}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Оценка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
                    <SelectItem value="3">⭐⭐⭐</SelectItem>
                    <SelectItem value="2">⭐⭐</SelectItem>
                    <SelectItem value="1">⭐</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserMovieCard;
