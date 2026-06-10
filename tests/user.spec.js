const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://petstore.swagger.io/v2';

const testUser = {
  id: 9001,
  username: 'testuser_william',
  firstName: 'William',
  lastName: 'Tester',
  email: 'william@test.com',
  password: 'securepass123',
  phone: '5555555555',
  userStatus: 1
};

test.describe('User Endpoints', () => {

  test('POST /user - Create user', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/user`, {
      data: testUser
    });
    expect(response.status()).toBe(200);
  });

  test('GET /user/{username} - Get user by username', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/${testUser.username}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.username).toBe(testUser.username);
    expect(body.email).toBe(testUser.email);
  });

  test('GET /user/login - Log user into the system', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/login`, {
      params: {
        username: testUser.username,
        password: testUser.password
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(typeof body.message).toBe('string');
  });

  test('PUT /user/{username} - Update user', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/user/${testUser.username}`, {
      data: {
        ...testUser,
        firstName: 'UpdatedWilliam',
        email: 'updated@test.com'
      }
    });
    expect(response.status()).toBe(200);
  });

  test('GET /user/logout - Log out current user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/logout`);
    expect(response.status()).toBe(200);
  });

  test('DELETE /user/{username} - Delete user', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/user/${testUser.username}`);
    expect([200, 404]).toContain(response.status());
  });

  test('GET /user/{username} - Returns 404 for deleted user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/${testUser.username}`);
    expect(response.status()).toBe(404);
  });

});
