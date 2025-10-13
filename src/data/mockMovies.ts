import { Movie, Genre, Cinema, Screening, UserMovie } from '@/types/movie';

export const genres: Genre[] = [
  { id: 1, name: 'Боевик' },
  { id: 2, name: 'Комедия' },
  { id: 3, name: 'Драма' },
  { id: 4, name: 'Фантастика' },
  { id: 5, name: 'Триллер' },
  { id: 6, name: 'Ужасы' },
  { id: 7, name: 'Мелодрама' },
  { id: 8, name: 'Приключения' },
  { id: 9, name: 'Детектив' },
  { id: 10, name: 'Фэнтези' },
];

export const movies: Movie[] = [
  {
    id: 1,
    title: 'Интерстеллар',
    year: 2014,
    duration: 169,
    director: 'Кристофер Нолан',
    country: 'США, Великобритания',
    description: 'Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину в путешествие, чтобы найти новую обитаемую планету.',
    poster: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=750&fit=crop',
    rating: 8.6,
    genres: [{ id: 4, name: 'Фантастика' }, { id: 3, name: 'Драма' }, { id: 8, name: 'Приключения' }],
  },
  {
    id: 2,
    title: 'Начало',
    year: 2010,
    duration: 148,
    director: 'Кристофер Нолан',
    country: 'США, Великобритания',
    description: 'Кобб – талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим.',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop',
    rating: 8.8,
    genres: [{ id: 4, name: 'Фантастика' }, { id: 5, name: 'Триллер' }, { id: 8, name: 'Приключения' }],
  },
  {
    id: 3,
    title: 'Темный рыцарь',
    year: 2008,
    duration: 152,
    director: 'Кристофер Нолан',
    country: 'США, Великобритания',
    description: 'Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы от преступности, отравляющей город.',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop',
    rating: 9.0,
    genres: [{ id: 1, name: 'Боевик' }, { id: 3, name: 'Драма' }, { id: 5, name: 'Триллер' }],
  },
  {
    id: 4,
    title: 'Побег из Шоушенка',
    year: 1994,
    duration: 142,
    director: 'Фрэнк Дарабонт',
    country: 'США',
    description: 'Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
    rating: 9.3,
    genres: [{ id: 3, name: 'Драма' }],
  },
  {
    id: 5,
    title: 'Форрест Гамп',
    year: 1994,
    duration: 142,
    director: 'Роберт Земекис',
    country: 'США',
    description: 'От лица главного героя Форреста Гампа, слабоумного безобидного человека с благородным и открытым сердцем, рассказывается история его необыкновенной жизни.',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    rating: 8.8,
    genres: [{ id: 3, name: 'Драма' }, { id: 2, name: 'Комедия' }, { id: 7, name: 'Мелодрама' }],
  },
  {
    id: 6,
    title: 'Матрица',
    year: 1999,
    duration: 136,
    director: 'Лана Вачовски, Лилли Вачовски',
    country: 'США',
    description: 'Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, получающий нагоняи от начальства, а ночью превращается в хакера по имени Нео.',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop',
    rating: 8.7,
    genres: [{ id: 4, name: 'Фантастика' }, { id: 1, name: 'Боевик' }],
  },
  {
    id: 7,
    title: 'Криминальное чтиво',
    year: 1994,
    duration: 154,
    director: 'Квентин Тарантино',
    country: 'США',
    description: 'Двое бандитов Винсент Вега и Джулс Винфилд проводят время в философских беседах в перерывах между разборками и решением проблем с должниками криминального босса Марселласа Уоллеса.',
    poster: 'https://images.unsplash.com/photo-1574267432644-f610a4ab1a9c?w=500&h=750&fit=crop',
    rating: 8.9,
    genres: [{ id: 3, name: 'Драма' }, { id: 9, name: 'Детектив' }],
  },
  {
    id: 8,
    title: 'Зеленая миля',
    year: 1999,
    duration: 189,
    director: 'Фрэнк Дарабонт',
    country: 'США',
    description: 'Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
    rating: 8.6,
    genres: [{ id: 3, name: 'Драма' }, { id: 10, name: 'Фэнтези' }],
  },
  {
    id: 9,
    title: 'Бойцовский клуб',
    year: 1999,
    duration: 139,
    director: 'Дэвид Финчер',
    country: 'США, Германия',
    description: 'Сотрудник страховой компании страдает хронической бессонницей и отчаянно пытается вырваться из мучительно скучной жизни. Однажды в очередной командировке он встречает некоего Тайлера Дёрдена.',
    poster: 'https://images.unsplash.com/photo-1549174596-d4c58696f539?w=500&h=750&fit=crop',
    rating: 8.7,
    genres: [{ id: 5, name: 'Триллер' }, { id: 3, name: 'Драма' }],
  },
  {
    id: 10,
    title: 'Властелин колец: Возвращение короля',
    year: 2003,
    duration: 201,
    director: 'Питер Джексон',
    country: 'Новая Зеландия, США',
    description: 'Последняя часть трилогии о Кольце Всевластия и о героях, которые противостояли Злу.',
    poster: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&h=750&fit=crop',
    rating: 8.9,
    genres: [{ id: 10, name: 'Фэнтези' }, { id: 8, name: 'Приключения' }, { id: 3, name: 'Драма' }],
  },
  {
    id: 11,
    title: 'Джокер',
    year: 2019,
    duration: 122,
    director: 'Тодд Филлипс',
    country: 'США',
    description: 'Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «приносить в мир смех». Пытаясь честно зарабатывать на жизнь, Артур сталкивается с миром жестокости.',
    poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=500&h=750&fit=crop',
    rating: 8.4,
    genres: [{ id: 5, name: 'Триллер' }, { id: 3, name: 'Драма' }, { id: 9, name: 'Детектив' }],
  },
  {
    id: 12,
    title: 'Паразиты',
    year: 2019,
    duration: 132,
    director: 'Пон Чжун Хо',
    country: 'Южная Корея',
    description: 'Обычное корейское семейство Кимов жизнь не балует. Приходится жить в сыром грязном полуподвале, воровать интернет у соседей и перебиваться случайными подработками.',
    poster: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=500&h=750&fit=crop',
    rating: 8.5,
    genres: [{ id: 3, name: 'Драма' }, { id: 5, name: 'Триллер' }, { id: 2, name: 'Комедия' }],
  },
];

export const cinemas: Cinema[] = [
  { id: 1, name: 'Галактика', address: 'ул. Красная, 15' },
  { id: 2, name: 'Премьер', address: 'ул. Российская, 267' },
  { id: 3, name: 'Синема Стар', address: 'ул. Уральская, 79' },
  { id: 4, name: 'Киномакс-Атриум', address: 'ул. Гоголя, 147' },
  { id: 5, name: 'Монитор', address: 'ул. Красноармейская, 53' },
  { id: 6, name: 'Аврора', address: 'ул. Северная, 326' },
  { id: 7, name: 'Каро Фильм', address: 'ул. Тургенева, 55' },
];

// Генерируем сеансы для следующих 7 дней
const generateScreenings = (): Screening[] => {
  const screenings: Screening[] = [];
  let screeningId = 1;
  
  const today = new Date();
  
  // Для каждого дня (следующие 7 дней)
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() + day);
    
    // Для каждого кинотеатра
    cinemas.forEach(cinema => {
      // Выбираем случайные 3-5 фильмов для этого кинотеатра
      const moviesCount = Math.floor(Math.random() * 3) + 3;
      const selectedMovies = movies
        .sort(() => Math.random() - 0.5)
        .slice(0, moviesCount);
      
      selectedMovies.forEach(movie => {
        // Для каждого фильма создаем 2-4 сеанса в день
        const sessionsCount = Math.floor(Math.random() * 3) + 2;
        const times = ['10:00', '13:30', '16:00', '19:00', '21:30'];
        
        for (let i = 0; i < sessionsCount; i++) {
          const time = times[Math.floor(Math.random() * times.length)];
          const [hours, minutes] = time.split(':');
          const datetime = new Date(date);
          datetime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          screenings.push({
            id: screeningId++,
            cinemaId: cinema.id,
            movieId: movie.id,
            datetime: datetime.toISOString(),
            price: Math.floor(Math.random() * 200) + 250, // 250-450 руб
          });
        }
      });
    });
  }
  
  return screenings;
};

export const screenings: Screening[] = generateScreenings();

// Mock данные для фильмов пользователя (будет использоваться в AuthContext)
// Рейтинги мигрированы на 10-балльную шкалу
export const mockUserMovies: UserMovie[] = [
  { userId: 1, movieId: 1, status: 'completed', rating: 10 },
  { userId: 1, movieId: 3, status: 'completed', rating: 10 },
  { userId: 1, movieId: 4, status: 'completed', rating: 9 },
  { userId: 1, movieId: 6, status: 'watching', rating: 8 },
  { userId: 1, movieId: 8, status: 'planned' },
  { userId: 1, movieId: 10, status: 'planned' },
  { userId: 1, movieId: 9, status: 'dropped', rating: 4 },
];
