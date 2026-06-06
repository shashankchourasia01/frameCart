require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorHandler');

const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const offersRouter = require('./routes/offers');
const ordersRouter = require('./routes/orders');
const uploadRouter = require('./routes/upload');
const adminRouter = require('./routes/admin');
const validateCouponRouter = require('./routes/validateCoupon');
const { supabase } = require('./lib/supabase');
const mock = require('./data/mock');
const categoryStore = require('./lib/mockCategoryStore');
const offerStore = require('./lib/mockOfferStore');

categoryStore.init();
offerStore.init();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (/\.vercel\.app$/i.test(origin)) return callback(null, true);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(apiLimiter);

app.get('/health', (_req, res) =>
  res.json({
    ok: true,
    dataSource: supabase ? 'supabase' : 'mock',
    mockProducts: mock.products.length,
    hint: supabase
      ? 'If the site is empty, run supabase/seed.sql in Supabase SQL Editor'
      : 'Using in-memory catalog; set SUPABASE_URL in server/.env for Supabase',
  })
);

const api = express.Router();
api.use('/categories', categoriesRouter);
api.use('/products', productsRouter);
api.use('/offers', offersRouter);
api.use('/orders', ordersRouter);
api.use('/validate-coupon', validateCouponRouter);
api.use('/upload', uploadRouter);
api.use('/admin', adminRouter);

app.use('/api/v1', api);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`FrameCraft API running on http://localhost:${PORT}`);
  if (supabase) {
    console.log('Data source: Supabase (ensure seed has been run — expect 10 categories, 50 products)');
  } else {
    console.log(`Data source: mock catalog (${mock.products.length} products, no Supabase env)`);
  }
});
