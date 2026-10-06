/**
 * Jake's three journal posts, carried over from his current site word for
 * word (jakesdetailing.ca/post/...). Slugs match his existing URLs so nothing
 * breaks at the domain cutover. Only the structure is new: headings, lists
 * and paragraphs as typed blocks.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  author: string;
  date: string; // ISO
  dateLabel: string;
  readTime: string;
  excerpt: string;
  photo: string; // car slug, 4:3 cut
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "why-winter-vehicle-detailing-is-essential-in-nova-scotia",
    title: "Why Winter Vehicle Detailing Is Essential in Nova Scotia",
    author: "Jake Jeffery",
    date: "2026-05-13",
    dateLabel: "May 13, 2026",
    readTime: "2 min read",
    excerpt:
      "Snow, road salt, slush, and freezing temperatures all contribute to wear and damage that can affect both the appearance and condition of your car over time.",
    photo: "bmw-e46",
    body: [
      {
        type: "p",
        text: "Winter in Nova Scotia can be extremely hard on your vehicle. Snow, road salt, slush, and freezing temperatures all contribute to wear and damage that can affect both the appearance and condition of your car over time. While many drivers focus only on keeping their vehicle running properly during winter, protecting the exterior and interior is just as important.",
      },
      {
        type: "p",
        text: "Professional winter detailing helps keep your vehicle clean, protected, and maintained throughout the harshest months of the year.",
      },
      { type: "h2", text: "How Winter Conditions Damage Your Vehicle" },
      {
        type: "p",
        text: "During winter, your vehicle is constantly exposed to harmful contaminants. Road salt and sand can quickly build up on your paint, wheels, and undercarriage, leading to corrosion and long-term damage if not properly removed.",
      },
      { type: "p", text: "Common winter-related issues include:" },
      {
        type: "ul",
        items: [
          "Paint damage from salt and road debris",
          "Corrosion and rust buildup",
          "Dirty carpets and stained interiors",
          "Reduced visibility from dirty windows and mirrors",
          "Dull paint and loss of shine",
        ],
      },
      {
        type: "p",
        text: "Without regular cleaning and protection, winter conditions can significantly reduce your vehicle’s appearance and value.",
      },
      { type: "h2", text: "The Importance of Exterior Protection" },
      {
        type: "p",
        text: "Professional winter detailing focuses on safely removing harmful contaminants while protecting your vehicle’s finish from the elements.",
      },
      { type: "h3", text: "Safe Washing Methods" },
      {
        type: "p",
        text: "Professional detailers use techniques designed to minimize scratches and safely clean winter buildup, including:",
      },
      {
        type: "ul",
        items: [
          "Snow foam pre-wash treatments",
          "Two-bucket hand wash methods",
          "Wheel and tire deep cleaning",
          "Paint decontamination",
          "Warm air and microfiber drying methods",
        ],
      },
      { type: "p", text: "These methods help remove salt, grime, and road film without damaging the paint." },
      { type: "h3", text: "Paint Protection" },
      {
        type: "p",
        text: "Protective treatments help shield your vehicle from moisture, salt, and harsh weather conditions. A properly protected vehicle is easier to clean and better prepared to handle winter driving conditions.",
      },
      { type: "h2", text: "Why Interior Detailing Matters During Winter" },
      {
        type: "p",
        text: "Winter weather can also take a toll on your vehicle’s interior. Snow, mud, water, and salt are constantly tracked into carpets and floor mats, creating stains, odors, and moisture buildup.",
      },
      { type: "p", text: "Professional interior detailing helps:" },
      {
        type: "ul",
        items: [
          "Remove salt stains and dirt buildup",
          "Deep clean carpets and upholstery",
          "Eliminate moisture and odors",
          "Protect leather and interior surfaces",
          "Restore a clean and comfortable interior",
        ],
      },
      {
        type: "p",
        text: "Keeping the interior clean during winter helps preserve your vehicle and improve overall comfort while driving.",
      },
      { type: "h2", text: "Protecting Your Investment" },
      {
        type: "p",
        text: "Your vehicle is one of your largest investments, and regular detailing helps maintain its condition and value. Winter detailing not only improves appearance but also helps prevent long-term damage caused by salt and moisture exposure.",
      },
      { type: "p", text: "Vehicles that receive regular professional care often experience:" },
      {
        type: "ul",
        items: [
          "Better paint condition",
          "Reduced risk of corrosion",
          "Cleaner interiors",
          "Improved resale value",
          "Longer-lasting exterior protection",
        ],
      },
      { type: "h2", text: "How Often Should You Detail Your Vehicle in Winter?" },
      {
        type: "p",
        text: "During winter months, regular maintenance is important. Many vehicle owners benefit from professional detailing every few weeks to prevent salt and grime buildup from causing permanent damage.",
      },
      {
        type: "p",
        text: "Routine washes and protective treatments throughout the season can make a major difference in maintaining your vehicle’s condition.",
      },
      { type: "h2", text: "Final Thoughts" },
      {
        type: "p",
        text: "Winter conditions in Nova Scotia can be tough on any vehicle, but regular professional detailing helps protect against damage while keeping your vehicle looking its best. From removing harmful road salt to restoring interior cleanliness, winter detailing is an important part of proper vehicle maintenance.",
      },
      {
        type: "p",
        text: "Investing in professional detailing during the winter season helps protect your vehicle, maintain its value, and keep it in premium condition all year long.",
      },
    ],
  },
  {
    slug: "the-difference-between-a-basic-car-wash-and-professional-detailing",
    title: "The Difference Between a Basic Car Wash and Professional Detailing",
    author: "Jake Jeffery",
    date: "2026-05-13",
    dateLabel: "May 13, 2026",
    readTime: "2 min read",
    excerpt:
      "While automatic washes and quick rinses remove surface dirt, detailing focuses on thoroughly cleaning, restoring, and protecting every part of your vehicle.",
    photo: "audi-rs3",
    body: [
      {
        type: "p",
        text: "Many vehicle owners believe a regular car wash is enough to maintain their vehicle, but professional detailing offers a completely different level of care. While automatic washes and quick rinses remove surface dirt, detailing focuses on thoroughly cleaning, restoring, and protecting every part of your vehicle.",
      },
      {
        type: "p",
        text: "Understanding the difference can help you better protect your vehicle’s appearance and long-term value.",
      },
      { type: "h2", text: "What a Basic Car Wash Does" },
      {
        type: "p",
        text: "A standard car wash is designed to quickly remove visible dirt and debris from the exterior of your vehicle. Most automatic washes focus on speed and convenience rather than detailed care.",
      },
      { type: "p", text: "Basic washes typically include:" },
      {
        type: "ul",
        items: [
          "Exterior rinse and soap application",
          "Quick drying process",
          "Limited wheel cleaning",
          "Surface-level cleaning only",
        ],
      },
      {
        type: "p",
        text: "While this may improve your vehicle’s appearance temporarily, it often leaves behind contaminants and may even create swirl marks or scratches over time.",
      },
      { type: "h2", text: "What Professional Detailing Includes" },
      {
        type: "p",
        text: "Professional detailing goes far beyond a regular wash by focusing on deep cleaning, paint protection, and interior restoration using safe and professional techniques.",
      },
      { type: "h3", text: "Exterior Detailing Process" },
      { type: "p", text: "Professional exterior detailing may include:" },
      {
        type: "ul",
        items: [
          "Snow foam pre-wash treatments",
          "Safe two-bucket hand washing methods",
          "Wheel and tire cleaning",
          "Paint decontamination",
          "Removal of road grime and buildup",
          "Professional microfiber drying",
          "Protective finishing treatments",
        ],
      },
      {
        type: "p",
        text: "These steps help safely remove contaminants while protecting your vehicle’s paint and finish.",
      },
      { type: "h3", text: "Interior Detailing Process" },
      {
        type: "p",
        text: "Interior detailing focuses on restoring cleanliness and comfort inside the vehicle, including:",
      },
      {
        type: "ul",
        items: [
          "Full interior vacuuming",
          "Deep cleaning carpets and seats",
          "Dashboard and console cleaning",
          "Leather conditioning",
          "Odor and stain removal",
          "Cleaning vents and hard-to-reach areas",
        ],
      },
      { type: "p", text: "The result is a cleaner, fresher, and more comfortable driving environment." },
      { type: "h2", text: "Why Professional Detailing Matters" },
      { type: "h3", text: "Protects Your Paint" },
      {
        type: "p",
        text: "Road salt, dirt, bugs, and environmental contaminants can slowly damage your vehicle’s paint if left untreated. Professional detailing removes harmful buildup and helps protect exterior surfaces.",
      },
      { type: "h3", text: "Preserves Vehicle Value" },
      {
        type: "p",
        text: "Vehicles that are regularly detailed often maintain better resale and trade-in value because they show fewer signs of wear and neglect.",
      },
      { type: "h3", text: "Improves Driving Experience" },
      {
        type: "p",
        text: "Driving a clean vehicle simply feels better. A spotless interior and glossy exterior create a more enjoyable and professional appearance.",
      },
      { type: "h3", text: "Prevents Long-Term Damage" },
      {
        type: "p",
        text: "Regular detailing helps prevent issues like paint deterioration, interior fading, and buildup that can become costly over time.",
      },
      { type: "h2", text: "The Importance of Safe Washing Techniques" },
      {
        type: "p",
        text: "Professional detailers use safe methods and premium products designed specifically for automotive surfaces. Techniques such as the two-bucket hand wash method help reduce the risk of scratches and swirl marks compared to automatic car washes.",
      },
      {
        type: "p",
        text: "Using proper microfiber towels, pH-balanced soaps, and professional drying methods also helps maintain your vehicle’s finish safely.",
      },
      { type: "h2", text: "Final Thoughts" },
      {
        type: "p",
        text: "A quick car wash may clean the surface, but professional detailing provides the deep cleaning and protection your vehicle truly needs. From preserving your paint to restoring your interior, detailing is an investment in your vehicle’s appearance, protection, and long-term condition.",
      },
      {
        type: "p",
        text: "For drivers in Halifax and across Nova Scotia, regular professional detailing is one of the best ways to keep your vehicle looking its absolute best throughout every season.",
      },
    ],
  },
  {
    slug: "why-regular-vehicle-detailing-is-more-than-just-a-car-wash",
    title: "Why Regular Vehicle Detailing Is More Than Just a Car Wash",
    author: "Jake Jeffery",
    date: "2026-05-13",
    dateLabel: "May 13, 2026",
    readTime: "2 min read",
    excerpt:
      "Regular detailing plays an important role in protecting your vehicle’s paint, preserving the interior, and maintaining its overall value.",
    photo: "bmw-m4",
    body: [
      {
        type: "p",
        text: "Keeping your vehicle clean is about more than appearance. Regular detailing plays an important role in protecting your vehicle’s paint, preserving the interior, and maintaining its overall value. While a quick car wash may remove surface dirt, professional detailing provides a deeper level of care designed to protect your investment long term.",
      },
      { type: "h2", text: "Protecting Your Vehicle’s Exterior" },
      {
        type: "p",
        text: "Your vehicle is exposed to harsh conditions every day, including road salt, dirt, rain, UV rays, and environmental contaminants. Over time, these elements can damage your paint and leave your vehicle looking dull and worn.",
      },
      {
        type: "p",
        text: "Professional exterior detailing helps prevent this by using safe washing methods and protective treatments, including:",
      },
      {
        type: "ul",
        items: [
          "Snow foam pre-wash treatments",
          "Two-bucket hand wash methods",
          "Paint decontamination",
          "Professional drying techniques",
          "Protective sealants and finishing treatments",
        ],
      },
      {
        type: "p",
        text: "These processes help reduce scratches, restore shine, and protect your vehicle’s finish from long-term damage.",
      },
      { type: "h2", text: "Maintaining a Clean Interior" },
      {
        type: "p",
        text: "Your vehicle’s interior experiences daily wear from dust, food, spills, mud, and bacteria buildup. Without regular cleaning, these contaminants can create odors, stains, and damage to interior surfaces.",
      },
      { type: "p", text: "Interior detailing helps restore and maintain your cabin by:" },
      {
        type: "ul",
        items: [
          "Vacuuming carpets and seats",
          "Deep cleaning floor mats and upholstery",
          "Cleaning vents, dashboards, and consoles",
          "Conditioning leather surfaces",
          "Removing stains and unwanted odors",
        ],
      },
      {
        type: "p",
        text: "A professionally cleaned interior creates a more comfortable and enjoyable driving experience while helping preserve the condition of your vehicle.",
      },
      { type: "h2", text: "Increase Your Vehicle’s Value" },
      {
        type: "p",
        text: "A well-maintained vehicle holds its value better over time. Regular detailing keeps both the interior and exterior in excellent condition, making your vehicle more appealing to future buyers or trade-in evaluations.",
      },
      {
        type: "p",
        text: "Vehicles with clean paint, protected surfaces, and spotless interiors often stand out compared to poorly maintained vehicles.",
      },
      { type: "h2", text: "Safe Detailing Methods Matter" },
      {
        type: "p",
        text: "Professional detailers use specialized products and techniques designed to safely clean your vehicle without causing damage. Safe washing methods, premium microfiber towels, and high-quality detailing products help prevent scratches and maintain the integrity of your paint and interior materials.",
      },
      { type: "h2", text: "Why Halifax Drivers Benefit From Regular Detailing" },
      {
        type: "p",
        text: "In Halifax and throughout Nova Scotia, vehicles are constantly exposed to changing weather conditions, road salt, and coastal air. These conditions can accelerate wear and corrosion if vehicles are not properly maintained.",
      },
      { type: "p", text: "Routine detailing helps protect your vehicle against:" },
      {
        type: "ul",
        items: [
          "Salt buildup during winter months",
          "Dirt and grime from daily driving",
          "UV exposure during summer",
          "Moisture and contaminants that can damage paint and interior surfaces",
        ],
      },
      { type: "h2", text: "Final Thoughts" },
      {
        type: "p",
        text: "Professional detailing is one of the best ways to protect your vehicle and keep it looking its best year-round. From preserving your paint to restoring your interior, regular detailing helps maintain the appearance, cleanliness, and value of your vehicle for the long term.",
      },
      {
        type: "p",
        text: "Investing in professional vehicle care today can help prevent costly damage and keep your vehicle in premium condition for years to come.",
      },
    ],
  },
];

export const post = (slug: string): Post | undefined => POSTS.find((p) => p.slug === slug);
