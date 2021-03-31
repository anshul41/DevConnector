const express = require('express');
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route api/profile/me
//@desc get my profille
//@access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(400).json({ msg: 'This user has no profile' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

//@route api/profile
//@desc Upsert profile
//@access private
router.post(
  '/',
  [
    auth,
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      website: website && website !== '' ? website : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest,
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

//@route api/profile/user/:userId
//@desc get specific user profile
//@access public
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(400).json({ msg: 'user not found' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') res.status(400).json({ msg: 'user not found' });
    res.status(400).json({ msg: 'server error' });
  }
});

//@route api/profile
//@desc get all profille
//@access public
router.get('/', async (req, res) => {
  try {
    res.json(await Profile.find().populate('user', ['name', 'avatar']));
  } catch (error) {
    res.status(400).json({ msg: 'server error' });
  }
});

//@route api/profile
//@desc delete profille
//@access private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.json('user deleted');
  } catch (error) {
    res.status(400).json({ msg: 'server error' });
  }
});

//@route PUT api/profile/experience
//@desc add experience
//@access private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'title is required').not().isEmpty(),
      check('company', 'company is required').not().isEmpty(),
      check('from', 'from is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        title,
        company,
        to,
        from,
        location,
        current,
        description,
      } = req.body;

      const experience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(experience);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ msg: 'server error' });
    }
  }
);

//@route Delete api/profile/experience
//@desc delete experience
//@access private
router.delete('/experience', auth, async (req, res) => {
  const expId = req.body.expId;
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(function (value) {
      return value._id != expId;
    });
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(400).json({ msg: 'server error' });
  }
});

//@route PUT api/profile/education
//@desc add experience
//@access private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'school is required').not().isEmpty(),
      check('degree', 'degree is required').not().isEmpty(),
      check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
      check('from', 'from is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { ...rest } = req.body;

      const education = {
        ...rest,
      };
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(education);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ msg: 'server error' });
    }
  }
);

//@route Delete api/profile/experience
//@desc delete experience
//@access private
router.delete('/education', auth, async (req, res) => {
  const eduId = req.body.eduId;
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education = profile.education.filter(function (value) {
      return value._id != eduId;
    });
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(ree.message);
    res.status(400).json({ msg: 'server error' });
  }
});

//@route Get api/profile/github/:username
//@desc get Github repositries
//@access public

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
    sort=created:desc&client_id=${config.get(
      'githubClientId'
    )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (err, responce, body) => {
      if (err) console.error(err);      
      if (responce.statusCode != 200) {
        return res.status(404).json({ msg: 'No repos Found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(ree.message);
    res.status(400).json({ msg: 'server error' });
  }
});
module.exports = router;
