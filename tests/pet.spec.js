const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://petstore.swagger.io/v2';

test.describe('Pet Endpoints', () => {

  test('POST /pet - Add a new pet', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/pet`, {
      data: {
        id: 1001,
        name: 'Doggo',
        status: 'available',
        photoUrls: ['https://example.com/dog.jpg']
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Doggo');
    expect(body.status).toBe('available');
  });

  test('GET /pet/{petId} - Find pet by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/1001`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(1001);
  });

  test('PUT /pet - Update an existing pet', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/pet`, {
      data: {
        id: 1001,
        name: 'Doggo Updated',
        status: 'sold',
        photoUrls: ['https://example.com/dog.jpg']
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Doggo Updated');
    expect(body.status).toBe('sold');
  });

  test('GET /pet/findByStatus - Find pets by status: available', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/findByStatus`, {
      params: { status: 'available' }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    body.forEach(pet => expect(pet.status).toBe('available'));
  });

  test('GET /pet/findByStatus - Find pets by status: pending', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/findByStatus`, {
      params: { status: 'pending' }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('POST /pet/{petId} - Update pet with form data', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/pet/1001`, {
      form: {
        name: 'FormDoggo',
        status: 'pending'
      }
    });
    expect(response.status()).toBe(200);
  });

  test('DELETE /pet/{petId} - Delete a pet', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/pet/1001`, {
      headers: { api_key: 'special-key' }
    });
    expect([200, 404]).toContain(response.status());
  });

  test('GET /pet/{petId} - Returns 404 for deleted pet', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/1001`);
    expect(response.status()).toBe(404);
  });

});
