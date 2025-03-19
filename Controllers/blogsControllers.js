// Beauty posts
      exports.getbeautyPostsById = async (req, res) => {
        const { id } = req.params; // Get the post ID from the URL params
        const db = req.app.get('db');
        try {
          const [rows] = await db.query('SELECT * FROM posts');
          
          res.json(rows);
        } catch (error) {
          res.status(500)
      .json({ message: "Error fetching posts", error: error.message });
        }
      };


        // Lifestyle posts   
        exports.getlifestylePostsById = async (req, res) => {
          const { id } = req.params; // Get the post ID from the URL params
          const db = req.app.get('db');
          try {
            const [rows] = await db.query('SELECT * FROM posts');
            
            res.json(rows);
          } catch (error) {
            res.status(500)
        .json({ message: "Error fetching posts", error: error.message });
          }
        
        };

// Fashion posts      
      exports.getfashionPostsById =  async (req, res) => {
        const { id } = req.params; // Get the post ID from the URL params
        const db = req.app.get('db');
        try {
          const [rows] = await db.query('SELECT * FROM posts');
          
          res.json(rows);
        } catch (error) {
          res.status(500)
      .json({ message: "Error fetching posts", error: error.message });
        }
      };



 // Creating a new post     
exports.createPost = async (req, res) => {
    const { pageTitle, title, category, paragraphs } = req.body;
  
    try {
      // Validate the request
      if (!title || !paragraphs) {
        return res.status(400).json({ message: "Title and paragraphs are required" });
      }
  
      
      const newPost = {
        pageTitle,
        title,
        category,
        paragraphs,
      };
  
      res.status(201).json(newPost); 
    } catch (error) {
      res.status(500).json({ message: "Error creating post", error });
    }
  };
  