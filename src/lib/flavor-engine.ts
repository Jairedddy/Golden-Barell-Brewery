import { z } from 'zod';

// Taste profile schema
export const tasteProfileSchema = z.object({
  bitterness: z.number().min(0).max(10), // 0 = not bitter, 10 = very bitter
  sweetness: z.number().min(0).max(10), // 0 = not sweet, 10 = very sweet
  roast: z.number().min(0).max(10), // 0 = light, 10 = dark/roasted
  citrus: z.number().min(0).max(10), // 0 = no citrus, 10 = very citrusy
});

export type TasteProfile = z.infer<typeof tasteProfileSchema>;

// Beer interface with taste profile
export interface BeerProfile {
  id: number;
  name: string;
  description: string;
  abv: string;
  price: string;
  style: string;
  tasteProfile: TasteProfile;
  foodPairings: string[];
}

// Beer database with taste profiles
export const beerDatabase: BeerProfile[] = [
  {
    id: 15,
    name: 'Golden Barrel Lager',
    description: 'Our signature crisp lager with honey notes and a smooth finish.',
    abv: '4.8%',
    price: '$8',
    style: 'Lager',
    tasteProfile: {
      bitterness: 2,
      sweetness: 5,
      roast: 1,
      citrus: 2,
    },
    foodPairings: ['Beer Cheese Fondue', 'Pretzel Bites', 'Grilled Chicken'],
  },
  {
    id: 16,
    name: 'Copper Creek IPA',
    description: 'Hoppy India Pale Ale bursting with citrus and pine aromatics.',
    abv: '6.2%',
    price: '$9',
    style: 'IPA',
    tasteProfile: {
      bitterness: 9,
      sweetness: 2,
      roast: 1,
      citrus: 9,
    },
    foodPairings: ['Smoked Wings', 'Spicy Foods', 'Burgers'],
  },
  {
    id: 17,
    name: 'Midnight Porter',
    description: 'Rich, dark porter with decadent chocolate and coffee undertones.',
    abv: '5.5%',
    price: '$9',
    style: 'Porter',
    tasteProfile: {
      bitterness: 4,
      sweetness: 7,
      roast: 9,
      citrus: 0,
    },
    foodPairings: ['Chocolate Desserts', 'Grilled Steak', 'Smoked Meats'],
  },
  {
    id: 18,
    name: 'Harvest Wheat',
    description: 'Light and refreshing wheat beer with subtle spice notes and citrus.',
    abv: '4.5%',
    price: '$8',
    style: 'Wheat',
    tasteProfile: {
      bitterness: 2,
      sweetness: 4,
      roast: 1,
      citrus: 6,
    },
    foodPairings: ['Salads', 'Seafood', 'Light Appetizers'],
  },
  {
    id: 19,
    name: 'Amber Ale',
    description: 'Smooth amber ale with caramel malt sweetness and balanced hops.',
    abv: '5.2%',
    price: '$8',
    style: 'Amber Ale',
    tasteProfile: {
      bitterness: 4,
      sweetness: 6,
      roast: 3,
      citrus: 2,
    },
    foodPairings: ['Burgers', 'BBQ', 'Pizza'],
  },
  {
    id: 20,
    name: 'Stout Imperial',
    description: 'Bold imperial stout with roasted malt, dark chocolate, and vanilla.',
    abv: '8.5%',
    price: '$10',
    style: 'Imperial Stout',
    tasteProfile: {
      bitterness: 5,
      sweetness: 8,
      roast: 10,
      citrus: 0,
    },
    foodPairings: ['Rich Desserts', 'Chocolate Cake', 'Strong Cheeses'],
  },
  {
    id: 21,
    name: 'Pale Ale',
    description: 'Classic American pale ale with floral hops and biscuit malt.',
    abv: '5.0%',
    price: '$8',
    style: 'Pale Ale',
    tasteProfile: {
      bitterness: 6,
      sweetness: 3,
      roast: 2,
      citrus: 5,
    },
    foodPairings: ['Pizza', 'Fried Foods', 'Pub Fare'],
  },
];

/**
 * Calculate similarity score between user profile and beer profile
 */
function calculateSimilarity(userProfile: TasteProfile, beerProfile: TasteProfile): number {
  const bitternessDiff = Math.abs(userProfile.bitterness - beerProfile.bitterness);
  const sweetnessDiff = Math.abs(userProfile.sweetness - beerProfile.sweetness);
  const roastDiff = Math.abs(userProfile.roast - beerProfile.roast);
  const citrusDiff = Math.abs(userProfile.citrus - beerProfile.citrus);

  // Weighted average (lower difference = higher score)
  // Each dimension contributes equally
  const totalDiff = bitternessDiff + sweetnessDiff + roastDiff + citrusDiff;
  const maxDiff = 40; // Maximum possible difference (10 * 4 dimensions)
  
  // Convert to similarity score (0-100, higher is better)
  const similarity = ((maxDiff - totalDiff) / maxDiff) * 100;
  
  return Math.round(similarity);
}

/**
 * Find top 3 beers matching user's taste profile
 */
export function findMatchingBeers(userProfile: TasteProfile): BeerProfile[] {
  const beersWithScores = beerDatabase.map(beer => ({
    beer,
    score: calculateSimilarity(userProfile, beer.tasteProfile),
  }));

  // Sort by score (highest first) and take top 3
  return beersWithScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.beer);
}

/**
 * Get recommended food pairing based on top beer
 */
export function getRecommendedPairing(topBeer: BeerProfile): string {
  return topBeer.foodPairings[0] || 'Our Chef\'s Special';
}

/**
 * Generate taste profile description
 */
export function getTasteProfileDescription(profile: TasteProfile): string {
  const traits: string[] = [];

  if (profile.bitterness >= 7) traits.push('Bold & Bitter');
  else if (profile.bitterness <= 3) traits.push('Smooth & Mild');

  if (profile.sweetness >= 7) traits.push('Sweet');
  else if (profile.sweetness <= 3) traits.push('Dry');

  if (profile.roast >= 7) traits.push('Dark & Roasted');
  else if (profile.roast <= 3) traits.push('Light & Crisp');

  if (profile.citrus >= 7) traits.push('Citrusy');
  else if (profile.citrus <= 3) traits.push('Malty');

  return traits.length > 0 ? traits.join(', ') : 'Well-Balanced';
}

/**
 * Convert quiz answers to taste profile
 */
export function answersToProfile(answers: {
  bitterness: number;
  sweetness: number;
  roast: number;
  citrus: number;
}): TasteProfile {
  return {
    bitterness: answers.bitterness,
    sweetness: answers.sweetness,
    roast: answers.roast,
    citrus: answers.citrus,
  };
}

