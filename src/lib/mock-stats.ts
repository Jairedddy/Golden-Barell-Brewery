/**
 * Mock Brewery Statistics Data
 * 
 * Provides realistic mock data for brewery analytics and storytelling.
 * Later, this can be replaced with real data from POS or reservation systems.
 */

export interface BeerStyle {
  name: string;
  percentage: number;
  abv: number;
  color: string;
}

export interface HourlyData {
  hour: string;
  visitors: number;
  label: string;
}

export interface SeasonalData {
  season: string;
  percentage: number;
  beers: string[];
}

export interface MonthlyGrowth {
  month: string;
  growth: number;
  visitors: number;
}

export interface ABVRange {
  range: string;
  count: number;
  percentage: number;
}

// Most Loved Beer Styles
export const mostLovedStyles: BeerStyle[] = [
  { name: 'IPA', percentage: 28, abv: 6.5, color: 'hsl(45, 85%, 60%)' },
  { name: 'Stout', percentage: 22, abv: 7.2, color: 'hsl(30, 80%, 55%)' },
  { name: 'Lager', percentage: 18, abv: 5.0, color: 'hsl(40, 75%, 50%)' },
  { name: 'Pale Ale', percentage: 15, abv: 5.5, color: 'hsl(35, 70%, 45%)' },
  { name: 'Wheat', percentage: 10, abv: 5.2, color: 'hsl(25, 65%, 40%)' },
  { name: 'Porter', percentage: 7, abv: 6.0, color: 'hsl(20, 60%, 35%)' },
];

// Peak Visiting Hours (24-hour format)
export const peakVisitingHours: HourlyData[] = [
  { hour: '11', visitors: 15, label: '11 AM' },
  { hour: '12', visitors: 28, label: '12 PM' },
  { hour: '13', visitors: 42, label: '1 PM' },
  { hour: '14', visitors: 55, label: '2 PM' },
  { hour: '15', visitors: 68, label: '3 PM' },
  { hour: '16', visitors: 72, label: '4 PM' },
  { hour: '17', visitors: 85, label: '5 PM' },
  { hour: '18', visitors: 92, label: '6 PM' },
  { hour: '19', visitors: 88, label: '7 PM' },
  { hour: '20', visitors: 75, label: '8 PM' },
  { hour: '21', visitors: 58, label: '9 PM' },
  { hour: '22', visitors: 35, label: '10 PM' },
];

// Seasonal Favorites
export const seasonalFavorites: SeasonalData[] = [
  {
    season: 'Spring',
    percentage: 24,
    beers: ['Hoppy IPA', 'Light Lager', 'Citrus Wheat'],
  },
  {
    season: 'Summer',
    percentage: 32,
    beers: ['Crisp Pilsner', 'Refreshing Wheat', 'Session IPA'],
  },
  {
    season: 'Fall',
    percentage: 28,
    beers: ['Amber Ale', 'Pumpkin Spice Stout', 'Harvest IPA'],
  },
  {
    season: 'Winter',
    percentage: 16,
    beers: ['Rich Stout', 'Barrel-Aged Porter', 'Spiced Ale'],
  },
];

// Monthly Growth (last 6 months)
export const monthlyGrowth: MonthlyGrowth[] = [
  { month: 'Jan', growth: 12, visitors: 1240 },
  { month: 'Feb', growth: 18, visitors: 1463 },
  { month: 'Mar', growth: 15, visitors: 1682 },
  { month: 'Apr', growth: 22, visitors: 2052 },
  { month: 'May', growth: 28, visitors: 2626 },
  { month: 'Jun', growth: 25, visitors: 3283 },
];

// ABV Distribution
export const abvDistribution: ABVRange[] = [
  { range: '4-5%', count: 8, percentage: 22 },
  { range: '5-6%', count: 12, percentage: 33 },
  { range: '6-7%', count: 10, percentage: 28 },
  { range: '7-8%', count: 5, percentage: 14 },
  { range: '8%+', count: 1, percentage: 3 },
];

// Helper function to format percentage
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

// Helper function to format visitors
export const formatVisitors = (value: number): string => {
  return value.toLocaleString();
};

