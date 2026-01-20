export type Body = "Hatch" | "Moto" | "Picape" | "Sedan" | "SUV" | "Utilitario";

export type Vehicle = {
  id: number;
  make: string;
  model: string;
  name: string;
  year: number;
  km: number;
  fuel: "Flex" | "Gasolina" | "Diesel" | "Elétrico";
  armor: "Não" | "Nível III-A";
  color: "Preto" | "Branco" | "Prata" | "Cinza" | "Azul" | "Vermelho";
  body: Body;
  image: string;
  images: string[];
};

const imgPool = [
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
] as const;

// Pool adicional de imagens para o carrossel
const carouselImgPool = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
];

const makesAndModels = [
  { make: "Jeep", models: ["Compass", "Renegade"] },
  { make: "Toyota", models: ["Corolla", "Hilux"] },
  { make: "Honda", models: ["Civic", "HR-V"] },
  { make: "Volkswagen", models: ["T-Cross", "Golf"] },
  { make: "Hyundai", models: ["Creta", "HB20"] },
  { make: "BMW", models: ["X5", "320i"] },
] as const;

const colors: Vehicle["color"][] = ["Preto", "Branco", "Prata", "Cinza", "Azul", "Vermelho"];
const fuels: Vehicle["fuel"][] = ["Flex", "Gasolina", "Diesel", "Elétrico"];
const armors: Vehicle["armor"][] = ["Não", "Nível III-A"];

function guessBody(make: string, model: string): Body {
  const match = `${make} ${model}`.toLowerCase();
  if (match.includes("hilux")) return "Picape";
  if (match.includes("golf") || match.includes("hb20")) return "Hatch";
  if (match.includes("corolla") || match.includes("civic") || match.includes("320")) return "Sedan";
  if (match.includes("x5") || match.includes("compass") || match.includes("renegade") || match.includes("hr-v")) return "SUV";
  return "Utilitario";
}

function generateVehicles(count = 120): Vehicle[] {
  const list: Vehicle[] = [];
  for (let i = 0; i < count; i++) {
    const mm = makesAndModels[i % makesAndModels.length];
    const model = mm.models[i % mm.models.length];
    const year = 2014 + (i % 12); // 2014..2025
    const fuel = fuels[i % fuels.length];
    const armor = armors[(i + 1) % armors.length];
    const color = colors[i % colors.length];
    const km = (i * 2397) % 150000;
    const image = imgPool[i % imgPool.length];
    const body = guessBody(mm.make, model);
    const name = armor === "Nível III-A" ? `${mm.make} ${model} Blindado` : `${mm.make} ${model}`;

    // Gera array de imagens para o carrossel (3-5 imagens por veículo)
    const numImages = 3 + (i % 3); // 3, 4 ou 5 imagens
    const images: string[] = [image];
    for (let j = 1; j < numImages; j++) {
      images.push(carouselImgPool[(i + j) % carouselImgPool.length]);
    }

    list.push({
      id: i + 1,
      make: mm.make,
      model,
      name,
      year,
      km,
      fuel,
      armor,
      color,
      body,
      image,
      images,
    });
  }

  const motoImages = [
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80",
  ];
  list.push(
    {
      id: count + 1,
      make: "Honda",
      model: "CG 160",
      name: "Honda CG 160",
      year: 2023,
      km: 4500,
      fuel: "Flex",
      armor: "Não",
      color: "Azul",
      body: "Moto",
      image: motoImages[0],
      images: motoImages,
    },
    {
      id: count + 2,
      make: "Yamaha",
      model: "Fazer 250",
      name: "Yamaha Fazer 250",
      year: 2022,
      km: 9800,
      fuel: "Gasolina",
      armor: "Não",
      color: "Preto",
      body: "Moto",
      image: motoImages[0],
      images: motoImages,
    }
  );

  return list;
}

export const vehicles = generateVehicles(120);
