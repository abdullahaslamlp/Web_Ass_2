// Curated realistic event dataset mirroring Ticketmaster Discovery API v2 structure
// Serves as dependable fallback for development, offline demo, and rate-limit handling

export const MOCK_EVENTS = [
  {
    id: 'G5v0Z9gK9pA1_',
    name: 'Coldplay - Music of the Spheres World Tour',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-15',
        localTime: '19:30:00',
        dateTime: '2026-11-15T19:30:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nJ', name: 'Music' },
        genre: { id: 'KnvZfZ7vAv6', name: 'Rock' },
        subGenre: { id: 'KZazBEonSMnZfZ7v6F1', name: 'Pop' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 65.0,
        max: 295.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA6te1A',
          name: 'Wembley Stadium',
          city: { name: 'London' },
          country: { name: 'United Kingdom', countryCode: 'GB' },
          address: { line1: 'Wembley, London HA9 0WS' },
          postalCode: 'HA9 0WS',
        },
      ],
    },
    info: 'Coldplay brings their record-breaking Music of the Spheres World Tour with spectacular kinetic stages, sustainable light shows, and iconic anthems.',
    pleaseNote: 'No age restrictions under 14 accompanied by an adult. All tickets subject to venue safety policies.',
  },
  {
    id: 'G5v0Z9gK9pA2_',
    name: 'NBA Finals 2026 - Game 1 Championship Showcase',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-20',
        localTime: '20:00:00',
        dateTime: '2026-11-20T20:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nE', name: 'Sports' },
        genre: { id: 'KnvZfZ7vAde', name: 'Basketball' },
        subGenre: { id: 'KZazBEonSMnZfZ7vFJA', name: 'NBA' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 150.0,
        max: 850.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA7AAEA',
          name: 'Madison Square Garden',
          city: { name: 'New York' },
          state: { name: 'New York', stateCode: 'NY' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '4 Pennsylvania Plaza' },
          postalCode: '10001',
        },
      ],
    },
    info: 'Experience high-intensity basketball excellence live at the World Famous Madison Square Garden as championship contenders battle for supremacy.',
    pleaseNote: 'Clear bag policy in effect. Doors open 90 minutes prior to tip-off.',
  },
  {
    id: 'G5v0Z9gK9pA3_',
    name: 'The Phantom of the Opera - Broadway Revival',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-05',
        localTime: '19:00:00',
        dateTime: '2026-12-05T19:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7na', name: 'Arts & Theatre' },
        genre: { id: 'KnvZfZ7v7n1', name: 'Theatre' },
        subGenre: { id: 'KZazBEonSMnZfZ7v7nF', name: 'Musical' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 55.0,
        max: 220.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA11l1A',
          name: 'Majestic Theatre',
          city: { name: 'New York' },
          state: { name: 'New York', stateCode: 'NY' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '245 W 44th St' },
          postalCode: '10036',
        },
      ],
    },
    info: 'Andrew Lloyd Webber’s timeless masterpiece returns with unforgettable orchestral scoring, grand costumes, and breathtaking stage effects.',
    pleaseNote: 'Recommended for ages 8 and up. Late seating at management discretion only.',
  },
  {
    id: 'G5v0Z9gK9pA4_',
    name: 'Hans Zimmer Live - Orchestral Odyssey',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-28',
        localTime: '20:00:00',
        dateTime: '2026-11-28T20:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nJ', name: 'Music' },
        genre: { id: 'KnvZfZ7vAv6', name: 'Classical' },
        subGenre: { id: 'KZazBEonSMnZfZ7vAvA', name: 'Soundtrack' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 80.0,
        max: 350.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA6te7A',
          name: 'The O2 Arena',
          city: { name: 'London' },
          country: { name: 'United Kingdom', countryCode: 'GB' },
          address: { line1: 'Peninsula Square' },
          postalCode: 'SE10 0DX',
        },
      ],
    },
    info: 'Academy Award winner Hans Zimmer performs iconic scores from Inception, Interstellar, Gladiator, The Dark Knight, and Dune with a full symphonic orchestra.',
    pleaseNote: 'Special lighting and laser effects will be used during the performance.',
  },
  {
    id: 'G5v0Z9gK9pA5_',
    name: 'Formula 1 Grand Prix 2026 - Main Race',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-12',
        localTime: '15:00:00',
        dateTime: '2026-12-12T15:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nE', name: 'Sports' },
        genre: { id: 'KnvZfZ7vAvF', name: 'Motorsports' },
        subGenre: { id: 'KZazBEonSMnZfZ7v6F5', name: 'Formula 1' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 190.0,
        max: 1200.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA6t11A',
          name: 'Silverstone Circuit',
          city: { name: 'Towcester' },
          country: { name: 'United Kingdom', countryCode: 'GB' },
          address: { line1: 'Towcester NN12 8TN' },
          postalCode: 'NN12 8TN',
        },
      ],
    },
    info: 'Feel the thrilling speed of 20 elite Formula 1 drivers taking high-speed corners in the ultimate motorsport championship showdown.',
    pleaseNote: 'Ear protection strongly recommended for children. Valid parking pass required for vehicle access.',
  },
  {
    id: 'G5v0Z9gK9pA6_',
    name: 'Sundance International Film Festival - Gala Night',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-25',
        localTime: '18:30:00',
        dateTime: '2026-11-25T18:30:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nn', name: 'Film' },
        genre: { id: 'KnvZfZ7vAk1', name: 'Festival' },
        subGenre: { id: 'KZazBEonSMnZfZ7vFJa', name: 'Independent' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 40.0,
        max: 160.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA11k9A',
          name: 'Eccles Theater',
          city: { name: 'Park City' },
          state: { name: 'Utah', stateCode: 'UT' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '1750 Kearns Blvd' },
          postalCode: '84060',
        },
      ],
    },
    info: 'World premieres, celebrity red carpets, director Q&As, and vanguard storytelling from indie filmmakers around the globe.',
    pleaseNote: 'Doors close strictly at showtime. No recording devices permitted inside the auditorium.',
  },
  {
    id: 'G5v0Z9gK9pA7_',
    name: 'UEFA Champions League - Quarter Finals Match',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-08',
        localTime: '21:00:00',
        dateTime: '2026-12-08T21:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nE', name: 'Sports' },
        genre: { id: 'KnvZfZ7vAde', name: 'Soccer' },
        subGenre: { id: 'KZazBEonSMnZfZ7vFk1', name: 'Champions League' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'EUR',
        min: 90.0,
        max: 480.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA6te9B',
          name: 'Santiago Bernabéu',
          city: { name: 'Madrid' },
          country: { name: 'Spain', countryCode: 'ES' },
          address: { line1: 'Av. de Concha Espina, 1' },
          postalCode: '28036',
        },
      ],
    },
    info: 'Europe’s most prestigious football tournament heats up as heavyweight champions clash under the stadium floodlights.',
    pleaseNote: 'Government-issued ID required for entrance verification.',
  },
  {
    id: 'G5v0Z9gK9pA8_',
    name: 'Billie Eilish - Hit Me Hard and Soft Tour',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-18',
        localTime: '20:00:00',
        dateTime: '2026-11-18T20:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nJ', name: 'Music' },
        genre: { id: 'KnvZfZ7vAv6', name: 'Alternative' },
        subGenre: { id: 'KZazBEonSMnZfZ7v6F1', name: 'Pop' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 75.0,
        max: 320.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA7AAEC',
          name: 'Kia Forum',
          city: { name: 'Inglewood' },
          state: { name: 'California', stateCode: 'CA' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '3900 W Manchester Blvd' },
          postalCode: '90305',
        },
      ],
    },
    info: 'Multi-Grammy winner Billie Eilish delivers an intimate yet powerhouse performance highlighting her third studio album in dynamic 360-degree sound.',
    pleaseNote: 'Digital ticketing only. Please have mobile barcodes ready upon arrival.',
  },
  {
    id: 'G5v0Z9gK9pA9_',
    name: 'Cirque du Soleil - Echo Spectacular',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-18',
        localTime: '19:30:00',
        dateTime: '2026-12-18T19:30:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7na', name: 'Arts & Theatre' },
        genre: { id: 'KnvZfZ7v7n1', name: 'Circus Arts' },
        subGenre: { id: 'KZazBEonSMnZfZ7v7nA', name: 'Acrobatics' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 60.0,
        max: 240.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA6te8D',
          name: 'Under the Big Top - Atlantic Station',
          city: { name: 'Atlanta' },
          state: { name: 'Georgia', stateCode: 'GA' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '241 20th St NW' },
          postalCode: '30363',
        },
      ],
    },
    info: 'An enchanting theatrical tale exploring the delicate balance between humans, animals, and the natural world with mind-bending acrobatic feats.',
    pleaseNote: 'Family-friendly production suitable for all ages.',
  },
  {
    id: 'G5v0Z9gK9pB1_',
    name: 'International Tech & Innovation Summit 2026',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-10',
        localTime: '09:00:00',
        dateTime: '2026-11-10T09:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7n1', name: 'Miscellaneous' },
        genre: { id: 'KnvZfZ7vA11', name: 'Conference' },
        subGenre: { id: 'KZazBEonSMnZfZ7vA12', name: 'Technology' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 250.0,
        max: 950.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA7AAEE',
          name: 'Moscone Center',
          city: { name: 'San Francisco' },
          state: { name: 'California', stateCode: 'CA' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '747 Howard St' },
          postalCode: '94103',
        },
      ],
    },
    info: 'Global industry leaders, engineers, and visionaries gather for keynote addresses, live AI demonstrations, and high-impact venture networking.',
    pleaseNote: 'Badge pickup starts at 8:00 AM. Government ID required.',
  },
  {
    id: 'G5v0Z9gK9pB2_',
    name: 'Metropolitan Opera - Carmen Extravaganza',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-10-10', // Completed event to test distinction!
        localTime: '19:30:00',
        dateTime: '2026-10-10T19:30:00Z',
      },
      status: {
        code: 'completed',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7na', name: 'Arts & Theatre' },
        genre: { id: 'KnvZfZ7v7n1', name: 'Opera' },
        subGenre: { id: 'KZazBEonSMnZfZ7v7nF', name: 'Classical' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 45.0,
        max: 280.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA11l2A',
          name: 'Lincoln Center',
          city: { name: 'New York' },
          state: { name: 'New York', stateCode: 'NY' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '30 Lincoln Center Plaza' },
          postalCode: '10023',
        },
      ],
    },
    info: 'Bizet’s fiery Spanish melodrama conducted under the stars, portraying the passionate romance of Carmen and Don José.',
    pleaseNote: 'Performed in French with English Met Titles.',
  },
  {
    id: 'G5v0Z9gK9pB3_',
    name: 'Taylor Swift - The Eras Tour Cinematic Experience',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
        width: 1200,
        height: 675,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-24',
        localTime: '19:00:00',
        dateTime: '2026-12-24T19:00:00Z',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        primary: true,
        segment: { id: 'KZFzniwnSyZfZ7v7nn', name: 'Film' },
        genre: { id: 'KnvZfZ7vAk1', name: 'Concert Film' },
        subGenre: { id: 'KZazBEonSMnZfZ7vFJa', name: 'Pop' },
      },
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 25.0,
        max: 65.0,
      },
    ],
    _embedded: {
      venues: [
        {
          id: 'KovZpZA11k9C',
          name: 'TCL Chinese Theatre IMAX',
          city: { name: 'Los Angeles' },
          state: { name: 'California', stateCode: 'CA' },
          country: { name: 'United States', countryCode: 'US' },
          address: { line1: '6925 Hollywood Blvd' },
          postalCode: '90028',
        },
      ],
    },
    info: 'Relive the epochal Eras Tour in ultra-high resolution IMAX with immersive multi-channel sound and exclusive bonus acoustic songs.',
    pleaseNote: 'Costumes and friendship bracelets warmly welcomed!',
  },
];
