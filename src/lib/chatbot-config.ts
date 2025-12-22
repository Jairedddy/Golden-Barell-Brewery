/**
 * Chatbot Configuration and Rule-Based Fallback
 * 
 * Provides rule-based responses when the AI API is unavailable
 * or for common questions that don't require AI.
 */

import { knowledgeBase, getBeerByName, getBeersByStyle } from './knowledge-base';

export interface RuleBasedResponse {
  response: string;
  action?: {
    type: 'call' | 'email' | 'scroll' | 'link';
    value: string;
  };
}

/**
 * Gets a rule-based response for common questions
 */
export function getRuleBasedResponse(userMessage: string): RuleBasedResponse {
  const message = userMessage.toLowerCase().trim();
  
  // Hours questions
  if (message.match(/\b(hours?|open|close|when|time|schedule)\b/)) {
    return {
      response: `Our hours are: ${knowledgeBase.hours.summary}. We'd love to see you!`,
    };
  }
  
  // Location questions
  if (message.match(/\b(location|address|where|directions|map)\b/)) {
    return {
      response: `We're located at ${knowledgeBase.location.fullAddress}. You can get directions by clicking the map in our contact section!`,
      action: {
        type: 'scroll',
        value: '#contact',
      },
    };
  }
  
  // Phone questions
  if (message.match(/\b(phone|call|contact|number)\b/)) {
    return {
      response: `You can reach us at ${knowledgeBase.contact.phone}. We're here to help!`,
      action: {
        type: 'call',
        value: knowledgeBase.contact.phone,
      },
    };
  }
  
  // Email questions
  if (message.match(/\b(email|mail|contact|reach)\b/)) {
    return {
      response: `You can email us at ${knowledgeBase.contact.email} for general inquiries, or ${knowledgeBase.contact.emailEvents} for event bookings.`,
      action: {
        type: 'email',
        value: knowledgeBase.contact.email,
      },
    };
  }
  
  // Menu questions
  if (message.match(/\b(menu|beers?|what.*serve|drinks?|selection)\b/)) {
    const beerList = knowledgeBase.menu.beers
      .slice(0, 5)
      .map(b => `${b.name} (${b.abv})`)
      .join(', ');
    return {
      response: `We have a great selection of craft beers! Some of our favorites include: ${beerList}, and more. Check out our full menu in the Menu section!`,
      action: {
        type: 'scroll',
        value: '#menu',
      },
    };
  }
  
  // Specific beer questions
  const beerMatch = message.match(/\b(ipa|stout|porter|lager|wheat|ale|pale|amber|imperial)\b/);
  if (beerMatch) {
    const style = beerMatch[1];
    const beers = getBeersByStyle(style);
    if (beers.length > 0) {
      const beer = beers[0];
      return {
        response: `We have ${beer.name}! ${beer.description} It's ${beer.abv} ABV and ${beer.price}. Would you like to know about any other beers?`,
      };
    }
  }
  
  // Beer name questions
  for (const beer of knowledgeBase.menu.beers) {
    if (message.includes(beer.name.toLowerCase())) {
      return {
        response: `${beer.name} is ${beer.description} It's ${beer.abv} ABV and ${beer.price}. One of our favorites!`,
      };
    }
  }
  
  // Events questions
  if (message.match(/\b(event|happening|upcoming|special|music|trivia|dinner)\b/)) {
    const events = knowledgeBase.events.slice(0, 2);
    const eventList = events
      .map(e => `${e.title} on ${e.date}`)
      .join(' and ');
    return {
      response: `We have some great events coming up! ${eventList}. Check out our Events section for more details!`,
      action: {
        type: 'scroll',
        value: '#events',
      },
    };
  }
  
  // Reservation questions
  if (message.match(/\b(reservation|book|table|reserve|party)\b/)) {
    return {
      response: `We accept reservations for parties of 6 or more. For smaller groups, we're first-come, first-served. Give us a call at ${knowledgeBase.contact.phone} to make a reservation!`,
      action: {
        type: 'call',
        value: knowledgeBase.contact.phone,
      },
    };
  }
  
  // Parking questions
  if (message.match(/\b(parking|park|car|vehicle)\b/)) {
    return {
      response: knowledgeBase.faq.parking,
    };
  }
  
  // Accessibility questions
  if (message.match(/\b(accessible|wheelchair|ada|disability)\b/)) {
    return {
      response: knowledgeBase.faq.accessibility,
    };
  }
  
  // Pet questions
  if (message.match(/\b(pet|dog|animal|bring.*dog)\b/)) {
    return {
      response: knowledgeBase.faq.petPolicy,
    };
  }
  
  // Tours questions
  if (message.match(/\b(tour|visit|see.*brewery|behind.*scenes)\b/)) {
    return {
      response: knowledgeBase.faq.tours,
    };
  }
  
  // Private events
  if (message.match(/\b(private.*event|party|celebration|rent|venue)\b/)) {
    return {
      response: knowledgeBase.faq.privateEvents,
      action: {
        type: 'email',
        value: knowledgeBase.contact.emailEvents,
      },
    };
  }
  
  // Greetings
  if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
    return {
      response: `Hello! Welcome to Golden Barrel Brewery! I'm here to help with questions about our hours, menu, events, reservations, or anything else. What can I help you with today?`,
    };
  }
  
  // Default fallback
  return {
    response: `I'm not sure I can answer that specific question, but I'd be happy to help with our hours, menu, events, or reservations! You can also call us at ${knowledgeBase.contact.phone} or email ${knowledgeBase.contact.email} for more information.`,
  };
}

/**
 * Checks if a message should use rule-based response
 * (for very simple queries that don't need AI)
 */
export function shouldUseRuleBased(message: string): boolean {
  const simplePatterns = [
    /^(hi|hello|hey)$/i,
    /^(hours?|open|close)$/i,
    /^(location|address|where)$/i,
    /^(phone|call)$/i,
    /^(menu|beers?)$/i,
  ];
  
  return simplePatterns.some(pattern => pattern.test(message.trim()));
}

