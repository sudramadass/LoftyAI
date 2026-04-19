const LEADS = [
  { id:1,  first:'Samuel',   last:'Scott',     type:'Buyer',     email:'samuel.scott@gmail.com',    phone:'(617) 438-9890', source:'YouTube',        minPrice:319000, maxPrice:401000,  city:'Mesa',      score:74, initials:'SS', daysAgo:0  },
  { id:2,  first:'Daniel',   last:'Thomas',    type:'Seller',    email:'daniel.thomas@gmail.com',   phone:'(335) 457-2127', source:'Instagram',      score:52, initials:'DT', daysAgo:3  },
  { id:3,  first:'Fatima',   last:'Jackson',   type:'Landlord',  email:'fatima.jackson@gmail.com',  phone:'(934) 451-4335', source:'Zillow',         score:61, initials:'FJ', daysAgo:1  },
  { id:4,  first:'Yuki',     last:'Young',     type:'Buyer',     email:'yuki.young@gmail.com',      phone:'(660) 365-5050', source:'Email Campaign', minPrice:556000, maxPrice:687000,  city:'Surprise',  score:68, initials:'YY', daysAgo:2  },
  { id:5,  first:'Carlos',   last:'Garcia',    type:'Other',     email:'carlos.garcia@gmail.com',   phone:'(562) 533-7735', source:'Zillow',         minPrice:196000, maxPrice:295000,  city:'Glendale',  score:44, initials:'CG', daysAgo:7  },
  { id:6,  first:'David',    last:'Williams',  type:'Seller',    email:'david.williams@gmail.com',  phone:'(367) 573-7216', source:'Cold Call',      score:38, initials:'DW', daysAgo:5  },
  { id:7,  first:'Sofia',    last:'Kim',       type:'Agent',     email:'sofia.kim@gmail.com',       phone:'(962) 674-9830', source:'Referral',       score:71, initials:'SK', daysAgo:1  },
  { id:8,  first:'Kevin',    last:'Lee',       type:'Agent',     email:'kevin.lee@gmail.com',       phone:'(259) 693-9883', source:'Podcast',        score:83, initials:'KL', daysAgo:28, birthday:true },
  { id:9,  first:'Aisha',    last:'Patel',     type:'Landlord',  email:'aisha.patel@gmail.com',     phone:'(980) 265-9837', source:'Zillow',         score:55, initials:'AP', daysAgo:4  },
  { id:10, first:'Tyler',    last:'Harris',    type:'Landlord',  email:'tyler.harris@gmail.com',    phone:'(277) 807-3442', source:'Walk-In',        score:49, initials:'TH', daysAgo:6  },
  { id:11, first:'Jennifer', last:'Lewis',     type:'Other',     email:'jennifer.lewis@gmail.com',  phone:'(594) 690-4114', source:'Facebook',       minPrice:421000, maxPrice:694000,  city:'Tucson',    score:61, initials:'JL', daysAgo:2  },
  { id:12, first:'Chris',    last:'Walker',    type:'Investor',  email:'chris.walker@gmail.com',    phone:'(396) 530-7211', source:'Podcast',        score:66, initials:'CW', daysAgo:9  },
  { id:13, first:'Brandon',  last:'Allen',     type:'Buyer',     email:'brandon.allen@gmail.com',   phone:'(351) 771-1090', source:'Google',         minPrice:606000, maxPrice:860000,  city:'Tucson',    score:88, initials:'BA', daysAgo:14, urgent:true },
  { id:14, first:'Emily',    last:'Wilson',    type:'Renter',    email:'emily.wilson@gmail.com',    phone:'(272) 824-1964', source:'Facebook',       minPrice:702000, maxPrice:864000,  city:'Tucson',    score:61, initials:'EW', daysAgo:3  },
  { id:15, first:'Robert',   last:'Davis',     type:'Homeowner', email:'robert.davis@gmail.com',    phone:'(762) 269-5342', source:'Walk-In',        score:33, initials:'RD', daysAgo:12 },
  { id:16, first:'Andre',    last:'Nelson',    type:'Investor',  email:'andre.nelson@gmail.com',    phone:'(588) 435-4467', source:'Instagram',      score:58, initials:'AN', daysAgo:5  },
  { id:17, first:'James',    last:'Johnson',   type:'Buyer',     email:'james.johnson@gmail.com',   phone:'(548) 384-3547', source:'Cold Call',      minPrice:263000, maxPrice:670000,  city:'Tucson',    score:56, initials:'JJ', daysAgo:8  },
  { id:18, first:'Natasha',  last:'Robinson',  type:'Homeowner', email:'natasha.robinson@gmail.com',phone:'(442) 985-3662', source:'Facebook',       score:29, initials:'NR', daysAgo:20 },
  { id:19, first:'Maria',    last:'Martinez',  type:'Investor',  email:'maria.martinez@gmail.com',  phone:'(791) 296-2139', source:'Walk-In',        score:63, initials:'MM', daysAgo:3  },
  { id:20, first:'Mei',      last:'Hall',      type:'Buyer',     email:'mei.hall@gmail.com',        phone:'(874) 186-5649', source:'Facebook',       minPrice:584000, maxPrice:1040000, city:'Glendale',  score:72, initials:'MH', daysAgo:1  },
  { id:21, first:'Omar',     last:'Clark',     type:'Renter',    email:'omar.clark@gmail.com',      phone:'(875) 297-7528', source:'Walk-In',        minPrice:333000, maxPrice:497000,  city:'Glendale',  score:47, initials:'OC', daysAgo:6  },
  { id:22, first:'Linda',    last:'Taylor',    type:'Homeowner', email:'linda.taylor@gmail.com',    phone:'(295) 871-4872', source:'Google',         score:41, initials:'LT', daysAgo:15 },
  { id:23, first:'Priya',    last:'Anderson',  type:'Seller',    email:'priya.anderson@gmail.com',  phone:'(834) 183-7868', source:'Instagram',      score:69, initials:'PA', daysAgo:2  },
  { id:24, first:'(Unknown)',last:'',          type:'Other',     phone:'(634) 545-3322',            source:'Other',          score:12, initials:'??', daysAgo:1  },
  { id:25, first:'Rachel',   last:'Adams',     type:'Agent',     email:'rachel.adams@gmail.com',    phone:'(424) 379-8140', source:'Email Campaign', score:77, initials:'RA', daysAgo:4  },
  { id:26, first:'Michael',  last:'Brown',     type:'Renter',    email:'michael.brown@gmail.com',   phone:'(741) 357-1188', source:'Instagram',      minPrice:490000, maxPrice:845000,  city:'Tucson',    score:53, initials:'MB', daysAgo:7  },
];

const GEMINI_KEY = 'AIzaSyC9Td15CWPYRT4lQwJXWb8Q5yBbKilRPzw';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_KEY}`;

const SYSTEM_PROMPT = `You are Lofty AI, an intelligent real estate CRM assistant built into the Lofty platform, helping Sarah Martinez — a real estate agent at Keller Williams AZ. Today is April 19, 2026.

Sarah has 26 leads in her CRM. Today's AI-prioritized top 3:
1. Brandon Allen (Score 88, URGENT) — Buyer, $606K–$860K, Tucson AZ. Viewed 4891 E Sunrise Dr twice + 2 other listings in 48hrs. Rate lock expires April 22 (3 days). 14 days since last contact. Source: Google.
2. Samuel Scott (Score 74) — Buyer, $319K–$401K, Mesa AZ. Returned to site after 12-day absence. 19 min on 3488 Cedar St — floor plan viewed 3× and school district page. 2 price-reduced Mesa listings match his search. Source: YouTube.
3. Kevin Lee (Score 83) — Past client/Agent. Birthday TODAY. Last contact 28 days ago (approaching cold zone). Interested in Surprise investment properties (6–7% cap rate). 2 referrals sent. Source: Podcast.

Other leads worth mentioning: Mei Hall (72, Facebook, Buyer $584K–$1.04M Glendale), Rachel Adams (77, Email Campaign, Agent), Sofia Kim (71, Referral, Agent), Priya Anderson (69, Instagram, Seller), Yuki Young (68, Email Campaign, Buyer $556K–$687K Surprise), Chris Walker (66, Podcast, Investor), Maria Martinez (63, Walk-In, Investor), Fatima Jackson (61, Zillow, Landlord), Jennifer Lewis (61, Facebook, Buyer $421K–$694K Tucson), Emily Wilson (61, Facebook, Renter).

Active transactions: 2847 S Rural Rd (deadline in 48 hours — urgent), 1204 W Baseline (on track).
AI worked overnight: 12 follow-up emails sent, 35 lead scores updated, 8 buyer-listing matches found.
Today's showings: 2pm and 4:30pm.

You can help Sarah with: lead prioritization, writing follow-up texts/emails, market insights for AZ, scheduling advice, explaining AI scores, next best actions. Be concise, warm, and actionable. Use bullet points for lists. Keep responses under 200 words unless asked for more detail.`;
