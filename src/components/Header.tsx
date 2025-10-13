import { Film, User, LogOut, UserCircle, Heart, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import AccessibilityToggle from './AccessibilityToggle';
import SearchAutocomplete from './SearchAutocomplete';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Film className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Kinoclone
          </span>
        </Link>

        <div className="flex-1 max-w-md mx-8">
          <SearchAutocomplete onSearch={onSearch} />
        </div>

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost">Главная</Button>
          </Link>
          <Link to="/movies">
            <Button variant="ghost">Фильмы</Button>
          </Link>
          <Link to="/cinemas">
            <Button variant="ghost">Кинотеатры</Button>
          </Link>
          <Link to="/schedules">
            <Button variant="ghost">Расписание</Button>
          </Link>
          
          <AccessibilityToggle />
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Мой профиль
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/recommendations')}>
                  <Heart className="mr-2 h-4 w-4" />
                  Рекомендации
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      Панель администратора
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
