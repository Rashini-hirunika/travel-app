export interface Place {
  name: string;
  description: string;
  imageUrl: any;
  latitude: number; 
  longitude: number; 
}

export interface Hotel {
  name: string;
  type: 'luxury' | 'budget';
  description: string;
  priceRange: string;
}

export interface District {
  id: string;
  name: string;
  nameSinhala: string;
  nameTamil: string;
  province: string;
  description: string;
  topPlaces: Place[];
  hotels: Hotel[];
  historicalSignificance: string;
  mustTryFood: string[];
  travelRoute: string;
  imageUrl: any;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}


// Keyword-based place photos.
// For a final production app, replace these with your own Firebase Storage URLs.
const placePhoto = (query: string, lock: number) =>
  `https://loremflickr.com/900/600/${encodeURIComponent(query + ", Sri Lanka")}?lock=${lock}`;

export const districts: District[] = [
  {
    id: "colombo",
    name: "Colombo",
    
    nameSinhala: "කොළඹ",
    nameTamil: "கொழும்பு",
    province: "Western",
    description: "The vibrant capital city of Sri Lanka, blending colonial charm with modern urban life.",
    topPlaces: [
      {
        name: "Galle Face Green",
        description: "Oceanfront promenade popular for sunsets, street food, and sea views.",
        latitude: 6.9275,
        longitude: 79.8437,
        imageUrl: "https://images.unsplash.com/photo-1706954532520-e46c19ce6749?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2FsbGUlMjBmYWNlfGVufDB8fDB8fHww",
      },
      {
        name: "Gangaramaya Temple",
        description: "Famous Buddhist temple complex near Beira Lake.",
        latitude: 6.9167,
        longitude: 79.8562,
        imageUrl: "https://media.istockphoto.com/id/2213600049/photo/colombo-sri-lanka-seema-malaka-temple.jpg?s=612x612&w=0&k=20&c=bGIkCw4K8FCvNT2-tW7LcmDKiSMzLljbpr_RTUk8DNs=",
      },
      {
        name: "Viharamahadevi Park",
        description: "Large green city park beside Colombo Town Hall.",
        latitude: 6.9105,
        longitude: 79.8612,
        imageUrl: "https://media.istockphoto.com/id/2279273136/photo/buddha-statue-viharamahadevi-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=n0PLjUlAiBWjXY0w07LgFA1i_UV2R7UaiC9txmAGdLY=",
      },
      {
        name: "Colombo Lotus Tower",
        description: "Iconic tower with panoramic views over Colombo.",
        latitude: 6.9270,
        longitude: 79.8584,
        imageUrl: "https://images.unsplash.com/photo-1664256608032-3007263ab0d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sb21ibyUyMGxvdHVzJTIwdG93ZXJ8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Independence Memorial Hall",
        description: "National monument set in the peaceful Independence Square grounds.",
        latitude: 6.9035,
        longitude: 79.8688,
        imageUrl: "https://media.istockphoto.com/id/1347089664/photo/independence-memorial-hall-in-colombo.webp?a=1&b=1&s=612x612&w=0&k=20&c=xj8dkJgHtFURJX8nbd8ggct7nSHWsNSUrcDDtKpS1lQ=",
      },
      {
        name: "Colombo National Museum",
        description: "Sri Lanka’s largest museum with art, archaeology, and royal collections.",
        latitude: 6.9104,
        longitude: 79.8609,
        imageUrl: "https://media.istockphoto.com/id/466956880/photo/driveway-of-sri-lankas-national-museum.webp?a=1&b=1&s=612x612&w=0&k=20&c=c0uwQjFVi0W-akqsZ34SAN7ejvjUJuduiw947hu1xVE=",
      },
      {
        name: "Pettah Market",
        description: "Bustling bazaar district filled with local shops and street life.",
        latitude: 6.9368,
        longitude: 79.8500,
        imageUrl: "https://media.istockphoto.com/id/2213744138/photo/colombo-sri-lanka-pettah-market.jpg?s=612x612&w=0&k=20&c=8jxQpYb1Cj0fxb-Ir_61HKXFDBuFNANlq_YXWceIaQs=",
      },
      {
        name: "Jami Ul-Alfar Mosque",
        description: "Distinctive red-and-white historic mosque in Pettah.",
        latitude: 6.9398,
        longitude: 79.8515,
        imageUrl: "https://media.istockphoto.com/id/956446200/photo/mosque-and-market-pettah-fort-colombo-sri-lanka.jpg?s=612x612&w=0&k=20&c=RPZocbCPpMNXnpWNXx3IzGhlBnv9ImkZj9G6U7RwNZ4=",
      }
    ],
    hotels: [
      { name: "Shangri-La Colombo", type: "luxury", description: "5-star waterfront hotel with ocean views", priceRange: "$200-400" },
      { name: "CityRest Fort", type: "budget", description: "Clean hostel in the heart of the city", priceRange: "$15-30" }
    ],
    historicalSignificance: "Colombo has been a strategic trading port for over 2,000 years, influenced by Portuguese, Dutch, and British colonial powers. It became the capital under British rule in 1815.",
    mustTryFood: ["Kottu Roti", "Hoppers", "String Hoppers with Curry", "Seafood at Galle Face"],
    travelRoute: "From Bandaranaike International Airport (35km north), take the expressway (30 mins) or train from Katunayake to Colombo Fort Station (1 hour).",
    imageUrl: "https://images.unsplash.com/photo-1653151106233-8e928c21bc1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sb21ib3xlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { latitude: 6.9271, longitude: 79.8612 }
  },
  {
    id: "galle",
    name: "Galle",
    nameSinhala: "ගාල්ල",
    nameTamil: "காலி",
    province: "Southern",
    description: "A UNESCO World Heritage site famous for its 17th-century Dutch colonial fort.",
    topPlaces: [
      {
        name: "Galle Fort",
        description: "UNESCO-listed fort with colonial streets, museums, cafes, and sea walls.",
        latitude: 6.0260,
        longitude: 80.2167,
        imageUrl: "https://media.istockphoto.com/id/2264532889/photo/colorful-souvenir-shop-front-displaying-fabrics-and-clothing-on-a-narrow-paved-shopping.jpg?s=612x612&w=0&k=20&c=TjWfM5rrQ4K-gQJD5g7B8agHD_KVaw0aalRgujlwNEQ=",
      },
      {
        name: "Galle Lighthouse",
        description: "Historic lighthouse on the southeastern corner of Galle Fort.",
        latitude: 6.0240,
        longitude: 80.2196,
        imageUrl: "https://media.istockphoto.com/id/472387838/photo/galle-fort-lighthouse-sri-lanka.jpg?s=612x612&w=0&k=20&c=BNXhMGbPDxThnZbs1qWPmNUOVIPXAB35uuhvybIgcag=",
      },
      {
        name: "Dutch Reformed Church",
        description: "Historic church inside Galle Fort dating from the Dutch period.",
        latitude: 6.0269,
        longitude: 80.2170,
        imageUrl: "https://media.istockphoto.com/id/2247724226/photo/the-groote-kerk-circa-1755.jpg?s=612x612&w=0&k=20&c=Qs8F_Z4ixfhBjf9PPIpCBLiMfvMNkgvq8fpbxd38c8o=",
      },
      {
        name: "Unawatuna Beach",
        description: "Popular crescent beach with swimming, cafes, and sunsets.",
        latitude: 6.0097,
        longitude: 80.2494,
        imageUrl: "https://media.istockphoto.com/id/1463139893/photo/male-surfing-in-distance-in-unawatuwa-galle-sea-riding-moderate-wave-with-pagoda-background.jpg?s=612x612&w=0&k=20&c=mDeyq6I4GSacSU_d_Rv8N001rphjaJzTW87VhvF2KUQ=",
      },
      {
        name: "Jungle Beach",
        description: "Small scenic beach reached through a short forest trail.",
        latitude: 6.0187,
        longitude: 80.2405,
        imageUrl: "https://media.istockphoto.com/id/932310782/photo/picturesque-view-of-andaman-sea-in-phuket-island-thailand-view-through-the-jungle-on-the.jpg?s=612x612&w=0&k=20&c=0fJrk9zngk8jHiFEe6_lKnEHXUB27iameB6rH7o-wyI=",
      },
      {
        name: "Koggala Lake",
        description: "Large coastal lake known for islands, mangroves, and boat rides.",
        latitude: 5.9889,
        longitude: 80.3332,
        imageUrl: "https://media.istockphoto.com/id/1400590894/photo/sri-lanka-green-palms-on-koggala-lake-village-landscape-view.jpg?s=612x612&w=0&k=20&c=RDqUXpi_77nowiTbLBBQo1l9C9gvJaR49Ua8PsG_JLI=",
      },
      {
        name: "Japanese Peace Pagoda",
        description: "Hilltop white pagoda with sweeping views of the southern coast.",
        latitude: 6.0174,
        longitude: 80.2392,
        imageUrl: "https://media.istockphoto.com/id/1199516822/photo/japanese-peace-pagoda-in-rumassala-sri-lanka-the-japanese-peace-pagoda-near-unawatuna-is-a.jpg?s=612x612&w=0&k=20&c=jm7JKMhbgszY6b-1TsfFAiRyfMIu-B39DiPYpEMaqeo=",
      },
      {
        name: "Hikkaduwa National Park",
        description: "Marine national park known for coral reefs and snorkeling.",
        latitude: 6.1354,
        longitude: 80.0995,
        imageUrl: "https://media.istockphoto.com/id/649027376/photo/landscape-rocky-tropical-beach.jpg?s=612x612&w=0&k=20&c=Wh2pNmEuHFkjg9sjQsetnr97nxdRKTLtHVHYcCWcRFc=",
      }
    ],
    hotels: [
      { name: "Amangalla", type: "luxury", description: "Historic luxury hotel inside the Fort", priceRange: "$400-800" },
      { name: "Fort Inn Guest House", type: "budget", description: "Charming guesthouse within the Fort walls", priceRange: "$25-50" }
    ],
    historicalSignificance: "Galle was the main port of Sri Lanka for over 200 years under Dutch rule. The Fort, built in 1663, is the largest remaining European-built fortress in Asia.",
    mustTryFood: ["Galle Fort Curries", "Egg Hoppers", "Seafood Platter", "Coconut Sambol"],
    travelRoute: "From Colombo: Take the Southern Expressway (1.5 hours by car) or scenic coastal train (2.5 hours) to Galle Station.",
    imageUrl: "https://images.unsplash.com/flagged/photo-1567498975675-a3adf1574cb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FsbGV8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 6.0329, longitude: 80.2168 }
  },
  {
    id: "kandy",
    name: "Kandy",
    nameSinhala: "මහනුවර",
    nameTamil: "கண்டி",
    province: "Central",
    description: "The hill capital and spiritual heart of Sri Lanka, home to the Sacred Tooth Relic.",
    topPlaces: [
      {
        name: "Temple of the Sacred Tooth Relic",
        description: "Sri Lanka’s most revered Buddhist shrine beside Kandy Lake.",
        latitude: 7.2936,
        longitude: 80.6413,
        imageUrl: "https://media.istockphoto.com/id/502631824/photo/temple-of-the-tooth-kandy-sri-lanka.jpg?s=612x612&w=0&k=20&c=2ltjIh94gedLEJ0rgu8djEXhrfatIcVBZCH6WVr3z0k=",
      },
      {
        name: "Kandy Lake",
        description: "Scenic artificial lake at the heart of Kandy city.",
        latitude: 7.2911,
        longitude: 80.6402,
        imageUrl: "https://media.istockphoto.com/id/2225041353/photo/temple-of-the-sacred-tooth-relic-on-kandy-lake-kandy-sri-lanka-formerly-known-as-ceylon.jpg?s=612x612&w=0&k=20&c=XtfZRtgFK3qnOy7hxqPLeUM-uXHsj8V4-2hQEfRy9P0=",
      },
      {
        name: "Royal Botanic Gardens Peradeniya",
        description: "Expansive botanical gardens famous for palms, orchids, and giant trees.",
        latitude: 7.2681,
        longitude: 80.5966,
        imageUrl: "https://media.istockphoto.com/id/137059454/photo/botanical-gardens.jpg?s=612x612&w=0&k=20&c=0g66x9VMJrA6y1A9qToBjpEFdSe32NKtQafzqin5K3I=",
      },
      {
        name: "Bahirawakanda Buddha Statue",
        description: "Large hilltop Buddha statue overlooking Kandy.",
        latitude: 7.2955,
        longitude: 80.6308,
        imageUrl: "https://media.istockphoto.com/id/1210163173/photo/the-bahirawakanda-white-buddha-statue-is-located-alongside-the-sri-maha-bodhi-temple-which-is.jpg?s=612x612&w=0&k=20&c=HNxbjUucyAU4gb8YW8KyhlJ2K-iT-Ycupw9hV8JmLNg=",
      },
      {
        name: "Udawattakele Forest Reserve",
        description: "Historic forest reserve with walking trails above the city.",
        latitude: 7.2996,
        longitude: 80.6436,
        imageUrl: "https://media.istockphoto.com/id/1152474543/photo/dense-vegetation-in-udawattakele-forest-reserve.jpg?s=612x612&w=0&k=20&c=Dfd0fWBpoqa2_2VKBtAzZQH69zN5VYvit8a_0QPfqR8=",
      },
      {
        name: "Ceylon Tea Museum",
        description: "Museum in a former tea factory explaining Sri Lanka’s tea history.",
        latitude: 7.2736,
        longitude: 80.6330,
        imageUrl:"https://media.istockphoto.com/id/1393733185/photo/tea-factory-in-ella-sri-lanka.jpg?s=612x612&w=0&k=20&c=i0F_S5qdVXg26n2acv6cSZVyAXaq6LRl3H7Q-3lW7zA=",
      },
      {
        name: "Lankatilaka Vihara",
        description: "Historic hilltop temple with Kandyan architecture and views.",
        latitude: 7.2335,
        longitude: 80.5658,
        imageUrl: "https://media.istockphoto.com/id/1355924540/photo/close-up-of-nature-place.jpg?s=612x612&w=0&k=20&c=fJ-kxlrhvHa7tQH_9x_0iBF_1pc08aJRAhus3Lf6_XY=",
      },
      {
        name: "Ambuluwawa Tower",
        description: "Unique hilltop biodiversity complex with a spiral tower near Gampola.",
        latitude: 7.1616,
        longitude: 80.5706,
        imageUrl: "https://media.istockphoto.com/id/2260677982/photo/ambuluwawa-tower-in-sri-lanka-religious-temple-of-unique-spiral-shape-woman-in-a-suit.jpg?s=612x612&w=0&k=20&c=kMTaTUEusLKP1LUC9liGe-tSFSoRZx5dg0hpXDEyWD4=",
      }
    ],
    hotels: [
      { name: "The Kandy House", type: "luxury", description: "Boutique heritage hotel in colonial mansion", priceRange: "$250-500" },
      { name: "Kandy City Hostel", type: "budget", description: "Social hostel near the lake", priceRange: "$12-25" }
    ],
    historicalSignificance: "Kandy was the last capital of the Sinhalese kings and resisted European colonization for centuries. It remained an independent kingdom until 1815.",
    mustTryFood: ["Kandyan Curries", "Milk Rice (Kiribath)", "Watalappan", "Jackfruit Curry"],
    travelRoute: "From Colombo: Take the A1 highway (3 hours) or scenic train through the hills (2.5-3 hours) to Kandy Station.",
    imageUrl: "https://images.unsplash.com/photo-1642095012223-65ee6d570974?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGthbmR5fGVufDB8fDB8fHww",
    coordinates: { latitude: 7.2906, longitude: 80.6337 }
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    nameSinhala: "නුවරඑළිය",
    nameTamil: "நுவரெலியா",
    province: "Central",
    description: "Little England of Sri Lanka, known for tea plantations and cool climate.",
    topPlaces: [
      {
        name: "Horton Plains National Park",
        description: "Highland national park famous for World’s End and cloud forest.",
        latitude: 6.8016,
        longitude: 80.8142,
        imageUrl: "https://media.istockphoto.com/id/1268126285/photo/horton-plains-national-park-sri-lanka.jpg?s=612x612&w=0&k=20&c=6Uf7dkNqjf3bCOE48p9K5t5L5G1_m2vYdN5Et7Olm8M=",
      },
      {
        name: "Gregory Lake",
        description: "Popular lake for walking, boating, and mountain views.",
        latitude: 6.9574,
        longitude: 80.7788,
        imageUrl: "https://media.istockphoto.com/id/2291651895/photo/scenic-lake-gregory-and-tea-estates-in-nuwara-eliya-sri-lanka-view.jpg?s=612x612&w=0&k=20&c=dPgvScIdMDP2V0ejy8t_l5g5FtZME514YuvWeO_BnkI=",
      },
      {
        name: "Pedro Tea Estate",
        description: "Working tea estate where visitors can learn about tea production.",
        latitude: 6.9498,
        longitude: 80.8210,
        imageUrl: "https://media.istockphoto.com/id/1207737672/photo/view-on-pedro-estate-tea-factory-in-nuwara-eliya-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=XWCcjms1JAHJZGno3ts8zmz-T_jCfFZnaAJJoknK_jQ=",
      },
      {
        name: "Hakgala Botanical Garden",
        description: "Cool-climate botanical garden with flowers and mountain scenery.",
        latitude: 6.9284,
        longitude: 80.8218,
        imageUrl: "https://media.istockphoto.com/id/661504806/photo/royal-botanical-garden-peradeniya-sri-lanka.jpg?s=612x612&w=0&k=20&c=fnYe_v8Gj21CHT1ERZxfESpQmkID4aU9iBAy_satLiU=",
      },
      {
        name: "Moon Plains",
        description: "Highland viewpoint with wide views across surrounding peaks.",
        latitude: 6.9368,
        longitude: 80.7979,
        imageUrl: "https://media.istockphoto.com/id/2148572470/photo/moon-plains-sri-lanka-nuwara-eliya.jpg?s=612x612&w=0&k=20&c=0asukUCEh3ZcmmmTco8lZSJt9kDFzv0o39029etXCYw=",
      },
      {
        name: "Lovers Leap Waterfall",
        description: "Picturesque waterfall above Nuwara Eliya town.",
        latitude: 6.9692,
        longitude: 80.8120,
        imageUrl: "https://media.istockphoto.com/id/2224887154/photo/aerial-view-of-lovers-leap-waterfall-in-lush-highlands-of-sri-lanka.jpg?s=612x612&w=0&k=20&c=3zJhq6x4K161cz6EeV-HXuBV80bcyoBcT8Y7fcs2-Hc=",
      },
      {
        name: "Seetha Amman Temple",
        description: "Colorful Hindu temple associated with the Ramayana tradition.",
        latitude: 6.9310,
        longitude: 80.8105,
        imageUrl: "https://media.istockphoto.com/id/899430082/photo/seetha-amman-hindu-temple.jpg?s=2048x2048&w=is&k=20&c=cczRBaWGSZ-O3ptp6aPBZfcb7MFCTjalqMVlWlAgOj0=",
      },
      {
        name: "Victoria Park",
        description: "Well-kept city park known for flowers and birdlife.",
        latitude: 6.9704,
        longitude: 80.7686,
        imageUrl: "https://media.istockphoto.com/id/1254417763/photo/victoria-park-in-nuwara-eliya.webp?a=1&b=1&s=612x612&w=0&k=20&c=itVdfLDU0jTRO9z4BNoGE9tiFX9hkoGCW7BTIDCQHWU=",
      }
    ],
    hotels: [
      { name: "The Hill Club", type: "luxury", description: "Colonial-era club with old-world charm", priceRange: "$150-300" },
      { name: "Heaven Seven Hotel", type: "budget", description: "Modern hotel with lake views", priceRange: "$40-80" }
    ],
    historicalSignificance: "Established by British colonialists in the 19th century as a hill station retreat, Nuwara Eliya retains much of its colonial architecture and cool climate.",
    mustTryFood: ["Afternoon Tea with Scones", "Fresh Strawberry Desserts", "Warm Hoppers", "Vegetable Hot Pot"],
    travelRoute: "From Kandy: Take the A5 highway through Ramboda Pass (2.5 hours). Scenic train also available via Nanu Oya station.",
    imageUrl: "https://images.unsplash.com/photo-1706769731521-578e98e221bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bnV3YXJhZWxpeWF8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 6.9497, longitude: 80.7891 }
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    nameSinhala: "සීගිරිය",
    nameTamil: "சிகிரியா",
    province: "Central",
    description: "Ancient rock fortress and palace ruins, a UNESCO World Heritage masterpiece.",
    topPlaces: [
      {
        name: "Sigiriya Rock Fortress",
        description: "Ancient rock citadel with frescoes, gardens, and panoramic views.",
        latitude: 7.9570,
        longitude: 80.7603,
        imageUrl: "https://images.unsplash.com/photo-1711389552655-9230667c6338?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2lnaXJpeWF8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Pidurangala Rock",
        description: "Popular sunrise hike with a classic view of Sigiriya.",
        latitude: 7.9650,
        longitude: 80.7650,
        imageUrl: "https://images.unsplash.com/photo-1567157802189-aadc856131dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGlkdXJhbmdhbGF8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Dambulla Cave Temple",
        description: "UNESCO cave temple complex with centuries-old Buddhist murals.",
        latitude: 7.8567,
        longitude: 80.6492,
        imageUrl: "https://media.istockphoto.com/id/2225116512/photo/interior-of-the-second-cave-of-the-great-kings-dambulla-cave-temple-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=DhgFLb-qzU6-BDK4mUdQLtz4LANl9a8fbXzKXN9wEuk=",
      },
      {
        name: "Habarana",
        description: "Convenient nature and safari base near Sri Lanka’s Cultural Triangle.",
        latitude: 8.0366,
        longitude: 80.7467,
        imageUrl: "https://images.unsplash.com/photo-1739519286145-142b8bae9955?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFiYXJhbmF8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Minneriya National Park",
        description: "Wildlife park famous for seasonal elephant gatherings.",
        latitude: 8.0371,
        longitude: 80.9036,
        imageUrl: "https://media.istockphoto.com/id/579253338/photo/elephant-in-minneriya-wildlife-reserve-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=7HCQknDpcirxuPROMdM7JiRZcbT4gLbXCVrquig3N5o=",
      },
      {
        name: "Kaudulla National Park",
        description: "Forest and reservoir landscape known for elephant safaris.",
        latitude: 8.1574,
        longitude: 80.9030,
        imageUrl: "https://media.istockphoto.com/id/2214842565/photo/great-white-heron-great-egret-ardea-alba-kaudulla-national-park-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=iG2fLd4SlFv33BeTd2xxvQiCAl0Qa128OuJ_Tfb6Zus=",
      },
      {
        name: "Ritigala Forest Monastery",
        description: "Ancient monastery ruins hidden in a protected forest reserve.",
        latitude: 8.1183,
        longitude: 80.6550,
        imageUrl: "https://media.istockphoto.com/id/824313452/photo/tropical-rainforest-in-huai-yang-national-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=ftrw7Th53PhY9ISOG0zyyIHBiqPu98r6NgJ-kQAG1ew=",
      },
      {
        name: "Sigiriya Museum",
        description: "Museum presenting the archaeology, art, and history of Sigiriya.",
        latitude: 7.9545,
        longitude: 80.7547,
        imageUrl: "https://media.istockphoto.com/id/494183765/photo/wall-painting-sigiriya-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=_uhyT83D2t3-4hwjy9A7ysugBLZxcdl3cjr--UGq-OM=",
      }
    ],
    hotels: [
      { name: "Water Garden Sigiriya", type: "luxury", description: "Luxury villas with views of the rock", priceRange: "$300-600" },
      { name: "Sigiriya Hostel", type: "budget", description: "Backpacker hostel with sunset views", priceRange: "$10-20" }
    ],
    historicalSignificance: "Built by King Kashyapa in the 5th century AD, this ancient capital features sophisticated hydraulic engineering, frescoes, and mirror walls.",
    mustTryFood: ["Village Style Rice & Curry", "Fresh Fruits", "Buffalo Curd with Treacle", "Local Arrack Cocktails"],
    travelRoute: "From Colombo: Take the A6 highway via Kurunegala and Dambulla (4 hours). From Kandy, it's 2.5 hours via Matale.",
    imageUrl: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lnaXJpeWF8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 7.9570, longitude: 80.7603 }
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    nameSinhala: "අනුරාධපුර",
    nameTamil: "அனுராதபுரம்",
    province: "North Central",
    description: "The first ancient capital of Sri Lanka, sacred city with massive dagobas.",
    topPlaces: [
      {
        name: "Ruwanwelisaya Stupa",
        description: "Massive sacred stupa and one of Anuradhapura’s best-known monuments.",
        latitude: 8.3500,
        longitude: 80.3964,
        imageUrl: "https://media.istockphoto.com/id/2199131818/photo/ruwanweli-maha-seya-anuradhapura-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=vI_iVhTneM2fl2jCI_5gQAeqLLfZkJWLSo7wTUA4W0o=",
      },
      {
        name: "Sri Maha Bodhi",
        description: "Sacred Bodhi tree with an ancient documented history.",
        latitude: 8.3447,
        longitude: 80.3969,
        imageUrl: "https://media.istockphoto.com/id/1341755563/photo/jaya-sri-maha-bodhi-temple.webp?a=1&b=1&s=612x612&w=0&k=20&c=x1cZhrz7vlyHlnOp3Rwt5gkkKM0lc0fYtQmCmq8mXcY=",
      },
      {
        name: "Jetavanaramaya",
        description: "Monumental brick stupa from ancient Anuradhapura.",
        latitude: 8.3514,
        longitude: 80.4037,
        imageUrl: "https://images.unsplash.com/photo-1606326128683-60ff4212127e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV0aGF3YW5hcmFtYXlhfGVufDB8fDB8fHww",
      },
      {
        name: "Abhayagiri Stupa",
        description: "Ancient monastic complex centered on a giant stupa.",
        latitude: 8.3711,
        longitude: 80.3952,
        imageUrl: "https://media.istockphoto.com/id/1779901400/photo/abhayagiri-dagoba-in-anuradhapura.webp?a=1&b=1&s=612x612&w=0&k=20&c=QolEd1Cbttd2f1XeCbPhe8rBVWvbsk_BEm6ARw6BHnM=",
      },
      {
        name: "Mihintale",
        description: "Historic mountain monastery associated with the arrival of Buddhism.",
        latitude: 8.3503,
        longitude: 80.5166,
        imageUrl: "https://media.istockphoto.com/id/658161324/photo/yala-national-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=MKRQk2-fYIJ6QmtygueAqjx6WL-F_sIb-j8d26dlrIc=",
      },
      {
        name: "Isurumuniya Temple",
        description: "Rock temple famous for ancient carvings and ponds.",
        latitude: 8.3346,
        longitude: 80.3907,
        imageUrl: "https://media.istockphoto.com/id/2285862990/photo/isurumuniya-buddhist-temple-and-sacred-pond-in-anuradhapura-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=TyHc9CENz8aslL6F1jsiKWT2_wy02xir8kQhBRAeo6M=",
      },
      {
        name: "Kuttam Pokuna",
        description: "Twin bathing ponds showcasing advanced ancient engineering.",
        latitude: 8.3712,
        longitude: 80.3990,
        imageUrl: "https://images.unsplash.com/photo-1759727257765-051ce04bd8b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3V0dGFtJTIwcG9rdW5hfGVufDB8fDB8fHww",
      },
      {
        name: "Samadhi Buddha Statue",
        description: "Serene ancient seated Buddha statue in the sacred city.",
        latitude: 8.3740,
        longitude: 80.3972,
        imageUrl: "https://images.unsplash.com/photo-1665908439273-2d6998a74937?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FtYWRoaSUyMGJ1ZGRoYSUyMHN0YXR1cGF8ZW58MHx8MHx8fDA%3D",
      }
    ],
    hotels: [
      { name: "Ulagalla Resort", type: "luxury", description: "Eco-luxury resort with private pools", priceRange: "$300-500" },
      { name: "Milano Tourist Rest", type: "budget", description: "Family-run guesthouse near ruins", priceRange: "$15-30" }
    ],
    historicalSignificance: "Founded in the 4th century BC, Anuradhapura was the political and religious capital for 1,300 years. It showcases the earliest Sinhalese Buddhist civilization.",
    mustTryFood: ["Pittu with Coconut", "Traditional Jaggery", "Rice and Eight Curries", "Fresh Toddy"],
    travelRoute: "From Colombo: Take the A6 Puttalam Road (5 hours) or train to Anuradhapura station (5-6 hours). From Sigiriya: 1.5 hours via Habarana.",
    imageUrl: "https://media.istockphoto.com/id/1212171201/photo/mihintale-temple-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=FvN_Dtv2vaMp5TuMGL8IV8pij7-1lktR9NGicjBzflA=",
    coordinates: { latitude: 8.3114, longitude: 80.4037 }
  },
  {
    id: "polonnaruwa",
    name: "Polonnaruwa",
    nameSinhala: "පොළොන්නරුව",
    nameTamil: "பொலன்னறுவை",
    province: "North Central",
    description: "The second ancient capital with well-preserved ruins and the Gal Viharaya.",
    topPlaces: [
      {
        name: "Gal Vihara",
        description: "Four remarkable Buddha images carved from a single granite face.",
        latitude: 7.9662,
        longitude: 81.0047,
        imageUrl: "https://media.istockphoto.com/id/1482980603/photo/ancient-city-of-polonnaruwa-standing-buddha-at-gal-vihara-rock-temple-sri-lanka-asia.jpg?s=612x612&w=0&k=20&c=9yPwGhKmCMr18hkI4OdQQtXjBhAthck_fQmSy_yUL_I=",
      },
      {
        name: "Parakrama Samudra",
        description: "Vast ancient reservoir built for irrigation and water management.",
        latitude: 7.9388,
        longitude: 80.9749,
        imageUrl: "https://media.istockphoto.com/id/1163643077/photo/lake-parakrama-samudraya.jpg?s=612x612&w=0&k=20&c=sWjn3ghcnLs27F0rvnY5OpMlCDYor9zzwRTVcYAB5HU=",
      },
      {
        name: "Royal Palace of King Parakramabahu",
        description: "Ruins of the ancient royal palace complex.",
        latitude: 7.9403,
        longitude: 81.0003,
        imageUrl:"https://media.istockphoto.com/id/1671157122/photo/polonnaruwa.jpg?s=612x612&w=0&k=20&c=YNxnso0rte_GB-CFV9cyqypRPpxUt4wonIjOSHtT2fM=",
      },
      {
        name: "Polonnaruwa Vatadage",
        description: "Elegant circular relic house with carved stone entrances.",
        latitude: 7.9479,
        longitude: 81.0018,
        imageUrl: "https://media.istockphoto.com/id/962107884/photo/polonnaruwa-sri-lanka.jpg?s=612x612&w=0&k=20&c=M8LzG9gB9dWot_ud6C3TLIaoS35czgdZB1Zvm7KFlsQ=",
      },
      {
        name: "Rankoth Vehera",
        description: "Large brick stupa from the Polonnaruwa period.",
        latitude: 7.9606,
        longitude: 81.0059,
        imageUrl: "https://media.istockphoto.com/id/895713408/photo/polonnaruwa-city-sri-lanka.jpg?s=612x612&w=0&k=20&c=O23_BdUcxa_onYr7kn5g6E_hVpG2pVPtqw2bbsbGUug=",
      },
      {
        name: "Lankatilaka Image House",
        description: "Tall ruined image house containing a giant standing Buddha.",
        latitude: 7.9634,
        longitude: 81.0045,
        imageUrl: "https://media.istockphoto.com/id/696947682/photo/polonnaruwa-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=V3T9ssb-NCCDnm8igDInZ2C86bPCrJ3me6WdjqxSzJk=",
      },
      {
        name: "Nissanka Latha Mandapaya",
        description: "Stone pavilion known for its lotus-stem-shaped columns.",
        latitude: 7.9482,
        longitude: 81.0010,
        imageUrl: "https://media.istockphoto.com/id/914932616/photo/the-ancient-council-chamber-of-sri-lankan-king-in-polonnaruwa.jpg?s=612x612&w=0&k=20&c=N75SWxLP31cc83ZniUJZhTB7xqJlI0dQTYg35DIYLUY=",
      },
      {
        name: "Minneriya National Park",
        description: "Nearby wildlife park renowned for wild elephant herds.",
        latitude: 8.0371,
        longitude: 80.9036,
        imageUrl: "https://media.istockphoto.com/id/476903360/photo/asian-elephant-in-minneriya-national-park-sri-lanka.jpg?s=612x612&w=0&k=20&c=QGm6vN6P7pVFpUSURtIJwiJy_SPOV9ZBBVHC7qdmVdg=",
      }
    ],
    hotels: [
      { name: "The Lake Hotel", type: "luxury", description: "Boutique hotel overlooking Parakrama Samudra", priceRange: "$180-350" },
      { name: "Sudu Araliya Hotel", type: "budget", description: "Comfortable hotel near the lake", priceRange: "$40-80" }
    ],
    historicalSignificance: "The second capital of Sri Lanka (11th-13th centuries), Polonnaruwa represents the island's golden age of irrigation, architecture, and art under Parakramabahu I.",
    mustTryFood: ["Traditional Rice and Curry", "Kokis (New Year sweet)", "Milk Toffee", "Wood Apple Juice"],
    travelRoute: "From Colombo: Take the A6 highway (5 hours). From Sigiriya: 1.5 hours. Combine with Anuradhapura for a cultural triangle tour.",
    imageUrl: "https://images.unsplash.com/photo-1709729508706-87741ec2d50a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9sb25uYXJ1d2F8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 7.9403, longitude: 81.0188 }
  },
  {
    id: "trincomalee",
    name: "Trincomalee",
    nameSinhala: "ත්‍රිකුණාමලය",
    nameTamil: "திருகோணமலை",
    province: "Eastern",
    description: "Natural deep-water harbor with pristine beaches and Hindu temples.",
    topPlaces: [
      {
        name: "Nilaveli Beach",
        description: "Long sandy beach with clear water north of Trincomalee.",
        latitude: 8.6869,
        longitude: 81.1910,
        imageUrl: "https://media.istockphoto.com/id/1174410228/photo/passikudah-beach-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=HBcZ3LHQNKNggVcbB3mis9I-jRIq_eVKqs4ajAWOph4=",
      },
      {
        name: "Koneswaram Temple",
        description: "Historic Hindu temple dramatically located on Swami Rock.",
        latitude: 8.5874,
        longitude: 81.2451,
        imageUrl: "https://media.istockphoto.com/id/2234312974/photo/lord-shiva-statue-at-koneswaram-kovil-trincomalee-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=YrpV94ZmE2QPY5DJ02Rr9CvIeEa-iFV3tcctz3qYG_o=",
      },
      {
        name: "Pigeon Island National Park",
        description: "Marine park popular for snorkeling among coral and tropical fish.",
        latitude: 8.7218,
        longitude: 81.2048,
        imageUrl: "https://media.istockphoto.com/id/1311438798/photo/people-snorkel-on-a-coral-reef-in-pigeon-island-national-park-near-nilaveli-village-in-sri.jpg?s=612x612&w=0&k=20&c=y11tfNtLtzL98wPE8z8nbTIkdEhs5KXbXJHbCFy874o=",
      },
      {
        name: "Fort Frederick",
        description: "Colonial fort at the entrance to the Swami Rock peninsula.",
        latitude: 8.5827,
        longitude: 81.2420,
        imageUrl: "https://media.istockphoto.com/id/1203429827/photo/galle-fort-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=csh7y6HF5BvKDJQwdVa7902RodLbmZWhDzy6-61rVuY=",
      },
      {
        name: "Marble Beach",
        description: "Sheltered beach known for calm blue water.",
        latitude: 8.5243,
        longitude: 81.2195,
        imageUrl: "https://media.istockphoto.com/id/1969480001/photo/beautiful-indian-ocean-coastline-on-the-island-of-sri-lanka-mirissa.jpg?s=612x612&w=0&k=20&c=k9NvqhVQU275-nZqWVx9ZTNle2VkkQaul5LDm1agoAk=",
      },
      {
        name: "Uppuveli Beach",
        description: "Relaxed beach area with guesthouses and restaurants.",
        latitude: 8.6144,
        longitude: 81.2163,
        imageUrl: "https://media.istockphoto.com/id/469447540/photo/wild-beach-in-uppuveli-sri-lanka.jpg?s=612x612&w=0&k=20&c=wxUQMZM78YQjZmDT6RqvtQDHLzDa8zH6M3DTRCc2Hu8=",
      },
      {
        name: "Kanniya Hot Springs",
        description: "Historic group of naturally warm wells near Trincomalee.",
        latitude: 8.6164,
        longitude: 81.1726,
        imageUrl: "https://media.istockphoto.com/id/843712456/photo/kanniya-hot-springs-trincomalee.jpg?s=612x612&w=0&k=20&c=KKbowVvDF1DDD0Q2XyMM2q0Uv0_6KnmYJJDz8yB3Q10=",
      },
      {
        name: "Dutch Bay Beach",
        description: "Town beach with views across Trincomalee Bay.",
        latitude: 8.5737,
        longitude: 81.2389,
        imageUrl: "https://media.istockphoto.com/id/482330346/photo/bile-fort.jpg?s=612x612&w=0&k=20&c=m3ux-7l0WMFjVXzcx27ahtJziXoA7wudxmPDT25BoX8=",
      }
    ],
    hotels: [
      { name: "Anantamaa Hotel", type: "luxury", description: "Beachfront luxury with spa", priceRange: "$200-400" },
      { name: "Nilaveli Beach Hotel", type: "budget", description: "Direct beach access, great value", priceRange: "$30-60" }
    ],
    historicalSignificance: "One of the oldest cities in Asia, Trincomalee's natural harbor attracted traders from Greece, Rome, and China. It has been significant in maritime history for 2,500 years.",
    mustTryFood: ["Fresh Seafood Grill", "Crab Curry", "Kottu Roti (Eastern Style)", "Lamprais"],
    travelRoute: "From Colombo: Take the A6 highway (6 hours). Domestic flights also available to China Bay Airport (45 mins). From Sigiriya: 2 hours via Habarana.",
    imageUrl: "https://images.unsplash.com/photo-1693112118583-7006a44ea44e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJpbmNvbWFsZWV8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 8.5874, longitude: 81.2152 }
  },
  {
    id: "jaffna",
    name: "Jaffna",
    nameSinhala: "යාපනය",
    nameTamil: "யாழ்ப்பாணம்",
    province: "Northern",
    description: "Cultural capital of Tamil Sri Lanka with unique cuisine and historic sites.",
    topPlaces: [
      {
        name: "Nallur Kandaswamy Temple",
        description: "Major Hindu temple famous for festivals and Dravidian architecture.",
        latitude: 9.6745,
        longitude: 80.0301,
        imageUrl: "https://media.istockphoto.com/id/899956434/photo/nallur-kandaswamy-temple-jaffna.jpg?s=612x612&w=0&k=20&c=DQGoSioIqlWw57DFkhf4yMChYTUPIvYUGYghvh4neFg=",
      },
      {
        name: "Jaffna Fort",
        description: "Large coastal fort first built by the Portuguese and expanded by the Dutch.",
        latitude: 9.6620,
        longitude: 80.0082,
        imageUrl: "https://media.istockphoto.com/id/1367298958/video/the-ancient-fort-of-jaffna-sri-lanka.jpg?s=640x640&k=20&c=V1SIjD1eG36VlkCWmpWzXAj0BqUkD-LQLxSS083b5yQ=",
      },
      {
        name: "Delft Island",
        description: "Remote island known for coral walls, wild horses, and historic ruins.",
        latitude: 9.5170,
        longitude: 79.6940,
        imageUrl: "https://media.istockphoto.com/id/1209420553/photo/delft-island-in-jaffna-sri-lanka.jpg?s=612x612&w=0&k=20&c=r6osP-SKHQMkumcxOrl8tynKc7OpJRVk-ciOZ2iCHmg=",
      },
      {
        name: "Nagadeepa Purana Vihara",
        description: "Important Buddhist temple on Nainativu Island.",
        latitude: 9.6037,
        longitude: 79.7722,
        imageUrl: "https://media.istockphoto.com/id/1475442756/photo/sangamitta-temple.jpg?s=612x612&w=0&k=20&c=2b9OFI0u9Ojf9TBUQ9DP2xBBzPgpgq8DDzco3ukDZg8=",
      },  
      {
        name: "Jaffna Public Library",
        description: "Landmark library and cultural symbol in the city center.",
        latitude: 9.6626,
        longitude: 80.0117,
        imageUrl: "https://media.istockphoto.com/id/1207710069/photo/jaffna-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=PNBIiZkPEOod6mNhKbN37adYPo0t55y2FFM3QDwPck0=",
      },
      {
        name: "Keerimalai Sacred Water Spring",
        description: "Seaside freshwater spring beside historic temples.",
        latitude: 9.8160,
        longitude: 80.0087,
        imageUrl: "https://media.istockphoto.com/id/639566292/photo/jaffna-keerimalai-springs-people-swimming-full-h.jpg?s=612x612&w=0&k=20&c=IPXPr9ltJgVRfllF82epgkD_3t9AFChI-S7LW2UbPbs=",
      },
      {
        name: "Casuarina Beach",
        description: "Shallow sandy beach on the Karainagar side of the peninsula.",
        latitude: 9.7545,
        longitude: 79.9534,
        imageUrl:"https://media.istockphoto.com/id/2159583395/video/the-coast-in-negombo-sri-lanka.jpg?s=640x640&k=20&c=EpLWM_GXCrC0QYKXW79jJo5Yc1dJfKFgRCWTJ0ZujY8=",
      },
      {
        name: "Dambakola Patuna",
        description: "Historic landing site and Buddhist pilgrimage location.",
        latitude: 9.8168,
        longitude: 80.0352,
        imageUrl:"https://media.istockphoto.com/id/1487544295/photo/discovering-the-beauty-of-kala-wewa-in-sri-lanka-through-stunning-drone-photos.jpg?s=612x612&w=0&k=20&c=BYVzhmfHhabRaRtTDS3fXFXusbH9vTaFn38AhQQNrk0=" ,
      }
    ],
    hotels: [
      { name: "Jetwing Jaffna", type: "luxury", description: "Modern luxury hotel in city center", priceRange: "$150-280" },
      { name: "Green Grass Hotel", type: "budget", description: "Clean hotel with traditional hospitality", priceRange: "$25-50" }
    ],
    historicalSignificance: "Jaffna was the capital of a Tamil kingdom from the 13th-17th centuries. The region has a distinct culture, language, and traditions separate from the rest of Sri Lanka.",
    mustTryFood: ["Jaffna Crab Curry", "Odiyal Kool (Seafood Soup)", "Palmyrah Toffee", "Mango Curry"],
    travelRoute: "From Colombo: Take the A9 highway (8-9 hours) or fly to Jaffna Airport (1 hour). Train service also available (6-8 hours).",
    imageUrl: "https://images.unsplash.com/photo-1725680968792-c8dce6d6cf18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFmZm5hfGVufDB8fDB8fHww",
    coordinates: { latitude: 9.6615, longitude: 80.0255 }
  },
  {
    id: "batticaloa",
    name: "Batticaloa",
    nameSinhala: "මඩකලපුව",
    nameTamil: "மட்டக்களப்பு",
    province: "Eastern",
    description: "Lagoon city known for singing fish and unspoiled beaches.",
    topPlaces: [
      {
        name: "Batticaloa Lagoon",
        description: "Large lagoon ideal for scenic drives, boating, and birdwatching.",
        latitude: 7.7170,
        longitude: 81.6920,
        imageUrl: "https://media.istockphoto.com/id/475974134/photo/traditional-fisherman-in-palameenmadu-beach-sri-lanka.jpg?s=612x612&w=0&k=20&c=y8QTMsUPnk4uvV1CIxvaTZsfvCIc0nQK_GB-evOrFN8=",
      },
      {
        name: "Pasikudah Beach",
        description: "Famous bay with shallow, calm, turquoise water.",
        latitude: 7.9299,
        longitude: 81.5617,
        imageUrl: "https://media.istockphoto.com/id/2170855359/photo/aerial-view-of-beach-clear-ocean-and-palm-trees-in-pasikuda-sri-lanka.jpg?s=612x612&w=0&k=20&c=RrmPkuOoplg7ebBOa7_mrSCUkLuV4fQ0aAEuQ0ujcOM=",
      },
      {
        name: "Kalkudah Beach",
        description: "Quiet stretch of sand beside Pasikudah.",
        latitude: 7.9230,
        longitude: 81.5640,
        imageUrl: "https://media.istockphoto.com/id/1475497847/photo/ocean-waves-on-the-tropical-sand-beach-summer-holiday-beach-background-beautiful-white-sand.jpg?s=612x612&w=0&k=20&c=W8RjWheeTEIR5SYHOzpAltd8VV52bWmb7KBNO4bFsvU=s",
      },
      {
        name: "Batticaloa Fort",
        description: "Compact Dutch-era fort surrounded by lagoon water.",
        latitude: 7.7210,
        longitude: 81.6990,
        imageUrl: "https://media.istockphoto.com/id/1254409412/photo/batticaloa-fort-sri-lanka.jpg?s=612x612&w=0&k=20&c=Lo11hV_41fRBPGezTolAGxVDtbez0nuxgYPK9Y94cEk=",
      },
      {
        name: "Kallady Bridge",
        description: "Historic bridge associated with Batticaloa’s singing-fish folklore.",
        latitude: 7.7160,
        longitude: 81.7034,
        imageUrl: "https://media.istockphoto.com/id/2276757470/photo/the-parallel-kalutara-road-and-railway-bridges-spanning-the-kalu-ganga-in-kalutara-sri-lanka.jpg?s=612x612&w=0&k=20&c=94V8QmG35u7wP9wuPaiYw1EZoDfHv4bNYxTgOtbeH84=",
      },
      {
        name: "Batticaloa Lighthouse",
        description: "Scenic lighthouse near the lagoon mouth.",
        latitude: 7.7507,
        longitude: 81.6787,
        imageUrl: "https://www.istockphoto.com/photo/batticaloa-lighthouse-sri-lanka-gm859856304-142127851?searchscope=image%2Cfilm",
      },
      {
        name: "Navalady Beach",
        description: "Wide local beach east of Batticaloa city.",
        latitude: 7.6998,
        longitude: 81.7380,
        imageUrl: "https://media.istockphoto.com/id/1440952828/photo/an-evening-on-kottukkal-beach-in-jetwing-surf-hotel-side-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=nN1td9217bSyVPuwlH2_UlgOjWR91cONPqNXd7QNUwI=",
      },
      {
        name: "Mamangam Temple",
        description: "Historic Hindu temple and important local religious site.",
        latitude: 7.7246,
        longitude: 81.6892,
        imageUrl: "https://media.istockphoto.com/id/1208659081/photo/nalanda-gedige-the-most-central-point-of-sri-lanka-unesco-heritage-site.jpg?s=612x612&w=0&k=20&c=jKT6-jd94-XAgZMoC078OYFAShTelh8oOW7-YrSNges=",
      }
    ],
    hotels: [
      { name: "Uga Bay Resort", type: "luxury", description: "Beachfront villas on Pasikudah Beach", priceRange: "$250-500" },
      { name: "Palm Beach Hotel", type: "budget", description: "Simple hotel near the beach", priceRange: "$20-40" }
    ],
    historicalSignificance: "Batticaloa was a strategic trading post for the Portuguese and Dutch. Its name comes from 'Matted-sails' referring to the local fishing boats.",
    mustTryFood: ["Batticaloa Crab Curry", "Seafood Kottu", "Rice and Fish Curry", "Coconut Toddy"],
    travelRoute: "From Colombo: Take the A4 highway (7 hours). From Trincomalee: 3 hours via Chenkalady. Also accessible by train.",
    imageUrl: "https://images.unsplash.com/photo-1673969615018-92dc73c756f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmF0dGljYWxvYXxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { latitude: 7.7300, longitude: 81.7000 }
  },
  {
    id: "matara",
    name: "Matara",
    nameSinhala: "මාතර",
    nameTamil: "மாத்தறை",
    province: "Southern",
    description: "Coastal district with Dutch forts and some of Sri Lanka's best surfing beaches.",
    topPlaces: [
      {
        name: "Mirissa Beach",
        description: "Popular palm-fringed beach known for sunsets and whale-watching trips.",
        latitude: 5.9483,
        longitude: 80.4716,
        imageUrl: "https://media.istockphoto.com/id/2162681925/photo/woman-looking-at-ocean-standing-among-palm-trees-grove.jpg?s=612x612&w=0&k=20&c=HVn3hXBylZ_zIGw7dA99I2pEUOCOIbmdWZOE4r9iu6A=",
      },
      {
        name: "Weligama Bay",
        description: "Wide bay famous for surfing and coastal scenery.",
        latitude: 5.9730,
        longitude: 80.4280,
        imageUrl: "https://media.istockphoto.com/id/2164074186/photo/aerial-view-of-coconut-grove-on-the-cliff-above-the-ocean.jpg?s=612x612&w=0&k=20&c=NvWsoc6Rp8033X8wqqUfPSp1vHkB2xPjsjZtArSeodc=",
      },
      {
        name: "Dondra Head Lighthouse",
        description: "Tall lighthouse near the southernmost tip of Sri Lanka.",
        latitude: 5.9218,
        longitude: 80.5908,
        imageUrl: "https://media.istockphoto.com/id/1303851661/photo/white-lighthouse-dondra-head-and-tropical-palms-sri-lanka-near-matara.jpg?s=612x612&w=0&k=20&c=A-GWZiCZLjig1RCGnxTIY7NvxlrZw-E9aOyWaUImhX8=",
      },
      {
        name: "Polhena Beach",
        description: "Reef-protected beach popular for swimming and snorkeling.",
        latitude: 5.9364,
        longitude: 80.5219,
        imageUrl: "https://media.istockphoto.com/id/1465840207/photo/sri-lanka-southern-tropical-coastline.jpg?s=612x612&w=0&k=20&c=ml3D18JSPsHDZx-yxTD83G7BouLG_9IeYJXHuGALElw=",
      },
      {
        name: "Matara Fort",
        description: "Historic Dutch fortification beside the Nilwala River.",
        latitude: 5.9464,
        longitude: 80.5467,
        imageUrl: "https://media.istockphoto.com/id/504398345/photo/fort-of-galle-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=ijfLc810IuR9HJT0V6VK-1jRkuoa6ASYUEsMoh4ooLo=",
      },
      {
        name: "Star Fort Matara",
        description: "Small star-shaped Dutch fort and museum.",
        latitude: 5.9504,
        longitude: 80.5484,
        imageUrl: "https://media.istockphoto.com/id/504401889/photo/fort-of-galle-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=LbUaor6SQQz9SDdgPFNY7oB8yBkcuinOmixUVMs3si8=",
      },
      {
        name: "Paravi Duwa Temple",
        description: "Buddhist temple on a small offshore island linked by a bridge.",
        latitude: 5.9448,
        longitude: 80.5496,
        imageUrl: "https://media.istockphoto.com/id/1044272330/photo/entrance-to-matara-parevi-duwa-buddhist-temple-sri-lanka.jpg?s=612x612&w=0&k=20&c=gg-gTjhaY-H2IYWvfOaeOO6BYYwcI8gIkvBC2muUFek=",
      },
      {
        name: "Weherahena Temple",
        description: "Temple complex known for its large Buddha statue and underground murals.",
        latitude: 5.9483,
        longitude: 80.5874,
        imageUrl: "https://media.istockphoto.com/id/2233662189/photo/sri-lanka-giant-buddha-at-weherahena-temple-in-matara.jpg?s=612x612&w=0&k=20&c=3yox8iGO5aO5gPq1504ejbbE5vydq4ffe99N1yNF7Ao=",
      }
    ],
    hotels: [
      { name: "Cape Weligama", type: "luxury", description: "Clifftop resort with infinity pools", priceRange: "$400-800" },
      { name: "Hangtime Hostel", type: "budget", description: "Surf hostel popular with backpackers", priceRange: "$15-30" }
    ],
    historicalSignificance: "Matara was an important Dutch trading center. The Star Fort and Matara Fort remain as reminders of colonial rule along this strategic coastline.",
    mustTryFood: ["Weligama Fish Curry", "Coconut Roti", "Pol Sambol", "Fresh Seafood BBQ"],
    travelRoute: "From Galle: 30 minutes by train or bus along the coast. From Colombo: Take the Southern Expressway (2 hours) or coastal train (3 hours).",
    imageUrl: "https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg",
    coordinates: { latitude: 5.9549, longitude: 80.5550 }
  },
  {
    id: "hambantota",
    name: "Hambantota",
    nameSinhala: "හම්බන්තොට",
    nameTamil: "அம்பாந்தோட்டை",
    province: "Southern",
    description: "Emerging tourism hub with national parks and bird sanctuaries.",
    topPlaces: [
      {
        name: "Yala National Park",
        description: "Sri Lanka’s best-known safari park for leopards, elephants, and birds.",
        latitude: 6.3681,
        longitude: 81.5230,
        imageUrl: "https://media.istockphoto.com/id/1175514062/photo/mother-and-baby-elephant.jpg?s=612x612&w=0&k=20&c=bI_Jp1deHcwV6ttezhFskNYvMj_xOqtGERfsTX_j8vk=",
      },
      {
        name: "Bundala National Park",
        description: "Wetland national park famous for migratory birds.",
        latitude: 6.1950,
        longitude: 81.2300,
        imageUrl: "https://media.istockphoto.com/id/1501031688/photo/morning-golden-hour-landscape-in-bundala-national-park-sun-rays-peek-through-clouds-and.jpg?s=612x612&w=0&k=20&c=22fHEjPylBAoIh4S_Uh6dyIQt6VguzLjN020HOf_n5U=",
      },
      {
        name: "Kalametiya Bird Sanctuary",
        description: "Coastal wetland sanctuary with lagoons and rich birdlife.",
        latitude: 6.0826,
        longitude: 80.9518,
        imageUrl: "https://media.istockphoto.com/id/2290235543/photo/scenic-wetland-landscape-with-a-lake-and-waterbirds-perched-on-dead-tree-branches-in-yala.jpg?s=612x612&w=0&k=20&c=hHdO1hUuYkvQeACWF9IX-fSWOUiQ3ECfAZ6pgf6kVb0=",
      },
      {
        name: "Tissa Wewa",
        description: "Ancient reservoir beside Tissamaharama with scenic sunset views.",
        latitude: 6.2871,
        longitude: 81.2883,
        imageUrl: "https://media.istockphoto.com/id/638544696/photo/lake-landscape-gigantic-trees-with-water-reflection.jpg?s=612x612&w=0&k=20&c=sNw_koYonJThf5dpZmbGG012PTqjDbwqZBjbL004HzM=",
      },
      {
        name: "Kirinda Temple",
        description: "Hilltop temple above a rugged southern beach.",
        latitude: 6.2192,
        longitude: 81.3377,
        imageUrl: "https://media.istockphoto.com/id/899956490/photo/kirinda-viharaya-temple-tissamaharama.jpg?s=612x612&w=0&k=20&c=LIyqK9A2QHBlZBRK7dAbZJsQyKUYw6BI5IC2q1bxJ6M=",
      },
      {
        name: "Ridiyagama Safari Park",
        description: "Large open-range safari park near Hambantota.",
        latitude: 6.2375,
        longitude: 80.9977,
        imageUrl: "https://media.istockphoto.com/id/1878818439/photo/young-woman-on-safari-journey-by-off-road-car-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=Kocpqy6vCr_ykc_KfP7I6vdG3vKjWVwRLRoGFChzUdA=",
      },
      
      {
        name: "Hambantota Salt Pans",
        description: "Expansive salt flats that attract waterbirds.",
        latitude: 6.1176,
        longitude: 81.1189,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf-SsM_X2QWCwzbg13xxS2h7Rs-SNq82Dxd_6URKeXBg&s=10",
      },
      {
        name: "Sithulpawwa Rock Temple",
        description: "Ancient rock monastery within the Yala landscape.",
        latitude: 6.4047,
        longitude: 81.4828,
        imageUrl: "https://media.istockphoto.com/id/1154114695/photo/sithulpawwa-rajamaha-viharaya-an-ancient-buddhist-monastery-located-in-hambantota-district.jpg?s=612x612&w=0&k=20&c=D0QgF99eeSw2a7AXsTpS11ih--ztUg-6drlkn_0pgt0=",
      },

      {
        name: "Kataragama Sacred City",
        description: "A famous sacred pilgrimage town visited by Buddhists, Hindus, and other devotees.",
        latitude: 6.4135,
        longitude: 81.3326,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nbkwxXW1fo_OrZXYmRRQ6DkF9cp0caOWitmex-44nQ&s=10",
      },

      {
        name: "Kiriwehera Rajamaha Viharaya",
        description: "An ancient Buddhist temple built on a rocky hill overlooking the southern coast.",
        latitude: 6.2167,
        longitude: 81.3333,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScrlUvmcCDhbCLGT_ooRQOsE9dDXagWnEblPhmtnzewQ&s=10",
      },

      {
        name: "Lunugamvehera National Park",
        description: "A protected national park known for elephants, wildlife, forests, and reservoirs.",
        latitude: 6.4667,
        longitude: 81.2000,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2l6lO0Yaup-B0SV4Ja272eWwRs6D1BBnLqDJPOXgKdw&s=10",
},

      {
        name: "Tangalle Beach",
        description: "A beautiful southern beach known for golden sand, palm trees, and peaceful coastal scenery.",
        latitude: 6.0243,
        longitude: 80.7941,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSww3H46emyz-tA7PWbtzU5F3EVavzzis4x6PRXtKhcQw&s=10",
      },

      {
        name: "siththamgallena rajamaha viharaya",
        description: "An ancient Buddhist rock temple in the Hambantota District, known for its peaceful natural surroundings, historic caves, and religious significance.",
        latitude: 6.2206599976597445, 
        longitude:80.63473462915192 ,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmsDvyIzu5c98fMipP11zv1tYH5rkauiVy_8xRgrKuQ&s=10",
      },
    ],
    hotels: [
      { name: "Cinnamon Wild Yala", type: "luxury", description: "Safari lodge on the edge of Yala", priceRange: "$300-600" },
      { name: "Tithira Guest House", type: "budget", description: "Family guesthouse near Tissamaharama", priceRange: "$20-40" }
    ],
    historicalSignificance: "Hambantota has ancient trading roots and was a key port in the maritime Silk Road. The area has seen rapid development with a new port and airport.",
    mustTryFood: ["Wild Game Curry", "Seafood Platter", "Tissa Wewa Fish", "Local Rice Varieties"],
    travelRoute: "From Colombo: Take the Southern Expressway to Hambantota (2.5 hours). Mattala Airport also offers flights from Colombo (30 mins).",
    imageUrl: "https://images.pexels.com/photos/321526/pexels-photo-321526.jpeg",
    coordinates: { latitude: 6.1246, longitude: 81.1186 }
  },
  {
    id: "kalutara",
    name: "Kalutara",
    nameSinhala: "කළුතර",
    nameTamil: "களுத்துறை",
    province: "Western",
    description: "Coastal district south of Colombo with temples and beach resorts.",
    topPlaces: [
      {
        name: "Kalutara Bodhiya",
        description: "Famous roadside Buddhist shrine beside the Kalu Ganga.",
        latitude: 6.5860,
        longitude: 79.9602,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Sp7lYE2mm7qDlgpjMPjKwREOe8vvLYbFcApKFbdOYQ&s=10",
      },
      {
        name: "Bentota Beach",
        description: "Long golden beach popular for water sports and resorts.",
        latitude: 6.4216,
        longitude: 79.9954,
        imageUrl: "https://media.istockphoto.com/id/1442927651/photo/indian-ocean-beach.jpg?s=612x612&w=0&k=20&c=dY6fYnQZRGoSPWrSd4CCNyt4jDHnG2debLhWdsDNjxs=",
      },
      {
        name: "Brief Garden",
        description: "Atmospheric landscaped garden created by Bevis Bawa.",
        latitude: 6.4534,
        longitude: 80.0396,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTMFnTVnGWk-OnNw3rHCeDXlM6Li9RpLBSy932kWEEg&s=10",
      },
      {
        name: "Richmond Castle",
        description: "Early-20th-century mansion with ornate architecture and gardens.",
        latitude: 6.5920,
        longitude: 80.0054,
        imageUrl: "https://media.istockphoto.com/id/1786526676/photo/daily-life-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=fJsjqFpTaM8acGuy8nlT4hXRkaAIygPMLejZM4pYHKQ=",
      },
      {
        name: "Beruwala Lighthouse",
        description: "Historic lighthouse on Barberyn Island off Beruwala.",
        latitude: 6.4667,
        longitude: 79.9709,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNmd3Lxq-Qfuh6tbAEkWAlLGYRRVY-BCW4v9PK9NRP1A&s=10",
      },  
      {
        name: "Pahiyangala Cave",
        description: "Large prehistoric cave and archaeological site near Bulathsinhala.",
        latitude: 6.6465,
        longitude: 80.2167,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgprpCuQsPsNInXiu6cCDW5Dl4AOe_xsc44MGzwLI3Qg&s=10",
      },
      {
        name: "Thudugala Ella",
        description: "Forest waterfall and natural bathing spot.",
        latitude: 6.6126,
        longitude: 80.0507,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYnyHqncW9lz33H4ik6dKYQPPI9Rkg7aW9M35zDwfBsQ&s=10",
      },
      {
        name: "Kalutara Beach",
        description: "Easy-access beach close to Kalutara town.",
        latitude: 6.5799,
        longitude: 79.9578,
        imageUrl: "https://media.istockphoto.com/id/1278750125/photo/wild-beautiful-beaches-of-sri-lanka.jpg?s=612x612&w=0&k=20&c=DpqdU29wJHALHg2c-y750Eit0-g5TmDmmjmoO7uVGlk=",
      }
    ],
    hotels: [
      { name: "Cinnamon Bentota Beach", type: "luxury", description: "Iconic beach resort by Geoffrey Bawa", priceRange: "$250-500" },
      { name: "Horizon Kite Center", type: "budget", description: "Kitesurfing hostel in Kalpitiya area", priceRange: "$25-50" }
    ],
    historicalSignificance: "Kalutara was an important spice trading center. The Kalutara Bodhiya marks the place where the sacred Bodhi tree first arrived in Sri Lanka.",
    mustTryFood: ["Kalutara Fish Curry", "Rambutan (seasonal)", "Mangosteen", "Fresh Toddy"],
    travelRoute: "From Colombo: Just 45 minutes south via the Galle Road (A2) or Southern Expressway. Regular trains also available.",
    imageUrl: "https://images.unsplash.com/photo-1697548532456-561b5f9a694d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FsdXRoYXJhfGVufDB8fDB8fHww",
    coordinates: { latitude: 6.5854, longitude: 79.9607 }
  },
  {
    id: "gampaha",
    name: "Gampaha",
    nameSinhala: "ගම්පහ",
    nameTamil: "கம்பஹா",
    province: "Western",
    description: "Suburban district surrounding Colombo with beaches and wetlands.",
    topPlaces: [
      {
        name: "Negombo Beach",
        description: "Popular west-coast beach close to Bandaranaike International Airport.",
        latitude: 7.2091,
        longitude: 79.8351,
        imageUrl:"https://media.istockphoto.com/id/171278887/photo/natural-beach.jpg?s=612x612&w=0&k=20&c=F8XfrroMvmhSq2tU4yppnvU57zJyEUFUuVZpvESTxSQ=",
      },
      {
        name: "Muthurajawela Marsh",
        description: "Large coastal wetland with birdlife and boat tours.",
        latitude: 7.0450,
        longitude: 79.9140,
        imageUrl: "data:image/jpeg;base64,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",
      },
      {
        name: "Dutch Canal Negombo",
        description: "Historic canal running through the Negombo area.",
        latitude: 7.2110,
        longitude: 79.8400,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9Bq0MhE-4CVUxBYA1OdefSnbfg1_dNxeclZKkIBChA&s",
      },
      {
        name: "Kelaniya Raja Maha Vihara",
        description: "Important Buddhist temple known for paintings and religious history.",
        latitude: 6.9567,
        longitude: 79.9218,
        imageUrl: "https://media.istockphoto.com/id/1346279195/photo/kelaniya-raja-maha-viharaya-temple.jpg?s=612x612&w=0&k=20&c=WQartWt1-UN-_Nt_hpuRHzovHPZkpezgaDaBxiVs-xI=",
      },
      {
        name: "Negombo Fish Market",
        description: "Lively coastal market showcasing the city’s fishing culture.",
        latitude: 7.2122,
        longitude: 79.8381,
        imageUrl: "https://media.istockphoto.com/id/1483046029/photo/open-air-fishmonger-at-a-beach.jpg?s=612x612&w=0&k=20&c=0hIs9ju89zWu5_1tSV9T-mMIZEuah-IxXfpnk670xjY=",
      },
      {
        name: "Hamilton Canal",
        description: "Colonial-era waterway stretching through Negombo and nearby towns.",
        latitude: 7.1808,
        longitude: 79.8445,
        imageUrl: "https://media.istockphoto.com/id/956181018/photo/dutch-canal-in-negombo.jpg?s=612x612&w=0&k=20&c=txKAbupf5acW0UdJN4CkyZgiq-TPDwbPm4rwS14jIZM=",
      },
      {
        name: "Henarathgoda Botanical Garden",
        description: "Historic botanical garden at Gampaha, famous for early rubber cultivation.",
        latitude: 7.0919,
        longitude: 80.0007,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQDi_c1DxIk__E8O92uJEHtjLzTqz19xYBKxeNWjeqQ&s=10",
      },
      {
        name: "Negombo Lagoon",
        description: "Large lagoon with fishing boats, mangroves, and birdlife.",
        latitude: 7.1700,
        longitude: 79.8400,
        imageUrl: "data:image/jpeg;base64,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",
      }
    ],
    hotels: [
      { name: "Jetwing Lagoon", type: "luxury", description: "Geoffrey Bawa-designed lagoon resort", priceRange: "$200-400" },
      { name: "Sevonrich Holiday Resort", type: "budget", description: "Beachfront budget accommodation", priceRange: "$20-40" }
    ],
    historicalSignificance: "Gampaha has been settled since ancient times, with the Kelaniya Temple dating back to the 3rd century BC. The Dutch left their mark with canals.",
    mustTryFood: ["Negombo Crab Curry", "Lamprais", "Dutch Burgher Dishes", "Fresh Lagoon Fish"],
    travelRoute: "From Colombo: 30 minutes north via the Colombo-Katunayake Expressway. From the airport: Just 20 minutes to Negombo.",
    imageUrl: "https://media.istockphoto.com/id/155283084/photo/old-port-of-negombo-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=tNnbnairEjGCfxmNq8mPzYnzTneMBwBM0UpWQuGqFiA=",
    coordinates: { latitude: 7.0840, longitude: 80.0098 }
  },
  {
    id: "ratnapura",
    name: "Ratnapura",
    nameSinhala: "රත්නපුර",
    nameTamil: "இரத்தினபுரி",
    province: "Sabaragamuwa",
    description: "The City of Gems, famous for sapphire and ruby mining.",
    topPlaces: [
      {
        name: "Sinharaja Forest Reserve",
        description: "UNESCO rainforest with exceptional endemic biodiversity.",
        latitude: 6.4167,
        longitude: 80.5000,
        imageUrl: "https://media.istockphoto.com/id/2255855742/photo/cloud-covers-the-mountain-and-cloud-forest.jpg?s=612x612&w=0&k=20&c=hgg4I2_vsp61ZcMBJ71ez5ZXaXjOLV1YRnKkVWhn21E=",
      },
      {
        name: "Bopath Ella",
        description: "Waterfall whose upper cascade resembles a sacred Bo leaf.",
        latitude: 6.7865,
        longitude: 80.3700,
        imageUrl: "https://media.istockphoto.com/id/2164075733/photo/serene-aerial-view-of-two-women-hiking-near-beautiful-waterfall-on-sri-lanka.jpg?s=612x612&w=0&k=20&c=asgFdk12ROnIzMjNu9NSSmbebj5t2DMWiBBP-tpw56s=",
      },
      {
        name: "Ratnapura Gem Mines",
        description: "Traditional gem-mining area associated with sapphires and other stones.",
        latitude: 6.6828,
        longitude: 80.3992,
        imageUrl: "https://media.istockphoto.com/id/2270340828/photo/open-pit.jpg?s=612x612&w=0&k=20&c=eKPReW16xJY8A0ao4uRCMoSJ0ezfdQockzPlb3kG1kY=",
      },
      {
        name: "Sri Pada / Adam’s Peak",
        description: "Sacred mountain climbed by pilgrims and hikers during the season.",
        latitude: 6.8096,
        longitude: 80.4994,
        imageUrl: "https://media.istockphoto.com/id/1215958716/photo/sri-pada-adams-peak-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=8f-sConqxRGXPiAPi3-Ug_KdhkuF24suBTRe2QndO6Q=",
      },
      {
        name: "Maha Saman Devalaya",
        description: "Historic shrine dedicated to deity Saman, guardian of Sri Pada.",
        latitude: 6.6808,
        longitude: 80.3991,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnzRmlX6v-J2G6DmQQVTBaWGomFtxvYWpJDdulntiVdw&s=10",
      },
      {
        name: "Batadombalena Cave",
        description: "Prehistoric cave site with important archaeological discoveries.",
        latitude: 6.7885,
        longitude: 80.4444,
        imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJp2JuGD01wBiSqnSuuhs2ROD_kUz54tbcGgU04W98AA&s=10",
      },
      {
        name: "Katugas Ella",
        description: "Small scenic waterfall close to Ratnapura town.",
        latitude: 6.7057,
        longitude: 80.3812,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zAM9FOyC6fZ5R_sLj1QSYVygYrF0012ZW_zMs3bj-g&s",
      },
      {
        name: "Kirindi Ella",
        description: "Tall waterfall surrounded by lush Sabaragamuwa scenery.",
        latitude: 6.6302,
        longitude: 80.6390,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFMCoZLGa5GQHg-z-kIXSDDMPNpm37W7MDWQC0YdwAqQ&s=10",
      }
    ],
    hotels: [
      { name: "Gem Land Hotel", type: "luxury", description: "Boutique hotel with gem museum", priceRange: "$100-200" },
      { name: "Palm Garden Guest House", type: "budget", description: "Family-run guesthouse near waterfalls", priceRange: "$15-30" }
    ],
    historicalSignificance: "Ratnapura has been the center of Sri Lanka's gem trade for over 2,000 years. Ancient Greek and Roman texts mention Ratnapura gems.",
    mustTryFood: ["Ratnapura Red Rice", "Fresh Water Fish Curry", "Jackfruit Dishes", "Tropical Fruits"],
    travelRoute: "From Colombo: Take the A4 highway through Avissawella (2 hours). From Kandy: 2.5 hours via Gelioya.",
    imageUrl: "data:image/jpeg;base64,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",
    coordinates: { latitude: 6.6828, longitude: 80.3990 }
  },
  {
    id: "kegalle",
    name: "Kegalle",
    nameSinhala: "කෑගල්ල",
    nameTamil: "கேகாலை",
    province: "Sabaragamuwa",
    description: "Hill country gateway with rubber plantations and elephant orphanage.",
    topPlaces: [
      {
        name: "Pinnawala Elephant Orphanage",
        description: "Well-known elephant care center beside the Maha Oya.",
        latitude: 7.3012,
        longitude: 80.3881,
        imageUrl: "https://media.istockphoto.com/id/486506506/photo/pinnawala-elephant-orphanage-sri-lanka.jpg?s=612x612&w=0&k=20&c=s0X21_jdAlOT889dKegTR8rLDmGY3XUYQ-SVkNunZY8=",
      },
      {
        name: "Alagalla Mountain",
        description: "Popular hiking mountain with broad views over the central hills.",
        latitude: 7.2508,
        longitude: 80.4473,
        imageUrl: "https://media.istockphoto.com/id/1817904372/photo/landscape.jpg?s=612x612&w=0&k=20&c=la2B8KCljVx2YRjkgXm9b3rRnTCEHOI_pFSofpZY4tU=",
      },
      {
        name: "Belilena Cave",
        description: "Large prehistoric cave near Kitulgala.",
        latitude: 6.9948,
        longitude: 80.4174,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWuyv_LtUcH8Pa2IswAFrU18KYKvT4hqofZ3Ty4VL4lA&s=10",
      },
      {
        name: "Kitulgala",
        description: "Adventure town known for white-water rafting and rainforest scenery.",
        latitude: 6.9895,
        longitude: 80.4173,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRlfZCIyReeTFGwYZVDiBr7XXrJh5ZN5FL0sEKzN-CoQ&s=10",
      },
      {
        name: "Makandawa Forest Reserve",
        description: "Lowland rainforest reserve near Kitulgala with rich birdlife.",
        latitude: 6.9890,
        longitude: 80.4150,
        imageUrl: "https://media.istockphoto.com/id/2286591930/photo/view-from-trekking-through-lush-verdant-forests-lead-to-nang-lae-waterfall-in-chiang-rai.jpg?s=612x612&w=0&k=20&c=418A0IF96PgLcpaPaeSWJhIuq0YvDcnWz65lJql76M8=",
      },
      {
        name: "Asupini Ella",
        description: "Tall waterfall hidden among Kegalle’s hills.",
        latitude: 7.1584,
        longitude: 80.4728,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_ELLxZaPQpHPd1KCrDjvdgGFeMh4H1HwzHaMUh-smw&s=10",
      },
      {
        name: "Dedigama Kota Vehera",
        description: "Ancient stupa and archaeological site associated with King Parakramabahu.",
        latitude: 7.2457,
        longitude: 80.3085,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZzjc9ydgBXidE74lGL7DxL-RNsG3gxibfDOFUpMRQg&s=10",
      },
      {
        name: "Salgala Forest Monastery",
        description: "Peaceful forest monastery surrounded by dense greenery.",
        latitude: 7.1137,
        longitude: 80.3825,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvG7AvyePe3pS5Bkiro20IJVLmDz9WYFofpl65xcIfqg&s=10",
      }
    ],
    hotels: [
      { name: "Hotel Elephant Park", type: "luxury", description: "Upscale hotel near Pinnawala", priceRange: "$120-250" },
      { name: "Pinnawala Guest House", type: "budget", description: "Simple accommodation near elephants", priceRange: "$15-30" }
    ],
    historicalSignificance: "Kegalle was part of the ancient Maya Rata kingdom. The area is known for its prehistoric caves and colonial-era rubber plantations.",
    mustTryFood: ["Rubber Estate Rice and Curry", "Pineapple Dishes", "Fresh Buffalo Milk", "Traditional Sweets"],
    travelRoute: "From Colombo: Take the A1 highway toward Kandy, turn at Ambepussa (1.5 hours). From Kandy: 1 hour west.",
    imageUrl: "https://media.istockphoto.com/id/108272930/photo/elephants-bathing-pinnawela-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=Tn_lRi8Xo_8iLUY7KUC0Btq0YJgSOu6qEQmzCY7W4WQ=",
    coordinates: { latitude: 7.2513, longitude: 80.3464 }
  },
  {
    id: "kurunegala",
    name: "Kurunegala",
    nameSinhala: "කුරුණෑගල",
    nameTamil: "குருணாகல்",
    province: "North Western",
    description: "Ancient capital with the iconic Elephant Rock.",
    topPlaces: [
      {
        name: "Ethagala / Elephant Rock",
        description: "Iconic rock formation rising above Kurunegala city.",
        latitude: 7.4870,
        longitude: 80.3649,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC3pyu-rFF_-rlQT5nKri32J_GzGtYo_e9VxMOqEIxmw&s=10",
      },
      {
        name: "Ridi Viharaya",
        description: "Ancient cave temple famous for murals, carvings, and silver legends.",
        latitude: 7.5599,
        longitude: 80.4787,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4AOZ7WMNf667BacQS7qyNO94Pdn9Eyksoa8S-IaeEA&s=10",
      },
      {
        name: "Yapahuwa Rock Fortress",
        description: "Medieval rock citadel with an ornate stone staircase.",
        latitude: 7.8170,
        longitude: 80.3117,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWth9tUlLEStDx_iz-7NcWPd6GAu_Nilc9inHsHybsQ&s=10",
      },
      {
        name: "Panduwasnuwara",
        description: "Archaeological site containing palace and monastic ruins.",
        latitude: 7.6042,
        longitude: 80.1455,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2nRDrsIODIAWvPmKegWyPh5pKSJFR5Idj3RlOY8IWCg&s=10",
      },
      {
        name: "Arankele Monastery",
        description: "Forest monastery ruins with ancient meditation paths.",
        latitude: 7.6649,
        longitude: 80.4111,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2nRDrsIODIAWvPmKegWyPh5pKSJFR5Idj3RlOY8IWCg&s=10",
      },
      {
        name: "Athugala Buddha Statue",
        description: "Large hilltop Buddha statue overlooking Kurunegala.",
        latitude: 7.4890,
        longitude: 80.3655,
        imageUrl: "data:image/jpeg;base64,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",
      },
      {
        name: "Kurunegala Lake",
        description: "Scenic city reservoir beneath the surrounding rocks.",
        latitude: 7.4861,
        longitude: 80.3564,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs9ZKVQwraSLHtu4ehJQm4rr-HrxHxPApIa7retXffrA&s=10",
      },
      {
        name: "Dolukanda",
        description: "Forested mountain linked to local legends and hiking routes.",
        latitude: 7.6407,
        longitude: 80.4197,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXz-Z0nmifTqZfffpQMJfnqvRZMaLeZYP4mkNfokGMqg&s=10",
      }
    ],
    hotels: [
      { name: "The Lake House", type: "luxury", description: "Boutique hotel overlooking Kurunegala Lake", priceRange: "$100-200" },
      { name: "City Resort", type: "budget", description: "Clean central hotel", priceRange: "$25-50" }
    ],
    historicalSignificance: "Kurunegala served as the capital of Sri Lanka in the 13th-14th centuries after Polonnaruwa fell. The name comes from the giant rock that resembles an elephant.",
    mustTryFood: ["Kurunegala Kevum", "Mung Ata", "Fresh Water Fish", "Traditional Sweets"],
    travelRoute: "From Colombo: Take the A6 highway (1.5 hours). From Kandy: 1.5 hours via Ambepussa. Accessible by train and bus.",
    imageUrl: "https://images.pexels.com/photos/34216510/pexels-photo-34216510.jpeg",
    coordinates: { latitude: 7.4870, longitude: 80.3649 }
  },
  {
    id: "puttalam",
    name: "Puttalam",
    nameSinhala: "පුත්තලම",
    nameTamil: "புத்தளம்",
    province: "North Western",
    description: "Coastal district with lagoons, salt flats, and the unique Wilpattu park.",
    topPlaces: [
      {
        name: "Wilpattu National Park",
        description: "Sri Lanka’s largest national park, known for natural villu lakes and wildlife.",
        latitude: 8.4371,
        longitude: 80.0044,
        imageUrl: "https://media.istockphoto.com/id/2224629361/photo/harmony.jpg?s=612x612&w=0&k=20&c=1dY-9WSCLPT8wDAxpENJT66B1rQ2f9CWoAuIhPhCfn0=",
      },
      {
        name: "Kalpitiya Peninsula",
        description: "Popular destination for kitesurfing, dolphin watching, and lagoons.",
        latitude: 8.2300,
        longitude: 79.7667,
        imageUrl: "https://media.istockphoto.com/id/2240448833/photo/aerial-view-of-rectangular-aquaculture-ponds-in-a-coastal-wetland-zone.jpg?s=612x612&w=0&k=20&c=gXetjEOceoAjfDScWMCZWUXrXOB8kKqZEe7bnGMjL3Y=",
      },
      {
        name: "St. Anne's Shrine Talawila",
        description: "Major Catholic pilgrimage shrine near the coast.",
        latitude: 8.1190,
        longitude: 79.7005,
        imageUrl: "https://media.istockphoto.com/id/1420123612/photo/the-statue-of-the-virgin-mary-is-at-the-prayer-place-for-maria-sartika-cave-sampangan.jpg?s=612x612&w=0&k=20&c=NQ_kH1MSpCWO_0oVtr8vNuxnaSrBAr3ceH8WVITIH4A=",
      },
      {
        name: "Bar Reef Marine Sanctuary",
        description: "Large coral reef system off the Kalpitiya coast.",
        latitude: 8.3667,
        longitude: 79.7333,
        imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvGT1x2IPHXwekYc-VptLmR7t1glE-Zj9JqG2VcHUew&s=10",
      },
      {
        name: "Kalpitiya Dutch Fort",
        description: "Historic Dutch fort near the lagoon.",
        latitude: 8.2302,
        longitude: 79.7664,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaL2lfS2fBWMOSuphQYrfk5IqhnBSbkrEauKDNfmcoqg&s=10",
      },
      {
        name: "Munneswaram Temple",
        description: "Ancient Hindu temple complex near Chilaw.",
        latitude: 7.5762,
        longitude: 79.8180,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEGdbvoWCAYlSYG5SrnqDlt_BRkBkXctYvGiAas3HTg&s=10",
      },
      {
        name: "Anawilundawa Bird Sanctuary",
        description: "Ramsar wetland known for migratory birds and reservoirs.",
        latitude: 7.7054,
        longitude: 79.8315,
        imageUrl: "https://media.istockphoto.com/id/2208870925/photo/cormorant-on-shore-of-gal-oya-lake-and-taking-flight.jpg?s=612x612&w=0&k=20&c=WhLY9sxrFz5FNC9CmN4PciZGrV1SZ9ombuMn4LO5zYs=",
      },
      {
        name: "Puttalam Lagoon",
        description: "Large lagoon landscape with fishing, salt pans, and birdlife.",
        latitude: 8.0362,
        longitude: 79.8285,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_BmP1S2I74y2AFVaePs5nY0m0Q2IocWJCScgDv1g3Fw&s=10",
      }
    ],
    hotels: [
      { name: "Bar Reef Resort", type: "luxury", description: "Eco-luxury on Kalpitiya peninsula", priceRange: "$200-400" },
      { name: "Dolphin Beach Resort", type: "budget", description: "Kitesurfing camp and accommodation", priceRange: "$30-60" }
    ],
    historicalSignificance: "Puttalam was an important port during the colonial era. The area has a unique mix of Sinhalese, Tamil, and Muslim communities.",
    mustTryFood: ["Lagoon Crab Curry", "Salt Fish", "Puttalam Shrimp", "Palmyrah Products"],
    travelRoute: "From Colombo: Take the A3 highway north (3 hours). From Anuradhapura: 1.5 hours west. Kalpitiya is accessible via a causeway.",
    imageUrl: "https://t4.ftcdn.net/jpg/01/31/66/43/240_F_131664389_eoPUU3KQ4LNV1jHef2A8v9PMHNpt8a4c.jpg",
    coordinates: { latitude: 8.0392, longitude: 79.8283 }
  },
  {
    id: "mannar",
    name: "Mannar",
    nameSinhala: "මන්නාරම",
    nameTamil: "மன்னார்",
    province: "Northern",
    description: "Historic island district with unique geography and ancient baobab trees.",
    topPlaces: [
      {
        name: "Adam's Bridge / Rama Setu",
        description: "Chain of shallow limestone shoals extending toward India.",
        latitude: 9.0897,
        longitude: 79.5033,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKk12szAed5i6tDVtM4p3d94XwM_FlgnctGg30mtMpiA&s=10",
      },
      {
        name: "Mannar Baobab Tree",
        description: "Ancient baobab associated with Arab trading history.",
        latitude: 8.9814,
        longitude: 79.9142,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2CnAXsXHgOjZTMhI-INm1Bdbv3uBURXqyAaCK8fKM0Q&s=10",
      },
      {
        name: "Mannar Fort",
        description: "Historic Portuguese and Dutch fort near the causeway.",
        latitude: 8.9772,
        longitude: 79.9044,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyqvPgwi-nmw-YrsJsOlXqARCue9m5pHWjg5n2Bjfzw&s=10",
      },
      {
        name: "Thiruketheeswaram Temple",
        description: "Major ancient Hindu temple near Mannar.",
        latitude: 8.9600,
        longitude: 79.9574,
        imageUrl:"https://media.istockphoto.com/id/991892896/photo/nainativu-north-jetty-on-nainativu-island-in-jaffna.jpg?s=612x612&w=0&k=20&c=CS4la_BbOFqQuAUY7j3jBAfGf2Wj9x9NXAAwHhkcgKQ=",
      },
      {
        name: "Talaimannar Lighthouse",
        description: "Historic lighthouse at the western end of Mannar Island.",
        latitude: 9.1015,
        longitude: 79.7248,
        imageUrl: "https://media.istockphoto.com/id/2277462450/video/tall-lighthouse-standing-in-coastal-field-at-dusk.jpg?s=640x640&k=20&c=qRCCBX8RXXNg0jfP6AkhwTdTYIDgFe79sVwyyqwuqJw=",
      },
      {
        name: "Madhu Church",
        description: "Important Catholic pilgrimage site set in a forested area.",
        latitude: 8.8550,
        longitude: 80.2025,
        imageUrl: "https://media.istockphoto.com/id/1325842861/photo/christ-church-shimla.jpg?s=612x612&w=0&k=20&c=Y1dlPU2uuFhXiiuox7uPpW5wjNvwkWcMnb9H4TsrB5E=",
      },
      {
        name: "Vankalai Bird Sanctuary",
        description: "Coastal wetland and Ramsar site rich in migratory birds.",
        latitude: 8.8938,
        longitude: 79.9325,
        imageUrl: "https://media.istockphoto.com/id/498239261/photo/wakodahatchee-rookery.jpg?s=612x612&w=0&k=20&c=1VqBQaBVCqk7T3XJsxzIBeXJbPbT_ZvTi9V-X2pHr7o=",
      },
      {
        name: "Doric at Arippu",
        description: "Ruins of a colonial-era mansion overlooking the coast.",
        latitude: 8.7914,
        longitude: 79.9308,
        imageUrl: "https://media.istockphoto.com/id/2252480056/photo/echoes-of-forgotten-stone.jpg?s=612x612&w=0&k=20&c=Nsa_wW0KO5J3qV7MCNIOYBaz33qepKQ8I1Rnwn6VNak=",
      }
    ],
    hotels: [
      { name: "Mannar Guest House", type: "budget", description: "Simple accommodation in town", priceRange: "$15-30" }
    ],
    historicalSignificance: "Mannar was a key trading post for pearls and horses. The baobab trees were planted by Arab traders. Adam's Bridge is linked to the Ramayana epic.",
    mustTryFood: ["Mannar Crab", "Palmyrah Dishes", "Dried Fish", "Unique Local Curries"],
    travelRoute: "From Colombo: Take the A3 and A14 highways (6 hours). From Anuradhapura: 2 hours via Medawachchiya. The causeway connects Mannar Island to the mainland.",
    imageUrl: "https://t3.ftcdn.net/jpg/15/37/52/00/240_F_1537520085_pfUp7rS3k6RDj3fI8DKC4rJUiUuXoTjw.jpg",
    coordinates: { latitude: 8.9810, longitude: 79.9044 }
  },
  {
    id: "vavuniya",
    name: "Vavuniya",
    nameSinhala: "වවුනියාව",
    nameTamil: "வவுனியா",
    province: "Northern",
    description: "Transportation hub and gateway to the Northern Province.",
    topPlaces: [
      {
        name: "Vavuniya Tank",
        description: "Urban irrigation reservoir and relaxing local viewpoint.",
        latitude: 8.7541,
        longitude: 80.4950,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOn0kcsf1jHW2x9GpOG6ExSMRtDo9YDmjSebjPRqjcw&s=10",
      },
      {
        name: "Kandasamy Kovil",
        description: "Prominent Hindu temple in Vavuniya town.",
        latitude: 8.7512,
        longitude: 80.4981,
        imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmmgd_POJPKQk0V7EjBrs66SaDkIyYar4k48yW8rFSw&s=10",
      },
      {
        name: "Madukanda Sri Dalada Viharaya",
        description: "Historic Buddhist temple associated with ancient routes to the north.",
        latitude: 8.7164,
        longitude: 80.5548,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhcXC9hrCCVdaWjIoaqX7PBXrFXZk0OlDgm4CUeUYwDg&s=10",
      },
      {
        name: "Vavuniya Archaeological Museum",
        description: "Small museum displaying regional archaeological finds.",
        latitude: 8.7538,
        longitude: 80.4977,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPBhGBX-sAIdmAsWUzoEJT75ZebQ7crdXRzfym40RdiQ&s=10",
      },
      {
        name: "Vavuniya Public Park",
        description: "Green public space in the heart of town.",
        latitude: 8.7547,
        longitude: 80.4970,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMKsVrlwZNCKNJT4huGtigCMNJqc3Uw9xUaz0UJ1LtkQ&s=10",
      },
      {
        name: "Vavuniya Clock Tower",
        description: "Central town landmark and convenient orientation point.",
        latitude: 8.7519,
        longitude: 80.4976,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSexa4jnFOo_XJHBGvbJe7iXnQm3IAAc4NdJOeQ1JF0hw&s=10",
      },
      {
        name: "Pavatkulam Reservoir",
        description: "Large irrigation tank surrounded by quiet rural scenery.",
        latitude: 8.6477,
        longitude: 80.5908,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZxGGm0Bd_O8q3a-dkxP7NGyFQ4ahchTm7WszpT9JmTg&s=10",
      },
      {
        name: "Kurumankadu",
        description: "Local area known for temples, community life, and northern-town atmosphere.",
        latitude: 8.7700,
        longitude: 80.4920,
        imageUrl: "https://media.istockphoto.com/id/2214420121/photo/the-large-fruit-of-the-cannonball-tree-in-sri-lanka.jpg?s=2048x2048&w=is&k=20&c=S3JE-R0mjuKrFL7WPTKFoQ4xToRIybaNVevELKfyL2s=",
      }
    ],
    hotels: [
      { name: "Cargills Square Hotel", type: "budget", description: "Modern hotel in town center", priceRange: "$25-50" }
    ],
    historicalSignificance: "Vavuniya has been a crossroads for northern Sri Lanka for centuries. It serves as the main entry point to the Jaffna Peninsula.",
    mustTryFood: ["Northern Style Crab", "Jaffna Curry", "Local Rice Dishes", "Fresh Fruits"],
    travelRoute: "From Colombo: Take the A9 highway (5 hours). From Anuradhapura: 1.5 hours. Train service connects Vavuniya to Colombo and Jaffna.",
    imageUrl: "https://www.allceylon.lk/images/location/2017/10/Vavuniya-Railway-station-1509073231.jpeg",
    coordinates: { latitude: 8.7542, longitude: 80.4982 }
  },
  {
    id: "mullaitivu",
    name: "Mullaitivu",
    nameSinhala: "මුලතිව්",
    nameTamil: "முல்லைத்தீவு",
    province: "Northern",
    description: "Coastal district with pristine beaches and fishing communities.",
    topPlaces: [
      {
        name: "Mullaitivu Beach",
        description: "Long, quiet beach on Sri Lanka’s northeastern coast.",
        latitude: 9.2707,
        longitude: 81.3175,
        imageUrl:"https://media.istockphoto.com/id/1768222853/photo/tropical-tranquility-on-a-sri-lankan-shoreline.jpg?s=612x612&w=0&k=20&c=ZW5gQF-uq_JdzbQg2Rbu_RrUiJVNQxx-RyVgbA7OSdg=",
      },
      {
        name: "Nandikadal Lagoon",
        description: "Large lagoon ecosystem with open water and birdlife.",
        latitude: 9.2675,
        longitude: 80.8144,
        imageUrl:"https://media.istockphoto.com/id/1499407634/photo/backwater-view-near-the-pazhayangadi-bridge-in-kannur-district-in-kerala-india.jpg?s=612x612&w=0&k=20&c=2xp3cVNg10-V65x-51Hlg1B5knYhEXoKSpwGEiVzxPQ=",
      },
      {
        name: "Kokkilai Lagoon",
        description: "Coastal lagoon and wetland habitat near the Trincomalee border.",
        latitude: 9.0200,
        longitude: 80.9300,
        imageUrl: "https://media.istockphoto.com/id/473989566/photo/kokkilai-lagoon-sri-lanka.jpg?s=612x612&w=0&k=20&c=udT0CKY3AR9UijtXxoeJXOjSWdJddLSH5X0HT6WB-yY=",
      },
      {
        name: "Nayaru Beach",
        description: "Remote sandy beach beside the Nayaru lagoon area.",
        latitude: 9.1227,
        longitude: 80.9916,
        imageUrl: "https://media.istockphoto.com/id/842469738/photo/coast-of-morondava-madagascar.jpg?s=612x612&w=0&k=20&c=H_p6QsA1p2zYn4syyZOKwQ-NN1bRVn2kw04taKXV2uM=",
      },
      {
        name: "Nayaru Lagoon",
        description: "Scenic coastal lagoon used by fishing communities and birds.",
        latitude: 9.1300,
        longitude: 80.9700,
        imageUrl:"https://media.istockphoto.com/id/1364014016/photo/aerial-view-of-tropical-island-in-ocean.jpg?s=612x612&w=0&k=20&c=FJ-ujpgT2M-rJqN_W4BtEroBVabFkquOgRs6kYlXt9U=",
      },
      {
        name: "Alampil Beach",
        description: "Quiet eastern beach with broad stretches of sand.",
        latitude: 9.1850,
        longitude: 81.0500,
        imageUrl: "https://media.istockphoto.com/id/1366202328/photo/the-breakwater-prevents-ocean-wave-entering-the-coast.jpg?s=612x612&w=0&k=20&c=bfCcy0U8O8q3NTVrLF-lNLSamHoIN1lVhT-Zar9DM7o=",
      },
      {
        name: "Kokuthoduvai Coast",
        description: "Undeveloped coastal scenery and lagoons in southern Mullaitivu.",
        latitude: 9.0900,
        longitude: 80.8800,
        imageUrl: "https://media.istockphoto.com/id/1073021954/photo/landscape-the-coast-of-a-wave-of-the-ocean-break-against-stones.jpg?s=612x612&w=0&k=20&c=79ZPj37pbMwy5spp_7EsrQqfCbM32oWGYIOidTj_rEw=",
      },
      {
        name: "Mullaitivu Lagoon",
        description: "Calm lagoon landscape close to Mullaitivu town.",
        latitude: 9.2671,
        longitude: 80.8142,
        imageUrl: "https://media.istockphoto.com/id/1264563655/photo/natural-beauties.jpg?s=612x612&w=0&k=20&c=b1BxQwEu0mwY8n6Wzi0FrReUnO8UBfS5RIfUV1JJmMY=",
      }
    ],
    hotels: [
      { name: "Mullaitivu Rest House", type: "budget", description: "Basic government accommodation", priceRange: "$10-25" }
    ],
    historicalSignificance: "Mullaitivu has a long history as a fishing settlement. The area has seen recent development after the end of the civil conflict.",
    mustTryFood: ["Fresh Seafood", "Northern Crab Curry", "Local Fish Varieties", "Palmyrah Sweets"],
    travelRoute: "From Vavuniya: 2.5 hours via Oddusuddan. From Trincomalee: 4 hours via the coast road. Limited public transport available.",
    imageUrl: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600/https://exploresrilanka.lk/wp-content/uploads/2012/12/15.webp",
    coordinates: { latitude: 9.2671, longitude: 80.8142 }
  },
  {
    id: "kilinochchi",
    name: "Kilinochchi",
    nameSinhala: "කිලිනොච්චි",
    nameTamil: "கிளிநொச்சி",
    province: "Northern",
    description: "Agricultural district transitioning from conflict recovery.",
    topPlaces: [
      {
        name: "Iranamadu Tank",
        description: "Major reservoir and irrigation landmark south of Kilinochchi.",
        latitude: 9.3333,
        longitude: 80.4167,
        imageUrl: "https://media.istockphoto.com/id/1887379353/photo/iranamadu-tank-in-golden-evening.jpg?s=612x612&w=0&k=20&c=vJm7CIGukejJrM2E5ke_sZTtnTywxXurJz8wIKEMurU=",
      },
      {
        name: "Kilinochchi Water Tower",
        description: "Recognizable local landmark associated with the town’s recent history.",
        latitude: 9.3878,
        longitude: 80.4042,
        imageUrl: "https://media.istockphoto.com/id/2237433486/photo/the-water-tower-in-nassau-the-bahamas.jpg?s=612x612&w=0&k=20&c=NdpcFgrWWxy2U1qmbDKPPa4VB5QckRKcV4DwADtU6js=",
      },
      {
        name: "Murukandy Pillayar Temple",
        description: "Popular roadside Hindu shrine on the A9 highway.",
        latitude: 9.2567,
        longitude: 80.4123,
        imageUrl: "https://media.istockphoto.com/id/1479933892/photo/rama-temple-at-ramagiri-ramanagar.jpg?s=612x612&w=0&k=20&c=sJXItstRBe7g6XP02fjMrLwQu4uayEt-tm-feLZQ9uI=",
      },
      {
        name: "Elephant Pass",
        description: "Strategic narrow land connection with lagoon views.",
        latitude: 9.5471,
        longitude: 80.4066,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRodiA_seCfQlB36pgq3szy_jCyIWsfQ-U_QCb7N6frTg&s=10",
      },
      {
        name: "Chundikulam National Park",
        description: "Wetland national park with lagoons and migratory birds.",
        latitude: 9.5167,
        longitude: 80.5333,
        imageUrl:"https://media.istockphoto.com/id/1006611602/photo/river-tropical-rainforest-water-summer-meadow.jpg?s=612x612&w=0&k=20&c=dsvzLANizREPyQNrbo595-DjQ5V823ZGkpn2nodYhqc=",
      },
      {
        name: "Akkarayan Kulam",
        description: "Large rural reservoir west of Kilinochchi.",
        latitude: 9.3316,
        longitude: 80.2675,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuIcwQAQXMsOHiSX4BrCaA_jr7v6qE1iCLd6PFU2OAMg&s=10",
      },
      {
        name: "Kilinochchi Railway Station",
        description: "Modern railway station on the northern rail line.",
        latitude: 9.3972,
        longitude: 80.4030,
        imageUrl: "https://media.istockphoto.com/id/991352186/photo/hikkaduwa-sri-lanka-railway-platform-at-the-station-hikkaduwa-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=GKzRH8EFzFv4MZJ_a_ld7W07StaXasYC3L4KBWcvf9Q=",
      },
      {
        name: "Kanagambikai Kulam",
        description: "Reservoir area offering a glimpse of local irrigation landscapes.",
        latitude: 9.4070,
        longitude: 80.4070,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2BsYals_xHgCUEDy0y0dgK7kWvJQacAjm8rGELId6w&s=10",
      }
    ],
    hotels: [
      { name: "Kilinochchi Inn", type: "budget", description: "Basic accommodation for travelers", priceRange: "$10-25" }
    ],
    historicalSignificance: "Kilinochchi was historically an agricultural center based on massive ancient tank systems. The area is rebuilding after decades of conflict.",
    mustTryFood: ["Traditional Northern Rice", "Red Rice Dishes", "Local Vegetables", "Palmyrah Products"],
    travelRoute: "From Vavuniya: 1.5 hours north on the A9. From Jaffna: 1.5 hours south on the A9. Located midway on the main highway.",
    imageUrl: "https://propertyguide.lk/_next/image?url=https%3A%2F%2Fpropertyguide-store.s3.ap-southeast-1.amazonaws.com%2Fikman%2Fmedium_Kilinochchi_War_Memorial_11145cb76d.jpg&w=640&q=75",
    coordinates: { latitude: 9.3803, longitude: 80.3770 }
  },
  {
    id: "badulla",
    name: "Badulla",
    nameSinhala: "බදුල්ල",
    nameTamil: "பதுளை",
    province: "Uva",
    description: "Uva province capital with waterfalls, tea estates, and colonial history.",
    topPlaces: [
      {
        name: "Dunhinda Falls",
        description: "Spectacular waterfall reached by a forest trail near Badulla.",
        latitude: 7.0163,
        longitude: 81.0633,
        imageUrl: "https://media.istockphoto.com/id/2254310209/photo/dunhinda-falls-badulla-sri-lanka.jpg?s=612x612&w=0&k=20&c=Uhr7hT3FSZCbH16qtCItOWsqbFqUSIkxrCAOPH_NE4M=",
      },
      {
        name: "Muthiyangana Raja Maha Vihara",
        description: "Ancient Buddhist temple in Badulla city.",
        latitude: 6.9856,
        longitude: 81.0581,
        imageUrl: "https://media.istockphoto.com/id/1367960077/photo/stupa-of-muthiyangana-raja-maha-vihara-sri-lanka.jpg?s=612x612&w=0&k=20&c=iL5Dz7YO0YuHmEM6HYw3-BTIyVav9QI17BtVNBE2m44=",
      },
      {
        name: "Nine Arches Bridge",
        description: "Famous colonial-era railway viaduct surrounded by tea country.",
        latitude: 6.8768,
        longitude: 81.0610,
        imageUrl: "https://media.istockphoto.com/id/1420759998/photo/nine-arches-bridge.jpg?s=612x612&w=0&k=20&c=NMxRRq1-i0VQJpGvUfy_kA8s5qIQzCNB0SAN1p9RneY=",
      },
      {
        name: "Little Adam's Peak",
        description: "Short popular hike with panoramic views around Ella.",
        latitude: 6.8667,
        longitude: 81.0466,
        imageUrl: "https://media.istockphoto.com/id/2289760124/photo/ella-rock-mountain-in-sri-lanka-dramatic-mountain-landscape-with-lush-green-tea-plantations.jpg?s=612x612&w=0&k=20&c=BBMzTl3nGxTjkc9rVNEAk1grgPsY_Ez6biPdDStOcxo=",
      },
      {
        name: "Ravana Falls",
        description: "Roadside waterfall cascading through a rocky gorge below Ella.",
        latitude: 6.8412,
        longitude: 81.0547,
        imageUrl: "https://media.istockphoto.com/id/1406162397/photo/ravana-falls-ravana-ella-wildlife-sanctuary-sri-lanka.jpg?s=612x612&w=0&k=20&c=1yPWk7904SxpBwZWy97o-ssmp4FVRv2ClVgtDeywcys=",
      },
      {
        name: "Lipton's Seat",
        description: "Historic tea-country viewpoint above Haputale.",
        latitude: 6.7764,
        longitude: 80.9619,
        imageUrl: "https://media.istockphoto.com/id/1131252306/photo/aerial-famous-green-tea-plantation-landscape-view-from-liptons-seat-haputale-sri-lanka.jpg?s=612x612&w=0&k=20&c=-ulUdxlAzHJxiO5lIyp1gpTyoR4vxdguM1IO3oTqvyg=",
      },
      {
        name: "Demodara Railway Loop",
        description: "Ingenious railway loop where the track circles beneath the station.",
        latitude: 6.9022,
        longitude: 81.0576,
        imageUrl: "https://media.istockphoto.com/id/1205729584/photo/demodara-loop-ella-sri-lanka.jpg?s=612x612&w=0&k=20&c=O_mAZqfFG5Z6iu-3-L7mT4ghU5y6y19q8hJMnd19K8c=",
      },
      {
        name: "Ella Rock",
        description: "Challenging hike to a mountain viewpoint above Ella.",
        latitude: 6.8563,
        longitude: 81.0532,
        imageUrl: "https://media.istockphoto.com/id/930309134/photo/tourist-woman-enjoy-with-beautiful-view-on-mountains-in-ella-sri-lanka.jpg?s=612x612&w=0&k=20&c=f5AhSDzgsHFSTb-vL-78AYKjkOqVzxu9RGocl6YFCag=",
      }
    ],
    hotels: [
      { name: "Heritance Kandalama", type: "luxury", description: "Geoffrey Bawa masterpiece nearby", priceRange: "$300-600" },
      { name: "Badulla Rest House", type: "budget", description: "Government rest house in town", priceRange: "$15-30" }
    ],
    historicalSignificance: "Badulla was a regional capital under the Kandyan kingdom. The area is famous for the 1818 Uva Rebellion against British rule.",
    mustTryFood: ["Uva Highland Tea", "Upcountry Vegetable Curry", "Fresh Dairy Products", "Pittu"],
    travelRoute: "From Colombo: Take the A4 via Ratnapura and Balangoda (6 hours). From Kandy: 3 hours via Mahiyangana. Scenic train also available.",
    imageUrl: "https://images.unsplash.com/photo-1550679193-d8ec2f2c3a25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhZHVsbGF8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 6.9934, longitude: 81.0550 }
  },
  {
    id: "monaragala",
    name: "Monaragala",
    nameSinhala: "මොණරාගල",
    nameTamil: "மொணராகலை",
    province: "Uva",
    description: "Rural district with ancient temples and Udawalawe National Park.",
    topPlaces: [
      {
        name: "Udawalawe National Park",
        description: "Major elephant habitat spanning the dry-zone landscape.",
        latitude: 6.4744,
        longitude: 80.8906,
        imageUrl:"https://media.istockphoto.com/id/1344056465/photo/elephants-in-udawalawe-national-park-sri-lanka.jpg?s=612x612&w=0&k=20&c=xw80GNCEdAJgjIOvVcf6SN4YRuByACxbBWm92_-K__Y=",
      },
      {
        name: "Buduruwagala",
        description: "Seven monumental Buddha figures carved into a rock face.",
        latitude: 6.6492,
        longitude: 81.0811,
        imageUrl: "https://media.istockphoto.com/id/2256744012/photo/ancient-buddha-statue-carved-in-rock-at-buduruwagala-sri-lanka.jpg?s=612x612&w=0&k=20&c=redL-jiwbM9yw4vPB0lmNEQ9bOA0NiboQGMdIjO7jrk=",
      },
      {
        name: "Maligawila Buddha Statue",
        description: "Ancient freestanding stone Buddha statue near Okkampitiya.",
        latitude: 6.7412,
        longitude: 81.3654,
        imageUrl: "https://media.istockphoto.com/id/1291299146/photo/paraiso-and-nuwara-eliya.jpg?s=612x612&w=0&k=20&c=Af7nq0J_7DWGh_93mwS4leezOqjaEFL9TiO56_45SgI=",
      },
      {
        name: "Dambegoda Bodhisattva Statue",
        description: "Restored ancient Bodhisattva statue close to Maligawila.",
        latitude: 6.7417,
        longitude: 81.3664,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr6gtKC5xsgzi6sdZW1Wd_Qq2ewm8hQfM-D2BpdRasJA&s=10",
      },
      {
        name: "Kataragama Sacred City",
        description: "Multi-faith pilgrimage town centered on the Kataragama shrine.",
        latitude: 6.4135,
        longitude: 81.3348,
        imageUrl: "https://media.istockphoto.com/id/1053028312/photo/ruhunu-maha-kataragama-devalaya-temple-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=EHFP0zBsQHODmn47PpSANPBatgAOH09iAh19UQ3pg2c=",
      },
      {
        name: "Kiri Vehera",
        description: "Ancient white stupa within the Kataragama sacred area.",
        latitude: 6.4189,
        longitude: 81.3324,
        imageUrl: "https://media.istockphoto.com/id/1254563082/photo/kirivehera-katharagama.jpg?s=612x612&w=0&k=20&c=4D0J6U5pB8ZQh9TMLTnAfssgSNhAdrkR7qwJNJSMj9U=",
      },
      {
        name: "Yudaganawa Temple",
        description: "Historic stupa and temple complex near Buttala.",
        latitude: 6.7008,
        longitude: 81.0484,
        imageUrl: "https://media.istockphoto.com/id/899435304/photo/yudaganava-rajamaha-viharaya-temple.jpg?s=612x612&w=0&k=20&c=gkcLmNja89bGIdISbR3ZYSyLmyEEzTnVAHGA3KS-aqE=",
      },
      {
        name: "Maragala Mountain",
        description: "Mountain landscape near Monaragala town with forest and views.",
        latitude: 6.8660,
        longitude: 81.3470,
        imageUrl: "https://media.istockphoto.com/id/1404144080/photo/feather-two-hills.jpg?s=612x612&w=0&k=20&c=SadNVHDXVkXw1TMzk-QAw-MuLQR6FdBLIci5BgUaewA=",
      }
    ],
    hotels: [
      { name: "Grand Udawalawe Safari Resort", type: "luxury", description: "Safari lodge with pool", priceRange: "$150-300" },
      { name: "Elephant Trail Hotel", type: "budget", description: "Near Udawalawe entrance", priceRange: "$30-60" }
    ],
    historicalSignificance: "Monaragala has been inhabited since ancient times with many ruins from the Anuradhapura and Polonnaruwa periods. The giant Buddha statues are unique.",
    mustTryFood: ["Village Style Rice and Curry", "Fresh River Fish", "Wild Game (legal varieties)", "Local Fruits"],
    travelRoute: "From Colombo: Take the A4 highway (5 hours). From Ella: 1.5 hours. From Hambantota: 2 hours via Wellawaya.",
    imageUrl: "https://media.istockphoto.com/id/491685374/photo/foogi-morning-on-adams-peak.webp?a=1&b=1&s=612x612&w=0&k=20&c=4brOIser0xrasRHJrNAbgDWd2SSTTB-faD1V-mIdxVQ=",
    coordinates: { latitude: 6.8715, longitude: 81.3487 }
  },
  {
    id: "ampara",
    name: "Ampara",
    nameSinhala: "අම්පාර",
    nameTamil: "அம்பாறை",
    province: "Eastern",
    description: "Eastern district with ancient temples and unspoiled beaches.",
    topPlaces: [
      {
        name: "Arugam Bay",
        description: "World-famous surf destination with a relaxed east-coast atmosphere.",
        latitude: 6.8404,
        longitude: 81.8368,
        imageUrl: "https://media.istockphoto.com/id/1131547061/photo/aerial-surfers-hikkaduwa-sri-lanka.jpg?s=612x612&w=0&k=20&c=yHODuCIPYW_bshQgxdsqTEtHmnlvh-BjDumsxllHuEc=",
      },
      {
        name: "Kumana National Park",
        description: "Wetland wildlife park renowned for nesting and migratory birds.",
        latitude: 6.5861,
        longitude: 81.6747,
        imageUrl: "https://media.istockphoto.com/id/2233100125/photo/a-flock-of-painted-storks-nesting-in-kumana-national-park.jpg?s=612x612&w=0&k=20&c=MEZVjponEDZ-eZzgspVAArfr7kOCdfAc2obKdi0ug0M=",
      },
      {
        name: "Lahugala Kitulana National Park",
        description: "Dry-zone park known for elephants and reservoirs.",
        latitude: 6.8860,
        longitude: 81.6840,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12pKUt013-9VHCNshwc1jQF6lauQfzCR3SzauLhietA&s=10",
      },
      {
        name: "Muhudu Maha Vihara",
        description: "Ancient Buddhist temple and ruins beside the Pottuvil coast.",
        latitude: 6.8735,
        longitude: 81.8316,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD1uBB_DaWp_cs8is-2FjiJ0lru-AS-a2zWd-RDA-ucg&s=10",
      },
      {
        name: "Magul Maha Vihara",
        description: "Historic forest monastery with ancient stone ruins.",
        latitude: 6.8518,
        longitude: 81.6880,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFhHY_mH-AudjtEoZue7R_58c9EvaUss8Hzof9R-YvIQ&s=10",
      },
      {
        name: "Pottuvil Point",
        description: "Scenic surf point and beach north of Arugam Bay.",
        latitude: 6.8754,
        longitude: 81.8419,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmsIZrcdMjSrfXgaMeM84GberDdNHF2zHTQwIREair4g&s=10",
      },
      {
        name: "Crocodile Rock",
        description: "Coastal viewpoint and surf area south of Arugam Bay.",
        latitude: 6.8190,
        longitude: 81.8410,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIP9XdKC66mao9x5X_GkE1y7zC9BycZ6qYAIDQnhauCw&s=10",
      },
      {
        name: "Deegavapi Stupa",
        description: "Important ancient Buddhist site in the Ampara region.",
        latitude: 7.2822,
        longitude: 81.6760,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1me-wOVY1vO7vArxpsnqneQUtQSPfVmHA5ynpa_Fwfg&s=10",
      }
    ],
    hotels: [
      { name: "Gal Oya Lodge", type: "luxury", description: "Eco-luxury in the national park", priceRange: "$300-500" },
      { name: "Arugam Bay Surf Resort", type: "budget", description: "Popular surf camp", priceRange: "$20-50" }
    ],
    historicalSignificance: "Ampara was the site of the ancient Digamadulla kingdom. The Deegavapi stupa is mentioned in Buddhist chronicles as being visited by Buddha.",
    mustTryFood: ["Fresh Lagoon Crab", "Eastern Style Seafood", "Tropical Fruits", "Local Arrack"],
    travelRoute: "From Colombo: Take the A4 highway via Ratnapura and Monaragala (6 hours). From Batticaloa: 2 hours. Accessible via Wellawaya from the hill country.",
    imageUrl: "https://images.unsplash.com/photo-1552055569-d54ae89a11b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1wYXJhfGVufDB8fDB8fHww",
    coordinates: { latitude: 7.3018, longitude: 81.6747 }
  },
  {
    id: "matale",
    name: "Matale",
    nameSinhala: "මාතලේ",
    nameTamil: "மாத்தளை",
    province: "Central",
    description: "Spice garden district connecting Kandy and the Cultural Triangle.",
    topPlaces: [
      {
        name: "Dambulla Cave Temple",
        description: "UNESCO cave temple complex with extensive Buddhist paintings and statues.",
        latitude: 7.8567,
        longitude: 80.6492,
        imageUrl: "https://media.istockphoto.com/id/2190375920/photo/royal-cave-temple-dambulla-or-golden-temple-is-the-largest-and-best-preserved-cave-temple.jpg?s=612x612&w=0&k=20&c=7t_z-XwjixO0cLs_snWRhQseqOxeK1sfmg5wcNEQPGY=",
      },
      {
        name: "Aluvihare Rock Temple",
        description: "Historic cave temple associated with the writing of Buddhist scriptures.",
        latitude: 7.4976,
        longitude: 80.6211,
        imageUrl: "https://media.istockphoto.com/id/1196388219/photo/the-aluvihare-rock-temple.jpg?s=612x612&w=0&k=20&c=HqavjaZfCayjl_z_7TbW6-AtXhoFhtDVa_8MHyd9ark=",
      },
      {
        name: "Sembuwatta Lake",
        description: "Man-made lake in a tea estate surrounded by pine forest.",
        latitude: 7.4387,
        longitude: 80.6985,
        imageUrl: "https://media.istockphoto.com/id/2213332628/photo/sembuwaththa-lake.jpg?s=612x612&w=0&k=20&c=-ba1CutUwvhvYUzJUBe1mnqUnx-ljDWW7Z56hVj50Bs=",
      },
      {
        name: "Riverston",
        description: "Mountain viewpoint and trekking area in the Knuckles region.",
        latitude: 7.5227,
        longitude: 80.7406,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZr6vkdHZ8XbgPZHQXSpdb2-GRroBJMqSb-Hcv9X1tA&s=10",
      },
      {
        name: "Pitawala Pathana",
        description: "Grassland plateau with Mini World’s End and dramatic mountain scenery.",
        latitude: 7.5436,
        longitude: 80.7529,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07u3EedgelO8uyGYsffv7FFmmP6CUGgM-EFB27LNnnA&s=10",
      },
      {
        name: "Nalanda Gedige",
        description: "Unique ancient stone shrine with mixed architectural influences.",
        latitude: 7.6674,
        longitude: 80.6413,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2sHmDnggixSPWZI7C_s6uJXzNwpDklDF6SaA4bqJAjQ&s=10",
      },
      {
        name: "Knuckles Mountain Range",
        description: "UNESCO-listed mountain wilderness for trekking and biodiversity.",
        latitude: 7.4550,
        longitude: 80.8000,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6JfQFxbvOaPN1iwSlnaGifijOkBaq6wBiZ2ISx1ICFQ&s=10",
      },
      {
        name: "Wasgamuwa National Park",
        description: "Wildlife park known for elephants, forests, and riverine habitats.",
        latitude: 7.7167,
        longitude: 80.9333,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLkH8D7Cgu2wnVHJQ0sIWekqv2CzoWcisPeUGaVJ2GXQ&s=10",
      }
    ],
    hotels: [
      { name: "Taj Kandy", type: "luxury", description: "Nearby luxury option in Kandy", priceRange: "$200-400" },
      { name: "Matale Green View", type: "budget", description: "Guesthouse near spice gardens", priceRange: "$15-30" }
    ],
    historicalSignificance: "Matale was the site of the 1848 Matale Rebellion against British rule. The Aluvihara temple is one of the most important sites in Buddhist history.",
    mustTryFood: ["Fresh Spices and Curry", "Matale Kokis", "Traditional Sweets", "Spice-infused Tea"],
    travelRoute: "From Kandy: 30 minutes north on the A9. From Colombo: 3 hours via Kurunegala. From Sigiriya: 1.5 hours south.",
    imageUrl: "https://images.unsplash.com/photo-1749528090068-43d71aac0589?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hdGFsZXxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { latitude: 7.4675, longitude: 80.6234 }
  }
];

export const provinces = [
  "Western", "Southern", "Central", "North Central", "Eastern", 
  "Northern", "North Western", "Uva", "Sabaragamuwa"
];

export const getDistrictById = (id: string): District | undefined => {
  return districts.find(d => d.id === id);
};

export const getDistrictsByProvince = (province: string): District[] => {
  return districts.filter(d => d.province === province);
};

export const searchDistricts = (query: string): District[] => {
  const lowerQuery = query.toLowerCase();
  return districts.filter(d => 
    d.name.toLowerCase().includes(lowerQuery) ||
    d.nameSinhala.includes(query) ||
    d.nameTamil.includes(query) ||
    d.description.toLowerCase().includes(lowerQuery)
  );
};
