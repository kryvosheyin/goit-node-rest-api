import app from "../app.js";
import request from "supertest";
import sequelize from "../db/Sequelize.js";
import User from "../db/models/User.js";

const PORT = process.env.PORT || 3000;

const userData = {
  email: "test.user@email.com",
  password: "newpasseowsdfs",
  subscription: "pro",
};

describe("test api/auth/login", () => {
  beforeAll(async () => {
    await request(app).post("/api/auth/register").send(userData);
    console.log("Test user succesfully registered");
  });
  afterAll(async () => {
    await User.destroy({ where: { email: userData.email } });
    console.log("Test user successfully destroyed");
    await sequelize.close();
  });

  test("Sign in with correct data", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });
    expect(status).toBe(200);
    expect(body.user.email).toBe(userData.email);
    expect(body.user.subscription).toBe(userData.subscription);
    expect(body.token).toBeTruthy();
  });

  test("Sign in with incorrect password", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: "wrongPassword" });
    expect(status).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });

  test("Sign in with incorrect email", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send({ email: "not.existing@email.com", password: userData.password });
    expect(status).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });

  test("Sign in with invalid email format", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send({ email: "test @email.com", password: userData.password });
    expect(status).toBe(400);
    expect(body.message).toBe(
      `"email\" with value \"test @email.com\" fails to match the required pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`
    );
  });

  test("Sign in with missing email field", async () => {
    const { status, body } = await request(app).post("/api/auth/login").send({
      password: userData.password,
    });
    expect(status).toBe(400);
    expect(body.message).toBe(`"email\" is required`);
  });

  test("Sign in with missing password field", async () => {
    const { status, body } = await request(app).post("/api/auth/login").send({
      email: userData.email,
    });
    expect(status).toBe(400);
    expect(body.message).toBe(`"password\" is required`);
  });

  test("Sign in with unexpected properties sent", async () => {
    const { status, body } = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
      subscription: "pro",
    });
    expect(status).toBe(400);
    expect(body.message).toBe(`"subscription\" is not allowed`);
  });
});
