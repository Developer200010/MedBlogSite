const router = require("express").Router();
const userModel = require("../models/User.js");
const postModel = require("../models/Post.js")

// creating post

router.post("/", async (req,res)=>{
    const newPost = new postModel(req.body);
    try {
        const savePost =await newPost.save();
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
});


router.put("/:id",async (req,res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await postModel.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                }, {new:true})
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json("you can update only your post!")
            }
        }else{
            res.status(500).json("you can update only your post!")
        }
    } catch (error) {
        res.status(500).json(error)
    }  
})

router.delete("/:id",async (req,res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await post.deleteOne();
                res.status(200).json("post has been deleted!")
            } catch (error) {
                res.status(500).json(error)
            } 
        }else{
            res.status(500).json("you can delete only your post!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/:id",async (req,res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/",async (req,res)=>{
        const username = req.query.user;
        const catName = req.query.category;
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 6;
        let skip = (page-1) * limit;

    try {
        let post;
        if(username){
            post = await postModel.find({username});
        } else if(catName){
            post = await postModel.find({categories:{
                $in: [catName]
            }});
        }else{
            post = await postModel.find().skip(skip).limit(limit);
        }
        const total = await postModel.countDocuments();
        const totalPages = Math.ceil(total / limit);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
});

// In your post routes (e.g., routes/posts.js)
// router.get('/', async (req, res) => {
//     const page = parseInt(req.query.page) || 1; // Defaults to page 1
//     const limit = parseInt(req.query.limit) || 5; // Defaults to 10 posts per page
  
//     try {
//       const totalPosts = await postModel.countDocuments(); // Get total number of posts
//       const posts = await postModel.find()
//         .skip((page - 1) * limit) // Skip posts for previous pages
//         .limit(limit); // Limit results to the specified number
  
//       res.status(200).json({
//         totalPages: Math.ceil(totalPosts / limit),
//         currentPage: page,
//         posts
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  

module.exports = router;