/** @jest-environment node */
import request from 'supertest';
let app;

beforeAll(async () => {
  ({ default: app } = await import('../server.js'));
});

describe('Express endpoints', () => {
  test('GET /results returns 404 when no results', async () => {
    const res = await request(app).get('/results');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'No results available' });
  });

  test('POST /scan stores result and returns data', async () => {
    process.env.N8N_URL = 'http://mocked.url';
    process.env.N8N_API_KEY = 'secret';

    const responseData = { ok: true };
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(responseData)
    }));

    const res = await request(app).post('/scan').send({ domain: 'example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(responseData);

    const resultRes = await request(app).get('/results');
    expect(resultRes.statusCode).toBe(200);
    expect(resultRes.body).toEqual(responseData);

    fetch.mockRestore();
  });
});
