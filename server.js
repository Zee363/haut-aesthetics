require('dotenv').config();
const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser')
const authRoutes = require("./routes/authRoutes");
const authControllers = require("./Controllers/authControllers");
const blogsRoutes = require("./routes/blogsRoutes");
const path = require('path');
const app= express();
const cors = require('cors');
const mysql = require('mysql2');
const posts = [];


app.use(express.json());
app.use("/api/auth/signup", authRoutes);

app.use(express.json());
app.use("/api/auth/login", authRoutes);

app.use(express.json());
app.use("/api/lifestyle/:id", blogsRoutes);
app.use("/api/beauty/:id", blogsRoutes);
app.use("/api/beauty/:id", blogsRoutes);
app.use("/api/newpost/", blogsRoutes);

// Middleware
// CORS configuration with credentials

const corsOptions = {
    baseUrl: `${process.env.FRONTEND_LOCAL_URL}`,
    origin: ['http://127.0.0.1:3000', `${process.env.FRONTEND_URL}`, `${process.env.FRONTEND_LOCAL_URL}`], // Your frontend origin
    methods: ['POST','GET', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Allow-Access-Cross-Origin'], // Allowed headers
};

app.use(cors({
    origin: [`${process.env.FRONTEND_LOCAL_URL}`, `${process.env.FRONTEND_URL}`]
}));

// Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  });

  app.set('db', db);

  db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

app.use(bodyParser.json());

// Get data from the database
app.post('/api/auth/signup', (req, res) => {
    const sql=  'INSERT INTO users(fullname, email, password) VALUES(?)';
    const values = [req.body.fullname, req.body.email, req.body.password];
    db.query(sql, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json({
        id: data.insertId,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        message: 'User added successfully!!!',
      });
    })
});

app.post("/api/auth/signup", async (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'User found successfully',
      user: {
        email: user.email,
        password: user.password,
      }
      }
    );
    db.end();
  });
});

app.post("/api/auth/login", async (req, res) => {
    console.log('Login request received:', req.body);
    res.status(200).json({ message: 'User logged in successfully' });
});


// Fashion blog posts
const fashionPosts = [
    {
        id: 0,
        pageTitle: "Fashion",
        category: "Style",
        title: "The Fig & Honey Edit",
            paragraphs: [
              "Hey friends! I recently got gifted these linen lounge pants from Fig & Honey who is a locally produced lifestyle brand that focuses on simple, evergreen garments that are versatile and modifiable in nature. By hand-making every item in Cape Town, using responsibly sourced materials, Fig and Honey lets you shop a range of quality products made with care and consideration. Wardrobe staples that form the base of the core range are made to be worn your way, and deliver on three simple principles: comfort, ease and value.",
              "Styling these pants reminded me of how much one can get so much wear out of a timeless, classic piece. I will definitely be wearing these often for more occasions and WFH days. Plus black goes with everything and fits in perfect with my minimal wardrobe.",
              "Join me as I share and edit of how I’ve been styling them for a coffee date, errands, and meetings.",
              {
                subTitle: "The Looks",
              }
              
            ],
            images: ["/style1.1.1.webp", "/style1.1.2.webp", "/style.1.1.3.webp", "/style1.1.4.webp", "/style1.1.5.webp", "/style1.1.6.webp", "/style1.1.7.webp", "/style1.1.8.webp"],
          },
    
      {
        id: 1,
        pageTitle: "Fashion",
        category: "Style",
        title: "DISSH - The Minimalist Brand Worth the Hype",
            paragraphs: [
              "Timeless, classic, hero styles to add to your wardrobe and not sure which brand to choose from? Dissh is the answer. I recently got gifted pieces from the Australian brand and I am so obsessed. Dissh makes effortless style an everyday habit with items from their timeless collection.",
              "What I truly love most is that the brand is female-led which made me more eager to want to own a piece from them. I had the amazing opportunity of the brand being able to send me two pieces and after having a brief look at what I already own, the pieces I picked out made sense. For me, a simple, well-tailored, timeless wardrobe is the way to go because with my personal style I always think long-term.",
              "I can also confidently say that the process was seamless, and easy, and will not prevent me from shopping the brand’s site in the future.",
              {
                subTitle: "Cass Linen midi dress",
                content: [
                  "The hero-style dress is absolutely gorgeous. The dress is so lightweight, comfortable and if you know me, you know I love an asymmetrical look so this ticked all the boxes for me. I appreciate how non-stretch the garment is making it true to size. I recently wore this dress on a lunch date with a friend and definitely look forward to wearing it again. She’s a head-turner and a show stopper indeed.",
                  "Styled the dress with my buttery yellow Zara mules and my Jo Borkett pouch."
                 ],
                },
              {
                subTitle: "Syrah Natural Linen midi skirt",
                content: [
                 "The piece was exactly what I was in search of for my “European Summer Style” which is the Syrah natural midi skirt. I’ve been on a hunt for a piece like this and knew it had to be my first pick. A item like this is timeless, trans seasonal and fits really well in my wardrobe. This can be easily dressed up or down making it such a great item to own.",
                "I popped on my Mango bag and sandals keeping the look very simple and easy.",
                "Everything I own from DISSH makes me feel and look really put together with very little effort, which I love. It doesn’t get much better than that! If you’re looking to see how I’ve been styling these items recently and in video format you can check out my Instagram." 
                ],
                },
             {
              paragraph: "A huge thank you to the team at Dissh for gifting me such beautiful, timeless pieces."
             }
              
            ],
            images: ["/style1.2.1.webp", "/style1.2.2.webp", "/style1.2.3.webp", "/style1.2.4.webp", "/style1.2.5.webp", "/style1.2.6.webp", "/style1.2.7.webp"],
          },
    
      {
        id: 2,
        pageTitle: "Fashion",
        category: "Style",
        title: "Spring Dressing with Poetry",
            paragraphs: [
              "Poetry recently invited me to visit one of their stores to have an experience of their new spring range looks.",
              "I stopped by their Hyde Park store and tried on what was available from the range and the pieces were absolutely stunning. The new season styles ranges from the prettiest prints, textures and silhouettes you can dream of. From short and sweet, flowy and fun prints to a monochrome mood. There’s a style for everyone.",
              {
                subTitle: "The Looks",
                content: [
                  "These looks are available both online and in-store. If you’re looking to see these styles in action, visit my Instagram account for more content.",
                  "Show up and show off this spring with Poetry and stand a chance to WIN R6 000 worth of spring looks. Dreaming of a new dress for every sunny month? Enter the exciting giveaway below."
                 ],
                },
            ],
            images: ["/style1.3.1.webp", "/style1.3.2.webp", "/style1.3.3.webp", "/style1.3.4.webp", "/style1.3.5.webp", "/style1.3.6.webp", "/style1.3.7.webp"],
          },
    
      {
        id: 3,
        pageTitle: "Fashion",
        category: "Style",
        title: "Pre-loved Styling Edit",
            paragraphs: [
              "Hi Friends! I had such a lovely time going for fittings and trying out some pre-loved pieces from a local brand called Glee Thrifting. I Styled some pre-loved pieces from Glee Thrifting and had so much fun challenging myself by throwing in some colour and pieces I wouldn’t normally go for.",
              "They are hosting an exciting event for the weekend which is for a “Sip & Shop” experience for a day of fun and fashion. You can also get some good gems from brands like Cos, Gap, Vera Moda and more!",
              "I used to enjoy thrifting but as I grew older I guess I slowly grew out of it. I am enjoying going back to it and finding some lovely gems as I do. Mixing and matching with my now wardrobe is so fun.",
              {
                subTitle: "The Pieces",
                content: [
                  "Knit vest.",
                  "Deconstructed detailed cardigan.",
                  "Oversized knit.",
                  "Polka Cardi",
                  "Long skirt & crop cardigan",
                  "Denim jacket",
                  "Sweater"
                 ],
                },
                {
                  paragraph: "You can check out more pieces on their social media platforms, follow “@gleethrifting”."
                },
            ],
            images: ["/style1.4.1.webp", "/style1.4.2.webp", "/style1.4.3.webp", "/style1.4.4.webp", "/style1.4.5.webp", "/style1.4.6.webp", "/style1.4.7.webp", "/style1.4.8.webp"],
          },
        ]

     //Beauty posts blogs
     const beautyPosts = [
      {
        id: 0,
        pageTitle: "Beauty",
        category: "Skincare",
        title: "Get Ready to Get Hydrated W/Kind",
            paragraphs: [
              "Introducing the new Hydroluxe Instant Hydrating Hyaluron Moisturiser from skincare brand Kind Vegan Skincare which I had to try (loves trying out a new skincare ritual). This product has honestly blown me away by how smoothing it is on my skin and instantly feels hydrating.",
              "This gentle moisturizer is soft and lightweight and can be used daily on the skin or as an eye cream. The product is fragrance free, sustainably sourced and 100% natural.",
              "Get nourished, radiant and revitalised skin with the Hydroluxe moisturizer. Benefits include:",
    
              "Instant Hydrating cream which has left my skin so smooth and hydrated since introducing it to my routine. Looking forward to more days of using it and seeing even more amazing results.",
              "Head over to Kind Vegan Skincare to shop.",
            ],
            images: ["/skincare1.5.1.webp", "/skincare1.5.2.webp", "/skincare1.5.3.webp", "/skincare1.5.4.webp"],
          },
    
      {
        id: 1,
        pageTitle: "Beauty",
        category: "Skincare",
        title: "The most used Skin Creamery products in my Beauty Cupboard",
            paragraphs: [
              "There's nothing better than the feeling of supple and healthy skin. I've been working with Skin Creamery for a little over a year now and have been using their products religiously.",
              "The products have been keeping my skin healthy and protected and now that we're in the colder months the products have been working well in taking care of my skin. The product range is honestly great in keeping skin good all year long.",
              "As much as the brand has a good range of options to choose from, I do have my personal favourites from the collection that I quite enjoy.",
              "When it comes to skincare I've been using products from Skin Creamery who I have been working with and had the opportunity to use their products for a little over a year now. It's truly an experience you get when using the products",
              {
                subTitle: "Step 1 - The Oil-Milk Facial Cleanser",
                content:
                  "Starting off with the Oil-Milk Facial cleanser which gently nourishes my skin and removes impurities. I love how this cleanser is one I can use both in the mornings and evenings and it doesn’t dry out my skin.",
              },
              {
                subTitle: "Step 2 - Skin Tonic",
                content:
                  "After cleansing my skin I apply the Skin Tonic which I've loved and haven't stopped using since receiving it. It's a product I always include in my routine and I love the fresh feeling I get after applying it on my skin.",
              },
              {
                subTitle: "Step 3 - The Everyday Cream All-Purpose Moisturiser",
                content:
                  "Such a great all-around moisturiser and versatile enough to use on the face and body which I appreciate. This product is so gentle and soothing on my skin and I love that a little goes a long way. Since introducing it to my skincare regime it has truly kept my face, body and hands moisturised and smooth especially during the cold season.",
              },
              {
                subTitle: "Step 4 - The Balm",
                content:
                  "Not only picture perfect but effective too! The Balm is a product I often reach out to when I'm looking to add that extra layer of nourishment and hydration to my skin. A great multi-purpose product too that can be used on the face, areas of the body like your knees, elbows etc and the lips.",
              },
              "Skin Creamery's products all have such great formulation of ingredients that truly work and have been effective on my skin. The products are gentle and super soothing. It truly is an experience you get when using the products.",
            ],
            images: ["/skincare1.6.1.webp", "/skincare1.6.2.webp"],
          },
    
          {
            id: 2,
            pageTitle: "Beauty",
            category: "Skincare",
            title: "Skin Health Is The Future",
            paragraphs: [
              "My beige flag is that I'll never say no to trying out new skincare products. Especially knowing my skin rarely gets irritated at anything I use. I recently got approached by local brand Eleven2 who is based in Cape Town to try out some products and of course I said yes!",
              "Eleven2 products range are hand-picked ingredients that are gentle enough so as not to irritate the skin, but with effective & healing properties to ensure your skin feels nourished and cared for. Free from harmful synthetics and artificial fragrances, this artisan skincare range is affordable yet boasts a luxurious feel, and remains 100% committed to producing products that won't harm our bodies, the environment or our oceans.",
              "The products sent to me are suited for my skin type which is normal. Below are the steps in which I've been using the range.",
              {
                subTitle: "Step 1",
                content:
                  "Radiant Skin Cleansing Powder cleanses and exfoliates without drying the skin, removing dead skin cells. Loaded with Vitamin C, it boosts circulation and helps with collagen production.",
              },
              {
                subTitle: "Step 2",
                content:
                  "Niacinamide B3+B5 Brighter Skin, Improved skin texture and it minimizes the appearance of pores. Also regulates oil, helps with hyperpigmentation and minimizes fine lines and wrinkles.",
              },
              {
                subTitle: "Step 3",
                content:
                  "Squalane is super hydrating and calming on the skin. It improves skin elasticity and is known to help in reducing the appearance of fine lines and wrinkles. It balances oil production, providing just enough moisture to keep the skin clear and healthy.",
              },
            ],
            images: ["/skincare1.7.1.webp", "/skincare1.7.2.webp", "/skincare1.7.3.webp", "/skincare1.7.4.webp"],
        },
    
      {
        id: 3,
        pageTitle: "Beauty",
        category: "Skincare",
        title: "The SOS Treatment",
        paragraphs: [
              "Hi Friends! I recently got gifted most probably the biggest package ever from Skin Creamery. I am so happy to be collaborating with the brand on various skincare series which will be shared on my platforms, the Skin Creamery platforms and my site, of course!",
              "I have already covered they Powder To Foam Cleanser and previous highlighted The Everyday Moisturizer All-Purpose Cream [Read Here: All-Purpose Body Care] and for this post we will chat all things The Everyday Cream All-Purpose Moisturiser. For this post I'll be covering The Balm Calming Concentrate.",
              "This calming botanical balm concentrate provides instant relief for dry, sensitive skin. The solid oil blend of Marula, Prickly Pear seed and Baobab melts into your skin, hydrating and calming redness and irritation.",
              {
                subTitle: "Prickly Pear Oil",
                content:
                  "The Prickly Pear is a member of the cactus family, it can thrive through long droughts, producing fruit that contains small black seeds. Inside the delicious fruits of the prickly pear are seeds that contain the finest quality, precious oil carrying different types of fatty acids, phenols, and nutrients such as vitamin E, vitamin K, phytosterols, and antioxidants. This oil is extremely hydrating and skin softening.",
              },
              {
                subTitle: "Blue Spirulina",
                content: [
                  "One of the most nutritious ingredients on the planet is Spirulina. Spirulina is a blue-green algae (found in both fresh and saltwater) or cyanobacteria, which is a type of bacteria that lives in water; they get their energy through photosynthesis.",
                  "Spirulina is highly nutritious, it contains 8 essential amino acids, Omega-3 fatty acids, Vitamin B and Iron. It is also high in protein, which is necessary for cell repair and growth. That combined with being a rich source of antioxidants makes spirulina highly effective in the fight against free radicals.",
                  "On top of that, Spirulina contains a rare fatty acid known as gamma-linolenic acid (known to promote the structural integrity of skin and decrease skin inflammation).",
                ],
              },
              {
                subTitle: "Helichrysum",
                content:
                  "Referred to by some as the Everlasting or Immortal Flower, the Helichrysum plant offers several benefits to the skin. With rejuvenating and restorative properties, Helichrysum oil has many uses, including reducing the appearance of blemishes and wrinkles thus providing a soothing sensation for the skin. Helichrysum essential oil has anti-inflammatory, anti-fungal, and antibacterial properties that may be useful in healing skin. ",
              },
              {
                subTitle: "Baobab Oil",
                content: [
                  "Baobab is our hero ingredient as it is found in most of our products.",
                  "Baobab (native to Africa) is often referred to as the “tree of life”. The powerful health and skincare benefits of baobab oil have been known and used by communities in Africa for centuries. Pressed from the seeds of the baobab tree, baobab oil is a luxurious (plant-based), nutrient-rich oil. Baobab oil is a one-ingredient powerhouse! It is an excellent moisturiser and works to improve skin elasticity - naturally. Rich in vitamins A, D, E and F, it also helps to restore the skin's natural glow.Baobab oil is ideal to use on the skin because of its lightweight, smooth texture that absorbs quickly and isn't greasy.",
                ],
              },
              "Keep an eye out for more posts featuring these amazing products from Skin Creamery. Visit my social platforms to see more visuals.",
            ],
            images: ["/skincare1.8.1.webp"],
          },
     ]
    
    //Lifestyle blog posts
    const lifestylePosts = [
    {
      id: 0,
      pageTitle: "Lifestyle",
      category: "Personal",
      title: "The year of BLOOM",
      paragraphs: [
        "I recently celebrated my birthday and I've decided that in my 26th year I'd like to bloom. I want to grow in the direction of the sun and see myself stretch towards the light. Wrapped in warmth and firmly rooted. Envisioning a woman who is going through the motions of better understanding and loving herself even more. Surrounded by love in all forms. Surrounded by a community of family (chosen or blood) who truly see her, and believe in her. This blessing of life is stepping deep within my bones and I am gracefully journeying with it.",
        "I also write down a few notes that allow me to remember how to get better as a person and allow my faults and mistakes to be a lesson that I sit down with and examine. Throughout 25 I discovered how important it is to get rid of those funky people in your life who are unsupportive, aren't accountable, abusive, jealous, competitive, materialistic, negative, gossips and gaslights. Make room for those who align with your path, goals and values. People you feel safe with. Peole who show you love through actions, not just empty words. People who want to understand who you are instead of projecting what they want to see. I promise you, they exist. Working on my own healing I started meeting such amazing people and attracting such good opportunities and also found myself in healthy, positive spaces. Know how to hold space for good people who will celebrate you, genuinely. Yet, also allow yourself to feed on positivity as strongly as you can so you attract the good.",
        "Here's to 26! I'm still here, not because I'm great or because I deserve to be here, but because God is not done with me. Luke 2:52 🤍 prayer - wholistic growth in wisdom, statue and increase in favour with God.",
        "Sending you all love & light.",
      ],
      images: ["/personal1.9.1.jpg", "/personAl1.9.2.jpg"],
    },
    
          {
            id: 1,
            pageTitle: "Lifestyle",
            category: "Personal",
            title: "The Words You Speak Become The House You Live In",
               paragraphs: [
                 "How strange is it? You know yourself more than anyone else, yet you crumble at the words or actions of someone who has not lived a single second of your life. The world is filled with people who think they know you but realizing that no one else's voice but yours and the one who created you matters.",
                 "I felt so inspired to put this post together because since entering my 26th year I have come to realize so much about myself and the people around me. There's a bible verse that reads:",
                 "Don't let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity. -1 Timothy 4:12",
                 "Reading this verse you learn that Paul's advice to Timothy is do not give others pause to think that you being young is a reason to believe you are anything but trustworthy, godly, and responsible. Basically, represent yourself so well that they don’t even have time to think about your age but respect your maturity in the Lord which I love. I resonate so well with this verse in many ways but reflecting in it all from how I conduct myself, how both purely joyful and fantastic existing relationships (and the failed ones) I learn to move in life with so many love for myself and others. When you go into any situation with pure intention and it is not received you learn that the grass is not always greener on the other side. Focusing on your side of the lawn and watering your own BUT watering those who appreciate allows for your energy to refocus on the blessings around you.",
                 "I referenced this verse in particular because you also start understanding how personal your relationship is with Christ (your faith) and focusing on the journey together. Be an example to those who truly see the light within you and stop focusing on what does not nurture you. Simple. God is strategic, so great and consistent and will always set the tone so you better understand situations you find yourself in. Remember he is the ultimate love.",
                 "I hope somewhere, somehow reading this short post resonates with you to refocus from certain situations and rather focus on you and the blessings your creator continues to give you.",
                 "Sending love and light for anyone going through a season of finding their silver lining! YOU GOT THIS!",
            ],
               images: ["/personal2.1.webp", "/personal2.2.webp", "/personal2.3.webp"],
          },
    
          {
            id: 2,
            pageTitle: "Lifestyle",
            category: "Personal",
            title: "Journey of Connection & Wellness",
               paragraphs: [
                 "If you have been following me for a while now, you would know that I’ve been an ambassador for female wellness brand Kiko Vitals for a while now. I’ve shared my journey across my social platforms and on my website as well. For the month of February the brand has asked me to share “5 Reasons Why I’m buying Kiko Vitals this Valentine’s” and I immediately thought about my journey using the Debloat and Gut Glow supplements.",
                 "As someone who struggles with IBS related issues I need to make sure that my gut is happy and us tummy troubled girlies know if our guts are happy, so are we. So best believe, I’m not skipping on my Kiko Vitals Debloat and Gut Glow supplements.",
                 "To me, having a holistic approach to my overall wellbeing and self-love is of top priority and knowing that a brand like Kiko Vitals is dedicated to restoring physical wellbeing and nurturing the inner being makes me have immense admiration for the brand.",
                 "The supplements have great ingredients including Peppermint, Ginger Root, Dandelion Root and more making it effective ensuring it works. For me, prioritizing my self-care is key and with a powerhouse product like the Debloat and Gut Glow from Kiko Vitals, I know I can always feel my best. The Debloat and Gut Glow has not only helped with my symptoms but enhanced my overall well-being making it the perfect Valentine’s day gift to me, from me.",
                 "Investing in our female wellness is a sign of self-love and empowerment. So spoil yourself this Valentines with products from KikoVitals. The female wellness brand known to do it best.",
                 "To purchase any of the brands available products visit: http://www.kikovitals.com and you can use my code “AYANDA10” for a 10% savings at checkout.",
                 "To see more content and video footage of me sharing more on my journey you can check out my Instagram page.",
            ],
               images: ["/personal3.1.webp"],
          },

          {
            id: 3,
            pageTitle: "Lifestyle",
            category: "Personal",
            title: "Haut Q&A",
              paragraphs: [
                 "Hey Friends! Okay, this was meant to be live a long time ago (don’t come for me, thanks) but it’s finally here. I shared over on my social platforms that I would be doing another [Read Here: Blogger Tag - Get to Know Me] I enjoy these because I get to be in touch with everyone who engages with my content. Join me as I share some Q&As from you to me.",
              {
                subTitle: "Where are you based?",
                content: "I am based in Johannesburg, South Africa.",
              },
              {
                subTitle: "What is your zodiac sign?",
                content: "Pisces.",
              },
              {
                subTitle: "How would you describe your fashion sense?",
                content: "Minimal, chic and easy. I love a soft and simple approach to style.",
              },
              {
                subTitle: "What kind of music do you like?",
                content: "I’m very diverse when it comes to music. I love neo-soul, I enjoy vibing out to some hip hop, we can throw in some classical, gospel or even deep house.",
              },
              {
                subTitle: "What are your top 3 favourite songs right now? Also include 3 all time favourite albums.",
                content: "Okay, you had me here. My current favourite songs are Adele – My Little Love, Ari Lennox – Mean Mug and Bas – Matches. When it comes down to my favourite albums of all time: Kendrick Lamar – To Pimp A Butterfly, 2015 (I appreciate the beats and lyrics on here), Corinne Bailey Rae – The Sea, 2010 (really enjoying this one. It was one of my first albums my mom got me) and Isaiah Rashad – The House Is Burning, 2021 (for the vibes).",
              },
              {
                subTitle: "What do you do? Career wise.",
                content: "I am a Digital Marketer currently working for a creative agency based in Johannesburg. I am also a creative consultant and I also make a living through my website with brands as a Blogger. I also do some creative consulting with some projects and collabs.",
              },
              {
                subTitle: "Your career path and what led you to what you’re doing today?",
                content: "I’ve always known that I want to work in fashion and creative spaces for as long as I can remember. Growing up I’ve always wanted to be a Fashion Designer (still my biggest dream). And I got exposed to the industry even more. I got to engage with all aspects of it from both a practical and theory part. I slowly did fashion styling, gradually moving towards being a blogger and learning about the digital world. Eventually it all just started making sense to where I am now. I still have so many things that I want to achieve within my career but to date I’m living my dream.",
              },
              {
                subTitle: "What do you love about social media? And, how has it changed since you began your career?",
                content: "I jumped onto social media platforms very early on, creating for upcoming clothing brands and also content creating for other individuals. When I started being more intentional about growing Haut I got even more comfortable creating my own content. It had a whole new purpose — a new outlet for me to grow and express my creative thoughts and share what I love. I would have always found a way to slot myself within the industry, but social media gave a voice to those who were starting out and not afraid which I’ve always appreciated about it. I also have such a great community of supporters on there.",
              },
              {
                subTitle: "How has your style and aesthetic evolved?",
                content: "I think I have always stuck to my rule of ‘less is more’. I may lean towards different tones and shapes depending on the year, season or trend, but ultimately I go back to a real simple aesthetic. I’m such a minimalist at heart and I love the calm it gives me."
              },
              {
                subTitle: "Tips for someone who wants to do Digital Marketing?",
                content: "Listen, I am no expert in the field. From my experience it’s been a learning, unlearning experience. The best advice I can give is to work hard. Research, network and create. I am currently studying so that I’m able to understand even better so do whatever you can to learn and grow in what you’re doing. Did I mention create? What helped me most was designing and learning about the different softwares available. Educating myself on all things marketing and even understanding clients and how businesses function off from marketing. You really learn so much once you commit and dedicate to the course of it all.",
              },
              {
                subTitle: "Do you plan your content? What do you use to take your pictures.",
                content: "Brand work I do love to plan around. I enjoy creating a moodboard around the brand brief and create content around it. For my own work I just love allowing things to flow especially when it’s just an outfit of the day look it’s a simple snap and share.",
              },
              {
                subTitle: "Love your aesthetic. How do you stay disciplined to it?",
                content: "Thank you! I get asked this all the time. I am living my aesthetic to be honest. I sometimes find that it randomly catches up to me, if that makes sense. It comes naturally and I just have a flow to it. I don’t like overthinking it, so I just allow myself to freely do what I want when it comes to it and when I do pay attention it’s consistent.",
              },
              {
                subTitle: "How do you pronounce your brand name?",
                content: "It’s pronounced ‘hawt’.",
              },
              {
                subTitle: "What editing apps do you use?",
                content: "I often use Snapseed. I sometimes use VSCO Cam and for brand work I use Adobe and Lightroom.",
              },
              {
                subTitle: "Love your book shares. Who is your favourite author?",
                content: "I can’t really pick just one but I absolutely love Hanya Yanagihara and of course my ultimate favourite Jay Shetty. I always revert back to Think Like A Monk and looking forward to getting his latest release.",
              },
              {
              paragraph: "A huge thank you to everyone who engaged. I haven’t included all the questions since I want to do a two-part series. Thank you for stopping by.",
              },
            ],
              images: ["/personal4.1.webp"],

        },
    ]


// Route for all GET requests
// Route for all fashion posts
app.get("/api/fashion", (req, res) => {
  res.json(fashionPosts);  
});

// Route for all beauty posts
app.get("/api/beauty", (req, res) => {
    res.json(beautyPosts);  
});

// Route for all lifestyle posts
app.get("/api/lifestyle", (req, res) => {
    res.json(lifestylePosts);
});

// Route for all  GET posts via IDs
app.get("/api/fashion/:id", async (req, res) => {
    const postId = parseInt(req.params.id);
    const post = fashionPosts.find((p) => p.id === postId);
    res.json(post);
});

app.get("/api/beauty/:id", async (req, res) => {      
    const postId = parseInt(req.params.id);
    const post = beautyPosts.find((p) => p.id === postId);
    res.json(post);
});

app.get("/api/lifestyle/:id", async (req, res) => {
    const postId = parseInt(req.params.id);
    const post = lifestylePosts.find((p) => p.id === postId);
    res.json(post);
});

// Routes to add posts to database
app.post("/api/beauty/", (req, res) => {
  const db = req.app.get("db");
  
  const { pageTitle, category, title, paragraphs, images } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const paragraphsJSON = JSON.stringify(paragraphs);
  const imagesJSON = JSON.stringify(images);

  try {
    const sql = `INSERT INTO posts( pageTitle, category, title, paragraphs, images) VALUES (?, ?, ?, ?, ?)`;
    const values = [pageTitle, category, title, paragraphsJSON, imagesJSON];

    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting post:", err); // Log error for debugging
        res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Post created successfully:", result); // Log result for debugging
        res.status(201).json({ message: "Post created successfully", postId: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/fashion/", (req, res) => {
  const db = req.app.get("db"); 
  
  const { pageTitle, category, title, paragraphs, images } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const paragraphsJSON = JSON.stringify(paragraphs);
  const imagesJSON = JSON.stringify(images);

  try {
    const sql = `INSERT INTO posts( pageTitle, category, title, paragraphs, images) VALUES (?, ?, ?, ?, ?)`;
    const values = [pageTitle, category, title, paragraphsJSON, imagesJSON];

    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting post:", err); // Log error for debugging
        res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Post created successfully:", result); // Log result for debugging
        res.status(201).json({ message: "Post created successfully", postId: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for creating lifestyle posts
app.post("/api/lifestyle/", (req, res) => {
  const db = req.app.get("db"); 
  
  const { pageTitle, category, title, paragraphs, images } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const paragraphsJSON = JSON.stringify(paragraphs);
  const imagesJSON = JSON.stringify(images);

  try {
    const sql = `INSERT INTO posts( pageTitle, category, title, paragraphs, images) VALUES (?, ?, ?, ?, ?)`;
    const values = [pageTitle, category, title, paragraphsJSON, imagesJSON];

    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting post:", err); // Log error for debugging
        res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Post created successfully:", result); // Log result for debugging
        res.status(201).json({ message: "Post created successfully", postId: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/newpost/', (req, res) => {
  const sql = 'SELECT * FROM new_posts';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting posts:', err);
      res.status(500).json({ message: 'Error getting posts' });
    } 
      res.json(result);
    });
  });

// Routes for creating blog posts for all pages
app.post("/api/newpost/", (req, res) => {
  const { pageTitle, title, category, paragraphs } = req.body;

  const sql =
    "INSERT INTO new_posts (pageTitle, title, category, paragraphs) VALUES (?, ?, ?, ?)";
  const values = [pageTitle, title, category, paragraphs];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting post into the database:", err);
      return res.status(500).json({ message: "Error creating post" });
    }
    const createdPost = {
      id: result.insertId,
      pageTitle,
      title,
      category,
      paragraphs,
    };
    res.status(201).json(createdPost);  // Return the created post as a JSON response
  });
});

app.put("/api/newpost/:id", (req, res) => {
const id = req.params.id;
const sql = `UPDATE new_posts SET pageTitle = ?, title = ?, category = ?, paragraphs = ? WHERE id = ?`;
const values = [req.body.pageTitle, req.body.title, req.body.category, req.body.paragraphs, req.params.id];

db.query(sql, values, (err, result) => {
  if (err) return res.json(err);

  return res.json({
    id: id,
    pageTitle: req.body.pageTitle,
    title: req.body.title,
    category: req.body.category,
    paragraphs: req.body.paragraphs,
    message: "Post updated successfully",
  });
});
});


app.delete("/api/newpost/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM new_posts WHERE id = ?`;
  
  db.query(sql, id, (err, result) => {
    if (err) return res.json(err);
  
    return res.json({ message: "Post deleted successfully" });
  });
  }
);
  

// Route for authentication
// Route for signing up
app.post("/api/auth/signup", async (req, res) => {
    res.status(201).json({ message: 'User created successfully' });
    res.json({ message: 'Request successful' });
    });

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});