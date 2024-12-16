import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

const seedDatabase = async () => {
  try {
    const directorData = [
      { name: 'Christopher Nolan' },
      { name: 'Steven Spielberg' },
      { name: 'Martin Scorsese' },
      { name: 'Quentin Tarantino' },
      { name: 'James Cameron' },
      { name: 'Ridley Scott' },
      { name: 'Alfred Hitchcock' },
      { name: 'Stanley Kubrick' },
      { name: 'Francis Ford Coppola' },
      { name: 'Peter Jackson' },
    ];

    const directors = await Promise.all(
      directorData.map((director) => prisma.director.create({ data: director }))
    );

    console.log(`Seeded ${directors.length} directors.`);

    const movieData = [
      { title: 'Inception', director_id: directors[0].id, duration: 148, year: 2010, rating: 8.8 },
      { title: 'Interstellar', director_id: directors[0].id, duration: 169, year: 2014, rating: 8.6 },
      { title: 'Jurassic Park', director_id: directors[1].id, duration: 127, year: 1993, rating: 8.1 },
      { title: 'Schindler’s List', director_id: directors[1].id, duration: 195, year: 1993, rating: 9.0 },
      { title: 'The Irishman', director_id: directors[2].id, duration: 209, year: 2019, rating: 7.8 },
      { title: 'Goodfellas', director_id: directors[2].id, duration: 146, year: 1990, rating: 8.7 },
      { title: 'Pulp Fiction', director_id: directors[3].id, duration: 154, year: 1994, rating: 8.9 },
      { title: 'Django Unchained', director_id: directors[3].id, duration: 165, year: 2012, rating: 8.4 },
      { title: 'Avatar', director_id: directors[4].id, duration: 162, year: 2009, rating: 7.8 },
      { title: 'Titanic', director_id: directors[4].id, duration: 195, year: 1997, rating: 7.9 },
      { title: 'Gladiator', director_id: directors[5].id, duration: 155, year: 2000, rating: 8.5 },
      { title: 'The Martian', director_id: directors[5].id, duration: 144, year: 2015, rating: 8.0 },
      { title: 'Psycho', director_id: directors[6].id, duration: 109, year: 1960, rating: 8.5 },
      { title: 'Rear Window', director_id: directors[6].id, duration: 112, year: 1954, rating: 8.5 },
      { title: '2001: A Space Odyssey', director_id: directors[7].id, duration: 149, year: 1968, rating: 8.3 },
      { title: 'The Shining', director_id: directors[7].id, duration: 146, year: 1980, rating: 8.4 },
      { title: 'The Godfather', director_id: directors[8].id, duration: 175, year: 1972, rating: 9.2 },
      { title: 'Apocalypse Now', director_id: directors[8].id, duration: 147, year: 1979, rating: 8.4 },
      { title: 'The Lord of the Rings: The Fellowship of the Ring', director_id: directors[9].id, duration: 178, year: 2001, rating: 8.8 },
      { title: 'The Hobbit: An Unexpected Journey', director_id: directors[9].id, duration: 169, year: 2012, rating: 7.8 },
    ];

    const movies = await Promise.all(
      movieData.map((movie) => prisma.movie.create({ data: movie }))
    );

    console.log(`Seeded ${movies.length} movies.`);
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
