export interface PortfolioVideo {
  id: string
  src: string
  poster: string
  title: string
  aspectRatio: `${number} / ${number}`
}

export const profile = {
  name: 'Ирина Пономарева',
  mark: 'REELS / 26',
  eyebrow: 'Видеопортфолио',
  heading: 'Реклама, которую забыли пролистнуть.',
  description:
    'Снимаю короткие видео, которые естественно выглядят в ленте, но собраны вокруг одной задачи: показать продукт так, чтобы его захотелось примерить, попробовать или заказать.',
  telegram: 'https://t.me/irenpo',
  telegramName: '@irenpo',
  phone: '+79267088226',
  phoneLabel: '+7 926 708-82-26',
  footerEyebrow: 'Есть идея?',
  footerHeading: ['Ваш продукт — в кадр.', 'Покупателя — в директ.'],
}

// Порядок элементов здесь определяет порядок карточек в галерее.
// Замените демонстрационные пути своими файлами из public/videos и public/posters.
export const videos: PortfolioVideo[] = [
  { id: 'portfolio-05', src: './videos/portfolio-05.mp4', poster: './posters/portfolio-05.webp', title: 'Работа 05', aspectRatio: '16 / 9' },
  { id: 'portfolio-01', src: './videos/portfolio-01.mp4', poster: './posters/portfolio-01.webp', title: 'Работа 01', aspectRatio: '9 / 16' },
  { id: 'portfolio-02', src: './videos/portfolio-02.mp4', poster: './posters/portfolio-02.webp', title: 'Работа 02', aspectRatio: '9 / 16' },
  { id: 'portfolio-03', src: './videos/portfolio-03.mp4', poster: './posters/portfolio-03.webp', title: 'Работа 03', aspectRatio: '9 / 16' },
  { id: 'portfolio-04', src: './videos/portfolio-04.mp4', poster: './posters/portfolio-04.webp', title: 'Работа 04', aspectRatio: '4 / 5' },
  { id: 'portfolio-06', src: './videos/portfolio-06.mp4', poster: './posters/portfolio-06.webp', title: 'Работа 06', aspectRatio: '9 / 16' },
  { id: 'portfolio-07', src: './videos/portfolio-07.mp4', poster: './posters/portfolio-07.webp', title: 'Работа 07', aspectRatio: '9 / 16' },
  { id: 'portfolio-08', src: './videos/portfolio-08.mp4', poster: './posters/portfolio-08.webp', title: 'Работа 08', aspectRatio: '9 / 16' },
  { id: 'portfolio-09', src: './videos/portfolio-09.mp4', poster: './posters/portfolio-09.webp', title: 'Работа 09', aspectRatio: '1054 / 1980' },
]

export const medicalProfile = {
  name: 'Ирина Пономарева',
  mark: 'MED / REELS',
  eyebrow: 'Видеоконтент для клиник',
  heading: 'Медицина, которую не пролистывают.',
  description:
    'Снимаю рилс для клиник и врачей: показываю сложные процедуры, операции и экспертные объяснения понятно, точно и без медицинского канцелярита.',
  telegram: 'https://t.me/irenpo',
  telegramName: '@irenpo',
  phone: '+79267088226',
  phoneLabel: '+7 926 708-82-26',
  footerEyebrow: 'Есть экспертиза?',
  footerHeading: ['Экспертизу — в кадр.', 'Пациента — на консультацию.'],
}

export const medicalVideos: PortfolioVideo[] = [
  { id: 'medical-01', src: '../medical-videos/medical-01.mp4', poster: '../medical-posters/medical-01.webp', title: 'PRP-терапия', aspectRatio: '1054 / 1920' },
  { id: 'medical-02', src: '../medical-videos/medical-02.mp4', poster: '../medical-posters/medical-02.webp', title: 'Инсульт', aspectRatio: '1056 / 1920' },
  { id: 'medical-03', src: '../medical-videos/medical-03.mp4', poster: '../medical-posters/medical-03.webp', title: 'Коррекция косоглазия', aspectRatio: '1054 / 1920' },
  { id: 'medical-04', src: '../medical-videos/medical-04.mp4', poster: '../medical-posters/medical-04.webp', title: 'ЛОР и стоматологическая операция', aspectRatio: '1054 / 1920' },
  { id: 'medical-05', src: '../medical-videos/medical-05.mp4', poster: '../medical-posters/medical-05.webp', title: 'Операция на мозге', aspectRatio: '1054 / 1920' },
  { id: 'medical-06', src: '../medical-videos/medical-06.mp4', poster: '../medical-posters/medical-06.webp', title: 'Инфузионная помпа', aspectRatio: '1054 / 1920' },
]
