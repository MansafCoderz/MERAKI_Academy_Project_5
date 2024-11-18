const express = require("express");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowingCount,
  getFollowing,
  removeFollower,
  getPostsByFollowers
} = require("../controllers/followers");
const authentication = require("../middleware/authentication");
const followerRouter = express.Router();


// Route to follow a user
followerRouter.post("/:user_id/follow",authentication,followUser)


// Route to unfollow a user
followerRouter.delete("/:user_id/unfollow",authentication,unfollowUser)

// route to remove follower
followerRouter.delete("/:user_id/trimFollower",authentication,removeFollower)


// Route to get followers of a user
followerRouter.get('/:user_id/follower', getFollowers);

followerRouter.get('/posty',authentication, getPostsByFollowers);




// Route to get users a user is following
// followerRouter.get('/:user_id/followingC',authentication, authentication,getFollowingCount);

// route to get who is user following 
followerRouter.get('/:id/following',authentication ,getFollowing);


//test in postman example:
// {
//     "follower_id": 1,
//     "following_id": 2
//   }
  
module.exports = followerRouter;
