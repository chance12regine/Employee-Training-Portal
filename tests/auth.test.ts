import { describe, it, expect } from 'vitest';

describe('Authentication System', () => {
  const BASE_URL = 'http://localhost:3000';
  let sessionToken: string;

  it('should register a new user', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        department: 'IT',
        position: 'Developer',
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.message).toBe('User registered successfully');
  });

  it('should sign in a user', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.token).toBeDefined();
    sessionToken = data.token;
  });

  it('should get user profile', async () => {
    const response = await fetch(`${BASE_URL}/api/user/profile`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.profile).toBeDefined();
    expect(data.profile.email).toBe('test@example.com');
  });

  it('should update user profile', async () => {
    const response = await fetch(`${BASE_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Updated Test User',
        department: 'Updated IT',
        position: 'Senior Developer',
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.profile.name).toBe('Updated Test User');
    expect(data.profile.department).toBe('Updated IT');
    expect(data.profile.position).toBe('Senior Developer');
  });
}); 