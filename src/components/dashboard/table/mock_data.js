import { faker } from "@faker-js/faker/locale/en";

export const lineChartData = [
  {
    id: "japan",
    color: "hsl(25, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 208,
      },
      {
        x: "helicopter",
        y: 87,
      },
      {
        x: "boat",
        y: 37,
      },
      {
        x: "train",
        y: 15,
      },
      {
        x: "subway",
        y: 135,
      },
    ],
  },
];

export function fakeData() {
  const eGFR = Math.floor(Math.random() * 100);

  const IDWG = (Math.random() * (10 - 1) + 1).toFixed(1) + "%";

  const dryWeight = Math.floor(Math.random() * (100 - 39) + 39);

  const IDH = ["Y", "N"][(Math.random() * 2) << 0];

  const status = ["CKD", "non-CKD"][(Math.random() * 2) << 0];

  const primaryCare = faker.name.fullName(
    faker.name.firstName(),
    faker.name.lastName()
  );

  return {
    status,
    eGFR,
    IDWG,
    dryWeight,
    IDH,
    primaryCare,
  };
}
