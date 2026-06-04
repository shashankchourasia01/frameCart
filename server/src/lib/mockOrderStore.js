const { randomUUID } = require('crypto');

const orders = [];

function add(row) {
  const record = {
    id: randomUUID(),
    status: 'pending',
    discount_amount: 0,
    whatsapp_notified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...row,
  };
  orders.unshift(record);
  return record;
}

function list(filters = {}) {
  let result = [...orders];
  if (filters.status) {
    result = result.filter((o) => o.status === filters.status);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (o) =>
        o.order_number?.toLowerCase().includes(q) ||
        o.customer_phone?.includes(q) ||
        o.customer_name?.toLowerCase().includes(q)
    );
  }
  return result;
}

module.exports = { add, list };
