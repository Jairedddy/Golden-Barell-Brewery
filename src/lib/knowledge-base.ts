/**
 * Golden Barrel Brewery Knowledge Base
 * 
 * Structured data for the chatbot to answer questions about
 * the brewery, menu, hours, events, and more.
 */

export interface Beer {
  name: string;
  description: string;
  abv: string;
  price: string;
  style?: string;
}

export interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  tags?: string[];
}

export const knowledgeBase = {
  brewery: {
    name: 'Golden Barrel Brewery',
    tagline: 'Liquid Gold Since 2010',
  },
  
  hours: {
    monday: '4pm-11pm',
    tuesday: '4pm-11pm',
    wednesday: '4pm-11pm',
    thursday: '4pm-11pm',
    friday: '2pm-12am',
    saturday: '2pm-12am',
    sunday: '2pm-10pm',
    summary: 'Monday-Thursday: 4pm-11pm, Friday-Saturday: 2pm-12am, Sunday: 2pm-10pm',
  },
  
  location: {
    address: '123 Brewery Street',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    fullAddress: '123 Brewery Street, Downtown District, Portland, OR 97201',
    district: 'Downtown District',
  },
  
  contact: {
    phone: '(503) 555-1234',
    phoneAlt: '(503) 555-2739',
    email: 'hello@goldenbarrel.com',
    emailEvents: 'events@goldenbarrel.com',
  },
  
  menu: {
    beers: [
      {
        name: 'Golden Barrel Lager',
        description: 'Our signature crisp lager with honey notes and a smooth finish.',
        abv: '4.8%',
        price: '$8',
        style: 'Lager',
      },
      {
        name: 'Copper Creek IPA',
        description: 'Hoppy India Pale Ale bursting with citrus and pine aromatics.',
        abv: '6.2%',
        price: '$9',
        style: 'IPA',
      },
      {
        name: 'Midnight Porter',
        description: 'Rich, dark porter with decadent chocolate and coffee undertones.',
        abv: '5.5%',
        price: '$9',
        style: 'Porter',
      },
      {
        name: 'Harvest Wheat',
        description: 'Light and refreshing wheat beer with subtle spice notes and citrus.',
        abv: '4.5%',
        price: '$8',
        style: 'Wheat',
      },
      {
        name: 'Amber Ale',
        description: 'Smooth amber ale with caramel malt sweetness and balanced hops.',
        abv: '5.2%',
        price: '$8',
        style: 'Amber Ale',
      },
      {
        name: 'Stout Imperial',
        description: 'Bold imperial stout with roasted malt, dark chocolate, and vanilla.',
        abv: '8.5%',
        price: '$10',
        style: 'Imperial Stout',
      },
      {
        name: 'Pale Ale',
        description: 'Classic American pale ale with floral hops and biscuit malt.',
        abv: '5.0%',
        price: '$8',
        style: 'Pale Ale',
      },
      {
        name: 'Seasonal Brew',
        description: 'Ask your server about our current seasonal offering.',
        abv: 'Varies',
        price: '$9',
        style: 'Seasonal',
      },
    ] as Beer[],
  },
  
  events: [
    {
      title: 'Oktoberfest Celebration',
      date: 'October 15, 2025',
      time: '5:00 PM - 11:00 PM',
      location: 'Main Brewery Hall',
      description: 'Join us for an authentic Oktoberfest celebration featuring traditional German beers, live music, and hearty Bavarian cuisine.',
      tags: ['Music', 'Food', 'Beer Tasting'],
    },
    {
      title: "Brewmaster's Dinner Series",
      date: 'October 22, 2025',
      time: '6:30 PM - 9:30 PM',
      location: 'Private Dining Room',
      description: 'An exclusive five-course dinner expertly paired with our craft beers. Meet our brewmaster and learn the art of beer pairing.',
      tags: ['Fine Dining', 'Pairing', 'Exclusive'],
    },
    {
      title: 'Trivia Night',
      date: 'Every Wednesday',
      time: '7:00 PM - 9:00 PM',
      location: 'Bar Area',
      description: 'Test your knowledge at our weekly trivia night. Great prizes, cold beers, and tons of fun with friends!',
      tags: ['Weekly', 'Social', 'Prizes'],
    },
  ] as Event[],
  
  faq: {
    parking: 'We have limited street parking available. There is also a public parking garage two blocks away on Main Street.',
    accessibility: 'Our taproom is fully accessible with wheelchair ramps and accessible restrooms. Please let us know if you need any accommodations.',
    petPolicy: 'Well-behaved dogs are welcome on our outdoor patio. Service animals are welcome throughout the brewery.',
    reservations: 'We accept reservations for parties of 6 or more. For smaller groups, we operate on a first-come, first-served basis. Call us at (503) 555-1234 to make a reservation.',
    tours: 'Brewery tours are available on Saturdays at 2pm and 4pm. Tours are $15 per person and include a tasting flight. Reservations recommended.',
    privateEvents: 'We host private events for groups of 20-200 guests. Contact events@goldenbarrel.com for more information and availability.',
  },
};

/**
 * Formats the knowledge base into a string for the AI system prompt
 */
export function formatKnowledgeBase(): string {
  const { brewery, hours, location, contact, menu, events, faq } = knowledgeBase;
  
  return `
BUSINESS INFORMATION:
- Name: ${brewery.name}
- Tagline: ${brewery.tagline}

BUSINESS HOURS:
${hours.summary}

LOCATION:
- Address: ${location.fullAddress}
- District: ${location.district}

CONTACT INFORMATION:
- Phone: ${contact.phone} (main), ${contact.phoneAlt} (alternate)
- Email: ${contact.email} (general), ${contact.emailEvents} (events)

MENU - BEERS:
${menu.beers.map(b => `- ${b.name} (${b.style || 'Beer'}): ${b.description} - ${b.abv} ABV, ${b.price}`).join('\n')}

UPCOMING EVENTS:
${events.map(e => `- ${e.title} (${e.date} at ${e.time}): ${e.description} Location: ${e.location}`).join('\n')}

FREQUENTLY ASKED QUESTIONS:
- Parking: ${faq.parking}
- Accessibility: ${faq.accessibility}
- Pet Policy: ${faq.petPolicy}
- Reservations: ${faq.reservations}
- Tours: ${faq.tours}
- Private Events: ${faq.privateEvents}
`;
}

/**
 * Gets a specific beer by name (case-insensitive)
 */
export function getBeerByName(name: string): Beer | undefined {
  return knowledgeBase.menu.beers.find(
    beer => beer.name.toLowerCase().includes(name.toLowerCase())
  );
}

/**
 * Gets beers by style
 */
export function getBeersByStyle(style: string): Beer[] {
  return knowledgeBase.menu.beers.filter(
    beer => beer.style?.toLowerCase().includes(style.toLowerCase())
  );
}

/**
 * Gets upcoming events
 */
export function getUpcomingEvents(): Event[] {
  return knowledgeBase.events;
}

