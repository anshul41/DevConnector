const express = require('express');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

//@route api/users/register
//@desc register route
//@access public
router.post(
  '/register',
  [
    check('name', 'name cannot be empty').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
    check('password', 'password should be 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //see if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }

      // add user gravitar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //return jwttoken

      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json('server error');
    }
  }
);

//@route api/users/login
//@desc login route
//@access public

router.post('/login',[    
    check('email', 'email is not valid').isEmail(),
    check('password', 'password should not be empty').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let { email, password } = req.body;
    //bcrypt password

   
    //check if user exist
       const user= await User.findOne({email});
       if(user)
       {
        const isMatched=await bcrypt.compare(password,user.password)
        if(!isMatched)
        {
            res.status(401).json({msg:"Invalid Credentials pwd"});   
        }
        
        const payload = { user: { id: user.id } };

             jwt.sign(
              payload,
              config.get('jwtSecret'),
              { expiresIn: 36000 },
              (err, token) => {
                if (err) throw err;                
                res.json({token});
              }
            );
       }
       else{
            res.status(401).json({msg:"Invalid Credentials"});
       }
    
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).json('server error');
    }
}
  )

module.exports = router;
