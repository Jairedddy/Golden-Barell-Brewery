import React from 'react';
import { Calendar, Clock, MapPin, Users, Music, Utensils, Award, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import oktoberfestImage from '@/assets/events/Oktoberfest.jpg';
import brewmasterImage from '@/assets/events/Brewmaster.jpg';

const EventsSection: React.FC = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Oktoberfest Celebration',
      date: 'October 15, 2025',
      time: '5:00 PM - 11:00 PM',
      location: 'Main Brewery Hall',
      capacity: '200 Guests',
      image: oktoberfestImage,
      description: 'Join us for an authentic Oktoberfest celebration featuring traditional German beers, live music, and hearty Bavarian cuisine.',
      icon: Music,
      featured: true,
      tags: ['Music', 'Food', 'Beer Tasting']
    },
    {
      id: 2,
      title: 'Brewmaster\'s Dinner Series',
      date: 'October 22, 2025',
      time: '6:30 PM - 9:30 PM',
      location: 'Private Dining Room',
      capacity: '40 Guests',
      image: brewmasterImage,
      description: 'An exclusive five-course dinner expertly paired with our craft beers. Meet our brewmaster and learn the art of beer pairing.',
      icon: Utensils,
      featured: true,
      tags: ['Fine Dining', 'Pairing', 'Exclusive']
    },
    {
      id: 3,
      title: 'Trivia Night',
      date: 'Every Wednesday',
      time: '7:00 PM - 9:00 PM',
      location: 'Bar Area',
      capacity: '100 Guests',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
      description: 'Test your knowledge at our weekly trivia night. Great prizes, cold beers, and tons of fun with friends!',
      icon: PartyPopper,
      featured: false,
      tags: ['Weekly', 'Social', 'Prizes']
    },
    {
      id: 4,
      title: 'Craft Beer & Cheese Tasting',
      date: 'November 5, 2025',
      time: '4:00 PM - 6:00 PM',
      location: 'Tasting Room',
      capacity: '60 Guests',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80',
      description: 'Discover the perfect harmony between artisan cheeses and craft beers. Led by our sommelier and cheese expert.',
      icon: Award,
      featured: false,
      tags: ['Tasting', 'Educational', 'Artisan']
    },
    {
      id: 5,
      title: 'Live Jazz Brunch',
      date: 'Every Sunday',
      time: '11:00 AM - 3:00 PM',
      location: 'Restaurant Area',
      capacity: '120 Guests',
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
      description: 'Start your Sunday with live jazz, delicious brunch favorites, and our signature brunch cocktails and beers.',
      icon: Music,
      featured: false,
      tags: ['Brunch', 'Music', 'Weekend']
    },
    {
      id: 6,
      title: 'Brewery Tour & Tasting',
      date: 'Saturdays',
      time: '2:00 PM & 4:00 PM',
      location: 'Brewery Floor',
      capacity: '25 Guests per Tour',
      image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=800&q=80',
      description: 'Get an exclusive behind-the-scenes look at our brewing process, followed by a guided tasting of our signature beers.',
      icon: Users,
      featured: false,
      tags: ['Tour', 'Educational', 'Tasting']
    }
  ];

  return (
    <section id="events" className="section-padding bg-background">
      <div className="brewing-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section text-foreground mb-6">
            Events & Experiences
          </h2>
          <p className="text-elegant text-muted-foreground max-w-3xl mx-auto">
            From intimate tastings to lively celebrations, there's always something happening at Golden Barrel. 
            Join us for unforgettable experiences that bring our community together.
          </p>
        </div>

        {/* Featured Events */}
        <div className="mb-12">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-8 text-center">
            Featured Events
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {upcomingEvents.filter(event => event.featured).map((event) => (
              <div 
                key={event.id} 
                className="brew-card overflow-hidden group cursor-pointer"
              >
                {/* Event Image */}
                <div className="relative h-64 overflow-hidden mb-4 -mx-6 -mt-6 rounded-t-xl">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                  
                  {/* Event Icon */}
                  <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground p-2 rounded-lg">
                    <event.icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Info Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* RSVP Button */}
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Reserve Your Spot
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Events */}
        <div>
          <h3 className="text-2xl font-display font-semibold text-foreground mb-8 text-center">
            Regular Events
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.filter(event => !event.featured).map((event) => (
              <div 
                key={event.id} 
                className="brew-card group cursor-pointer"
              >
                {/* Event Icon */}
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <event.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Event Details */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {event.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-3 w-3 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="bg-secondary/20 text-foreground px-2 py-0.5 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Events CTA */}
        <div className="mt-16 brew-card bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <div className="text-center space-y-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <PartyPopper className="h-8 w-8 text-primary" />
            </div>
            
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                Host Your Private Event
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Looking to host a corporate event, wedding reception, or private party? Our dedicated events team 
                will help create an unforgettable experience tailored to your needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
              >
                Plan Your Event
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 font-semibold px-8"
              >
                View Venue Options
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
