const newsMock = [
  {
    id: 1,
    title: "Evokando",
    subtitle: "Banda de Regge Music",
    autor: "Daniel M",
    active: true,
    cover: "evokando.jpg",
    source: "evokando.pdf",
    type: "Banner"
  },
  {
    id: 2,
    title: "Anapoiland Experience",
    subtitle: "Relax & Sound",
    autor: "Daniel M",
    active: true,
    cover: "../src/frontend/assets/covers/asteroid anapoima.jpg",
    source: "../src/frontend/assets/covers/asteroid anapoima.jpg",
    type: "Video"
  },
  {
    id: 3,
    title: "La Serenata",
    subtitle: "",
    autor: "Seridores de La Madre Tierra",
    active: true,
    cover: "../src/frontend/assets/covers/la serenata portada 1.png",
    source: "../src/frontend/assets/videos/La serenata Videoclip Oficial.mp4",
    type: "Video"
  },
  {
    id: 4,
    title: "Promoción",
    subtitle: "50% descuento productos de la Banda",
    autor: "Daniel M",
    active: true,
    cover: "../src/frontend/assets/static/promo 2.jpg",
    source: "evokando.pdf",
    type: "Banner"
  }
];

///crer para test
function filteredNewsMock(tag) {
  return newsMock.filter(movie => movie.tags.includes(tag))
}

class NewsServiceMock {
  async getNews() {
    return Promise.resolve(newsMock)
  }
  async createNews() {
    return Promise.resolve(newsMock[0])
  }
}

module.exports = {
  newsMock,
  filteredNewsMock,
  NewsServiceMock
}