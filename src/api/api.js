export const mockUsers = [
  { email: "user@test.com", password: "1234", name: "IanCho" },
];

export const mockGames = [
  {
    id: 1,
    name: "Pampean Adventures",
    price: 0,
    release_date: "2023-05-12",
    thumbnail: "https://picsum.photos/300/200?random=1",
    description: "Explorá las pampas argentinas en este juego de aventuras donde la naturaleza y la historia se mezclan. Descubrí secretos de gauchos, animales y leyendas locales.",
    is_free: true,
    created_at: "2023-04-20",
    uploaded_at: "2023-05-10",
    developer_id: "DEV001",
    editor_id: "ED001",
    is_published: true
  },
  {
    id: 2,
    name: "Tango Rush",
    price: 0,
    release_date: "2024-02-14",
    thumbnail: "https://picsum.photos/300/200?random=2",
    description: "Un juego rítmico ambientado en Buenos Aires. Seguís el compás del bandoneón mientras esquivás peatones y taxis para mantener el ritmo del tango porteño.",
    is_free: true,
    created_at: "2024-01-28",
    uploaded_at: "2024-02-10",
    developer_id: "DEV002",
    editor_id: "ED002",
    is_published: true
  },
  {
    id: 3,
    name: "Mate Defender",
    price: 0,
    release_date: "2022-11-01",
    thumbnail: "https://picsum.photos/300/200?random=3",
    description: "Defendé tu mate de las fuerzas del frío y la rutina. Recolectá yerba, agua caliente y amigos para mantener el ritual vivo en este divertido tower defense criollo.",
    is_free: true,
    created_at: "2022-10-15",
    uploaded_at: "2022-10-30",
    developer_id: "DEV003",
    editor_id: "ED001",
    is_published: true
  },
  {
    id: 4,
    name: "Subte Survival",
    price: 0,
    release_date: "2023-09-30",
    thumbnail: "https://picsum.photos/300/200?random=4",
    description: "Sobreviví al caos del subte porteño en hora pico. Conseguí asiento, esquivá vendedores y mantené tu SUBE con saldo para llegar a destino sano y salvo.",
    is_free: true,
    created_at: "2023-08-20",
    uploaded_at: "2023-09-10",
    developer_id: "DEV004",
    editor_id: "ED003",
    is_published: true
  },
  {
    id: 5,
    name: "Asado Simulator",
    price: 0,
    release_date: "2024-12-10",
    thumbnail: "https://picsum.photos/300/200?random=5",
    description: "Convertite en el maestro parrillero definitivo. Controlá el fuego, elegí los mejores cortes y hacé felices a tus amigos en el simulador de asado más realista del país.",
    is_free: true,
    created_at: "2024-11-25",
    uploaded_at: "2024-12-05",
    developer_id: "DEV005",
    editor_id: "ED002",
    is_published: true
  }
]

export function loginAPI(email, password) {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      user ? resolve(user) : reject("Credenciales incorrectas");
    }, 600);
  });
}

export function fetchGames() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGames), 600);
  });
}


