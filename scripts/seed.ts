
const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      {
        name: "5th Class",
        subCategories: {
          create: [
            { name: "Science" },
            { name: "Mathematics" },
            { name: "Social Studies" },
            { name: "Language" },
          ],
        },
      },
      {
        name: "6th Class",
        subCategories: {
          create: [
            { name: "Science" },
            { name: "Mathematics" },
            { name: "History" },
            { name: "Civics" },
            { name: "Geography"},
            { name: "Language"},
          ],
        },
      },
      {
        name: "7th Class",
        subCategories: {
          create: [
            { name: "Science" },
            { name: "Mathematics" },
            { name: "History" },
            { name: "Civics" },
            { name: "Geography"},
            { name: "Language"},
          ],
        },
      },
      {
        name: "8th Class",
        subCategories: {
          create: [
            { name: "Science" },
            { name: "Mathematics" },
            { name: "History" },
            { name: "Economics" },
            { name: "Geography"},
            { name: "Language"},
          ],
        },
      },
      {
        name: "9th Class",
        subCategories: {
          create: [
            { name: "Physics" },
            { name: "Chemistry" },
            { name: "Biology" },
            { name: "Mathematics" },
            { name: "History" },
            { name: "Civics" },
            { name: "Geography"},
            { name: "Language"},
          ],
        },
      },
      {
        name: "10th Class",
        subCategories: {
          create: [
            { name: "Physics" },
            { name: "Chemistry" },
            { name: "Biology" },
            { name: "Mathematics" },
            { name: "History" },
            { name: "Civics" },
            { name: "Geography"},
            { name: "Language"},
          ],
        },
      },
      {
        name: "11th Class",
        subCategories: {
          create: [
            { name: "Physics" },
            { name: "Chemistry" },
            { name: "Biology" },
            { name: "Mathematics" },
            { name: "Language"},
            { name: "Accountancy"},
            { name: "Economics"},
            { name: "Business Studies"},
            { name: "Computer Science"},
          ],
        },
      },
      
      {
        name: "12th Class",
        subCategories: {
          create: [
            { name: "Physics" },
            { name: "Chemistry" },
            { name: "Biology" },
            { name: "Mathematics" },
            { name: "Language"},
            { name: "Accountancy"},
            { name: "Economics"},
            { name: "Business Studies"},
            { name: "Computer Science"},
          ],
        },
      },
      {
        name: "Engineering",
        subCategories: {
          create: [
            { name: "CS / IT" },
            { name: "Electronics / Electrical" },
            { name: "Mechanical Engineering"},
            { name: "Civil Engineering"},
            { name: "Automobile Engineering"},
            { name: "Others"},
          ],
        },
      },
    ];

    // Sequentially create each category with its subcategories
    for (const category of categories) {
      await database.category.create({
        data: {
          name: category.name,
          subCategories: category.subCategories,
        },
        include: {
          subCategories: true,
        },
      });
    }

    await database.level.createMany({
      data: [
        { name: "Beginner" },
        { name: "Intermediate" },
        { name: "Expert" },
        { name: "All levels" },
      ],
    });

    console.log("Seeding successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  } finally {
    await database.$disconnect();
  }
}

main();
