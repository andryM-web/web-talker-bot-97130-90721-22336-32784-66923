import { Genre } from '@/types/movie';
import { Badge } from './ui/badge';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
  onClear?: () => void;
}

const GenreFilter = ({ genres, selectedGenres, onGenreToggle, onClear }: GenreFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const isSelected = selectedGenres.includes(genre.id);
        return (
          <Badge
            key={genre.id}
            variant={isSelected ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => onGenreToggle(genre.id)}
          >
            {genre.name}
          </Badge>
        );
      })}
      {selectedGenres.length > 0 && (
        <Badge
          variant="secondary"
          className="cursor-pointer"
          onClick={() => onClear ? onClear() : selectedGenres.forEach(id => onGenreToggle(id))}
        >
          Очистить
        </Badge>
      )}
    </div>
  );
};

export default GenreFilter;
