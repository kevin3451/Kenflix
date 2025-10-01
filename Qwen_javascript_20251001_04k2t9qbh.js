const Movie = require('../models/Movie');

const publicDomainMovies = [
  {
    title: "Night of the Living Dead",
    year: 1968,
    description: "A ragtag group of Pennsylvanians barricade themselves in an old farmhouse to remain safe from a bloodthirsty, flesh-eating breed of monsters who are ravaging the East Coast of the United States.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/7b/Night_of_the_Living_Dead_poster.jpg",
    streamingUrl: "https://archive.org/download/NightOfTheLivingDead1968/NightOfTheLivingDead1968_512kb.mp4",
    category: "Horror"
  },
  {
    title: "Metropolis",
    year: 1927,
    description: "In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working-class prophet who predicts the coming of a savior to mediate their differences.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/7d/Metropolisposter.jpg",
    streamingUrl: "https://archive.org/download/Metropolis_1927/Metropolis_1927_512kb.mp4",
    category: "Sci-fi"
  },
  {
    title: "His Girl Friday",
    year: 1940,
    description: "A newspaper editor uses every trick in the book to keep his ace reporter ex-wife from remarrying.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/His_Girl_Friday_poster.jpg",
    streamingUrl: "https://archive.org/download/his-girl-friday-1940/HIS_GIRL_FRIDAY_1940_512kb.mp4",
    category: "Comedy"
  },
  {
    title: "Sherlock Holmes",
    year: 1916,
    description: "Sherlock Holmes matches wits with Professor Moriarty in this silent film adaptation.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/3/3f/Sherlock_Holmes_1916_film_poster.jpg",
    streamingUrl: "https://archive.org/download/SherlockHolmes1916/SherlockHolmes1916_512kb.mp4",
    category: "Classics"
  },
  {
    title: "Nosferatu",
    year: 1922,
    description: "Vampire Count Orlok expresses interest in a new residence and real estate agent Hutter's wife.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Nosferatu.jpg",
    streamingUrl: "https://archive.org/download/Nosferatu_1922/Nosferatu_1922_512kb.mp4",
    category: "Horror"
  },
  {
    title: "Plan 9 from Outer Space",
    year: 1959,
    description: "Aliens resurrect the dead to stop humanity from creating the 'Solaranite' bomb.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Plan_9_from_Outer_Space_poster.jpg",
    streamingUrl: "https://archive.org/download/Plan9FromOuterSpace/Plan9FromOuterSpace_512kb.mp4",
    category: "Sci-fi"
  },
  {
    title: "The Kid",
    year: 1921,
    description: "The Tramp cares for an abandoned child, but events put that relationship in jeopardy.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/5/5c/The_Kid_1921_poster.jpg",
    streamingUrl: "https://archive.org/download/TheKid1921/TheKid1921_512kb.mp4",
    category: "Comedy"
  },
  {
    title: "Gulliver's Travels",
    year: 1939,
    description: "Gulliver washes ashore in Lilliput and attempts to prevent war between that tiny kingdom and its equally-minuscule rival, Blefuscu.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/8/8c/Gullivers_Travels_1939_poster.jpg",
    streamingUrl: "https://archive.org/download/GulliversTravels1939/GulliversTravels1939_512kb.mp4",
    category: "Classics"
  },
  {
    title: "The General",
    year: 1926,
    description: "When Union spies steal an engineer's beloved locomotive, he pursues it single-handedly and straight through enemy lines.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/5/5e/The_General_1926_poster.jpg",
    streamingUrl: "https://archive.org/download/TheGeneral1926/TheGeneral1926_512kb.mp4",
    category: "Action"
  },
  {
    title: "House on Haunted Hill",
    year: 1959,
    description: "A millionaire offers $10,000 to five people who agree to be locked in a large, spooky house overnight with him and his wife.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/3/3f/House_on_Haunted_Hill_poster.jpg",
    streamingUrl: "https://archive.org/download/HouseOnHauntedHill1959/HouseOnHauntedHill1959_512kb.mp4",
    category: "Horror"
  }
];

const seedMovies = async () => {
  try {
    await Movie.deleteMany({});
    await Movie.insertMany(publicDomainMovies);
    console.log('Public domain movies seeded successfully');
  } catch (error) {
    console.error('Error seeding movies:', error);
  }
};

module.exports = seedMovies;