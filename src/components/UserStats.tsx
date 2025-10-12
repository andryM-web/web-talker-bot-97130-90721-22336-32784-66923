import { Film, CheckCircle2, Clock, Eye, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { UserMovie } from '@/types/movie';

interface UserStatsProps {
  userMovies: UserMovie[];
}

const UserStats = ({ userMovies }: UserStatsProps) => {
  const completedMovies = userMovies.filter(um => um.status === 'completed');
  const plannedMovies = userMovies.filter(um => um.status === 'planned');
  const watchingMovies = userMovies.filter(um => um.status === 'watching');
  const droppedMovies = userMovies.filter(um => um.status === 'dropped');

  const averageRating = completedMovies.length > 0
    ? (completedMovies.reduce((sum, um) => sum + (um.rating || 0), 0) / completedMovies.length).toFixed(1)
    : '0';

  const stats = [
    {
      title: 'Всего фильмов',
      value: userMovies.length,
      icon: Film,
      color: 'text-primary',
    },
    {
      title: 'Просмотрено',
      value: completedMovies.length,
      icon: CheckCircle2,
      color: 'text-green-500',
    },
    {
      title: 'В планах',
      value: plannedMovies.length,
      icon: Clock,
      color: 'text-blue-500',
    },
    {
      title: 'Смотрю',
      value: watchingMovies.length,
      icon: Eye,
      color: 'text-yellow-500',
    },
    {
      title: 'Брошено',
      value: droppedMovies.length,
      icon: XCircle,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {completedMovies.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Средняя оценка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              ⭐ {averageRating} / 5
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserStats;
