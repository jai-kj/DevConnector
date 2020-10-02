const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const request = require("request")
const config = require("config")
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/profile/me
// @desc   Get Current User Profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not Found for the User' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  POST api/profile
// @desc   Add | Create | Update user's profile
// @access Private
router.post(
  '/',
  [
    auth,
    check('status', 'Status is Required').not().isEmpty(),
    check('skills', 'Skills is Required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build Social Object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      // If profile => Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      // Else => Add New
      profile = new Profile(profileFields);
      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  GET api/profile/user/:user_id
// @desc   Get a user's profile
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile Not Found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile Not Found' });
    }
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  DELETE api/profile
// @desc   Delete Profile | User and all their Posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove user's posts
    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted!' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  PUT api/profile/experience
// @desc   Add user's experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is Required').not().isEmpty(),
    check('company', 'Company is Required').not().isEmpty(),
    check('from', 'From Date is Required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route  Delete api/profile/experience/:exp_id
// @desc   Delete user's experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the remove index
    const removeIndex = profile.experience
      .map(exp => exp.id)
      .indexOf(req.params.exp_id);
    if(removeIndex < 0) {
      return res.status(400).json({ msg: "No User Experience Found!"})
    }
    
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  PUT api/profile/education
// @desc   Add user's education
// @access Private
router.put(
  '/education',
  [
    auth,
    check('school', 'Institute Name is Required').not().isEmpty(),
    check('degree', 'Degree or Qualification is Required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is Required').not().isEmpty(),
    check('from', 'From Date is Required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route  Delete api/profile/education/:edu_id
// @desc   Delete user's education
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the remove index
    const removeIndex = profile.education
      .map(edu => edu.id)
      .indexOf(req.params.edu_id);
    if(removeIndex < 0) {
      return res.status(400).json({ msg: "No User Education Found!"})
    }
    
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  GET api/profile/github/:username
// @desc   Get user's repos from Github
// @access Public
router.get("/github/:username", async(req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('GithubClientID')}&client_secret=${config.get('GithubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (error, response, body) => {
      if(error) console.error(error)
      if(response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github Profile Found" })
      }

      res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
})

module.exports = router;
