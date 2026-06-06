const mock = require('../data/mock');

/** @type {typeof mock.categories | null} */
let categories = null;

function init() {
  categories = mock.categories.map((c) => ({ ...c }));
}

function listAll() {
  return [...categories].sort((a, b) => a.sort_order - b.sort_order);
}

function listActive() {
  return listAll().filter((c) => c.is_active);
}

function findById(id) {
  return categories.find((c) => c.id === id) ?? null;
}

function slugTaken(slug, excludeId) {
  return categories.some((c) => c.slug === slug && c.id !== excludeId);
}

function create(data) {
  const id = `cat-${Date.now()}`;
  const row = {
    id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    sort_order: categories.length + 1,
    ...data,
  };
  categories.push(row);
  return row;
}

function update(id, data) {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  categories[idx] = {
    ...categories[idx],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return categories[idx];
}

function remove(id) {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  categories.splice(idx, 1);
  return true;
}

module.exports = {
  init,
  listAll,
  listActive,
  findById,
  slugTaken,
  create,
  update,
  remove,
};
