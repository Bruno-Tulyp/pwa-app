import { faker } from "@faker-js/faker"

export const generateJob = () => ({
  id: faker.string.uuid(),
  jobName: faker.person.jobTitle(),
  jobDescription: faker.lorem.paragraphs(3),
  salary: faker.number.int({ min: 1800, max: 3500 }).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }),
  skills: [
    faker.word.adjective(),
    faker.word.adjective(),
    faker.word.adjective(),
  ],
  publishDate: new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
  }).format(faker.date.past()),
})
