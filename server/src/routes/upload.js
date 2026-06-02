const express = require('express');
const { supabase } = require('../lib/supabase');

const router = express.Router();

router.post('/', express.raw({ type: '*/*', limit: '12mb' }), async (req, res) => {
  res.json({
    url: `local://${Date.now()}-upload.jpg`,
    message: supabase
      ? 'Configure multipart middleware and Supabase Storage bucket "uploads"'
      : 'Mock upload — use local preview URL from client',
  });
});

module.exports = router;
