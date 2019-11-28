const offersMock = [
  {
    idoffer: 1,
    title: "Pantalon",
    subtitle: "Jean Hombre",
    image: "../src/frontend/assets/static/products/PANTALONES.jpg",
    priceorig: 90000,
    price: 65000,
  },
  {
    idoffer: 2,
    title: "Camiseta",
    subtitle: "Polo",
    image: "../src/frontend/assets/static/products/CAMISETA.jpg",
    priceorig: 80000,
    price: 50000,
  },
  {
    idoffer: 3,
    title: "Discos",
    subtitle: "Latin Music",
    image: "../src/frontend/assets/static/products/DISCOS.jpg",
    priceorig: 50000,
    price: 20000,
  },
  {
    idoffer: 4,
    title: "Gorras",
    subtitle: "Avengers",
    image: "../src/frontend/assets/static/products/GORRAS.jpg",
    priceorig: 30000,
    price: 22000,
  },
  {
    idoffer: 5,
    title: "Mugs",
    subtitle: "Giff Love",
    image: "../src/frontend/assets/static/products/MUGS.jpg",
    priceorig: 20000,
    price: 15000,
  },
  {
    idoffer: 6,
    title: "Tennis Fashion",
    subtitle: "Casual",
    image: "../src/frontend/assets/static/products/TENIS.jpg",
    priceorig: 320000,
    price: 250000,
  },
  {
    idoffer: 7,
    title: "Acetato",
    subtitle: "Vintange",
    image: "../src/frontend/assets/static/products/VINILO.jpg",
    priceorig: 55000,
    price: 35000,
  },
];

///crer para test
function filteredOffersMock(tag) {
  return offersMock.filter(offer => offer.tags.includes(tag))
}

class OffersServiceMock {
  async getOfers() {
    return Promise.resolve(offersMock)
  }
  async createOffers() {
    return Promise.resolve(offersMock[0])
  }
}

module.exports = {
  offersMock,
  filteredOffersMock,
  OffersServiceMock
}