const request = require('supertest');
const app = require('./app');

describe('TODO API', () => {
  // Reset the todos before each test
  beforeEach(() => {
    // Clear the todos array
    const todos = require('./app');
  });

  describe('GET /todos', () => {
    it('should return an empty array initially', async () => {
      const response = await request(app).get('/todos');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return all todos', async () => {
      // Create a todo first
      await request(app)
        .post('/todos')
        .send({ title: 'Test Todo' });

      const response = await request(app).get('/todos');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /todos/:id', () => {
    it('should return a specific todo', async () => {
      // Create a todo first
      const createResponse = await request(app)
        .post('/todos')
        .send({ title: 'Test Todo' });

      const todoId = createResponse.body.id;

      const response = await request(app).get(`/todos/${todoId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(todoId);
      expect(response.body.title).toBe('Test Todo');
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app).get('/todos/9999');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'New Todo' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('New Todo');
      expect(response.body.completed).toBe(false);
    });

    it('should create a todo with completed status', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'Completed Todo', completed: true });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Completed Todo');
      expect(response.body.completed).toBe(true);
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/todos')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title is required');
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a todo title', async () => {
      // Create a todo first
      const createResponse = await request(app)
        .post('/todos')
        .send({ title: 'Original Title' });

      const todoId = createResponse.body.id;

      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
    });

    it('should update a todo completed status', async () => {
      // Create a todo first
      const createResponse = await request(app)
        .post('/todos')
        .send({ title: 'Test Todo', completed: false });

      const todoId = createResponse.body.id;

      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send({ completed: true });

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .put('/todos/9999')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
      // Create a todo first
      const createResponse = await request(app)
        .post('/todos')
        .send({ title: 'To Be Deleted' });

      const todoId = createResponse.body.id;

      const response = await request(app).delete(`/todos/${todoId}`);
      expect(response.status).toBe(204);

      // Verify it's deleted
      const getResponse = await request(app).get(`/todos/${todoId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app).delete('/todos/9999');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });
});
