const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://petstore.swagger.io/v2';

test.describe('Store Endpoints', () => {

  test('GET /store/inventory - Returns pet inventories by status', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/inventory`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(typeof body).toBe('object');
  });

  test('POST /store/order - Place an order for a pet', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/store/order`, {
      data: {
        id: 501,
        petId: 1001,
        quantity: 1,
        shipDate: '2025-01-01T00:00:00.000Z',
        status: 'placed',
        complete: false
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(501);
    expect(body.status).toBe('placed');
  });

  test('GET /store/order/{orderId} - Find purchase order by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/order/501`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(501);
  });

  test('GET /store/order/{orderId} - Returns 404 for invalid order ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/order/999999`);
    expect(response.status()).toBe(404);
  });

  test('DELETE /store/order/{orderId} - Delete purchase order by ID', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/store/order/501`);
    expect([200, 404]).toContain(response.status());
  });

});
