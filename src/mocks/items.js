import { faker } from '@faker-js/faker'

const items = Array.from({ length: 100 }).map(() => ({
  id: faker.string.uuid(),
  aggregate: faker.helpers.arrayElement([true, false]),
  assetTag: faker.string.numeric({ length: 10}),
  assetTagSAMP: faker.string.numeric({ length: 10 }),
  itemNumber: faker.string.numeric({ length: 11 }),
  name: faker.commerce.productName(),
  status: faker.helpers.arrayElement(['registered', 'inactive']),
  acquisitionValue: faker.commerce.price(),
  acquisitionDate: faker.date.past(),
  linkedAsset: faker.helpers.arrayElement([true, false])
}));

export default items;
