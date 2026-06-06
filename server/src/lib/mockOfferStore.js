const mock = require('../data/mock');

/** @type {typeof mock.offers | null} */
let offers = null;

function init() {
  offers = mock.offers.map((o) => ({ ...o }));
}

function isLive(offer) {
  return offer.is_active && new Date(offer.valid_till).getTime() > Date.now();
}

function listAll() {
  return [...offers].sort(
    (a, b) => new Date(b.valid_from).getTime() - new Date(a.valid_from).getTime()
  );
}

function listActive() {
  return listAll().filter(isLive);
}

function findById(id) {
  return offers.find((o) => o.id === id) ?? null;
}

function couponTaken(code, excludeId) {
  if (!code) return false;
  const normalized = code.trim().toUpperCase();
  return offers.some(
    (o) => o.coupon_code?.trim().toUpperCase() === normalized && o.id !== excludeId
  );
}

function create(data) {
  const id = `offer-${Date.now()}`;
  const row = {
    id,
    used_count: 0,
    is_active: true,
    is_featured: false,
    applicable_to: 'all',
    min_order_value: 0,
    ...data,
    coupon_code: data.coupon_code?.trim().toUpperCase() || null,
  };
  offers.push(row);
  return row;
}

function update(id, data) {
  const idx = offers.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  const patch = { ...data };
  if ('coupon_code' in patch) {
    patch.coupon_code = patch.coupon_code?.trim().toUpperCase() || null;
  }
  offers[idx] = { ...offers[idx], ...patch };
  return offers[idx];
}

function remove(id) {
  const idx = offers.findIndex((o) => o.id === id);
  if (idx === -1) return false;
  offers.splice(idx, 1);
  return true;
}

module.exports = {
  init,
  isLive,
  listAll,
  listActive,
  findById,
  couponTaken,
  create,
  update,
  remove,
};
