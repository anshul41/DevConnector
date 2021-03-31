const express=require('express');

const router= express.Router();
const auth=require('../../middleware/auth')
const User=require('../../models/User')
//@route api/auth
//@desc Get user data after authentication
//@access private
router.get('/', auth,  async(req,res) => {
    try{
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err)
    {
        res.status(400).json({msg:'server error'});
    }
});

module.exports=router;
