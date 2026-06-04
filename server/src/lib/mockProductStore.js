const { categories } = require('../data/mock');

/** @type {import('../data/mock').products extends Array ? never : any[]} */
let products = null;

function init(productsArray) {
  products = productsArray;
}

function attachCategory(product) {
  const cat = categories.find((c) => c.id === product.category_id);
  return {
    ...product,
    categories: cat ? { name: cat.name, slug: cat.slug } : product.categories,
  };
}

function listAll() {
  return products.map(attachCategory);
}

function listActive() {
  return products.filter((p) => p.is_active).map(attachCategory);
}

function findBySlug(slug, activeOnly = true) {
  const p = products.find((x) => x.slug === slug && (!activeOnly || x.is_active));
  return p ? attachCategory(p) : null;
}

function findById(id) {
  const p = products.find((x) => x.id === id);
  return p ? attachCategory(p) : null;
}

function slugTaken(slug, excludeId) {
  return products.some((p) => p.slug === slug && p.id !== excludeId);
}

function create(data) {
  const id = `p${Date.now()}`;
  const row = {
    id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    review_count: 0,
    avg_rating: 0,
    ...data,
  };
  products.push(row);
  return attachCategory(row);
}

function update(id, data) {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = {
    ...products[idx],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return attachCategory(products[idx]);
}

function remove(id) {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}

module.exports = {
  init,
  attachCategory,
  listAll,
  listActive,
  findBySlug,
  findById,
  slugTaken,
  create,
  update,
  remove,
};
