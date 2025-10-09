export const mockUsers = [
  { email: "user@test.com", password: "1234", name: "IanCho" },
];

export const mockGames = [
  { id: 1, title: "Juego 1", price: 0, img: "https://picsum.photos/300/200?random=1"},
  { id: 2, title: "Juego 2", price: 0, img: "https://picsum.photos/300/200?random=2"},
  { id: 3, title: "Juego 3", price: 0, img: "https://picsum.photos/300/200?random=3"},
];

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


