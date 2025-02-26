// Beauty posts
      exports.getbeautyPostsById = (req, res) => {
        const { id } = req.params; // Get the post ID from the URL params
      
        // Find the post by ID
        const beautyPost = beautyPost.find(post => post.id === id);
      
        // If the post is not found, return a 404 error
        if (!beautyPost) {
          return res.status(404).json({ message: 'Beauty post not found' });
        }
      
        // If the post is found, return it as the response
        return res.status(200).json(beautyPost);
      };


        // Lifestyle posts   
        exports.getlifestylePostsById = (req, res) => {
          const { id } = req.params; // Get the post ID from the URL params
        
          // Find the post by ID
          const lifestylePost = lifestylePost.find(post => post.id === id);
        
          // If the post is not found, return a 404 error
          if (!lifestylePost) {
            return res.status(404).json({ message: 'Lifestyle post not found' });
          }
        
          // If the post is found, return it as the response
          return res.status(200).json(lifestylePost);
        };

// Fashion posts      
      exports.getfashionPostsById = (req, res) => {
        const { id } = req.params; // Get the post ID from the URL params
      
        // Find the post by ID
        const fashionPost = fashionPost.find(post => post.id === id);
      
        // If the post is not found, return a 404 error
        if (!fashionPosts) {
          return res.status(404).json({ message: 'Beauty post not found' });
        }
      
        // If the post is found, return it as the response
        return res.status(200).json(fashionPost);
      };



 // Creating a new post     
exports.createPost = async (req, res) => {
    const { title, category, paragraphs, subTitle } = req.body;
  
    try {
      // Validate the request
      if (!title || !paragraphs) {
        return res.status(400).json({ message: "Title and paragraph are required" });
      }
  
      
      const newPost = {
        title,
        category,
        paragraphs,
        subTitle,
      };
  
      res.status(201).json(newPost); 
    } catch (error) {
      res.status(500).json({ message: "Error creating post", error });
    }
  };
  