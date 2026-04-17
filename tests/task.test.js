const request = require("supertest");
const app = require("../src/app");

describe("TASK API TESTS", () => {

  // ✅ POST
  describe("POST /tasks", () => {
    it("should create a task", async () => {
      const res = await request(app)
        .post("/tasks")
        .send({ title: "Test task" });

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe("Test task");
      expect(res.body.id).toBeDefined();
    });

    it("should fail if title is missing", async () => {
      const res = await request(app)
        .post("/tasks")
        .send({});

      expect(res.statusCode).toBe(400);
    });

    it("should fail if title is empty", async () => {
      const res = await request(app)
        .post("/tasks")
        .send({ title: "" });

      expect(res.statusCode).toBe(400);
    });
  });

  // ✅ GET
  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      const res = await request(app).get("/tasks");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // 🐛 Extra field
  describe("POST /tasks with extra field", () => {
    it("should handle unexpected fields", async () => {
      const res = await request(app)
        .post("/tasks")
        .send({ title: "Test", random: "abc" });

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe("Test");
    });
  });

  // ✅ PATCH COMPLETE
  describe("PATCH /tasks/:id/complete", () => {
    it("should mark task as completed", async () => {
      const create = await request(app)
        .post("/tasks")
        .send({ title: "Task to complete" });

      const id = create.body.id;

      const res = await request(app)
        .patch(`/tasks/${id}/complete`);

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("done");
      expect(res.body.completedAt).not.toBeNull();
    });
  });

  // ✅ DELETE
  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      const create = await request(app)
        .post("/tasks")
        .send({ title: "Delete me" });

      const id = create.body.id;

      const res = await request(app).delete(`/tasks/${id}`);
      expect(res.statusCode).toBe(204);

      // 🔍 verify deletion
      const get = await request(app).get("/tasks");
      const exists = get.body.find(t => t.id === id);

      expect(exists).toBeUndefined();
    });
  });

  // ✅ PUT (update task)
  describe("PUT /tasks/:id", () => {
    it("should update a task", async () => {
      const create = await request(app)
        .post("/tasks")
        .send({ title: "Old title" });

      const id = create.body.id;

      const res = await request(app)
        .put(`/tasks/${id}`)
        .send({ title: "Updated title" });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Updated title");
    });
  });

});