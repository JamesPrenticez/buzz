import request from 'supertest';
import { app } from '../server';
import { createHashedPassword } from '../utils';
import { User } from '@prisma/client';
import prisma from '../prisma';

describe('GET /api/users', () => {
  // Before running the test, let's add some dummy users to the database
  beforeAll(async () => {
    // Add some dummy users using Prisma
    // await prismaMock.user.createMany({
    //   data: [
    //     { email: 'User1' },
    //   ],
    // });

    // Create a hashed password
    const hashedPassword = await createHashedPassword("password123");

    await prisma.user.create({
      data: {
        email: "user1@test.com",
        password_hash: "asdfa",
      },
    });

    const users: User[] = await prisma.user.findMany();
    console.log(users)

    // await prismaMock.user.createMany({
    //   data: [
    //     { email: "user1@test.com", password_hash: hashedPassword },
    //     { email: "user2@test.com", password_hash: hashedPassword },
    //     { email: "user2@test.com", password_hash: hashedPassword },
    //   ],
    // });
  });

  // After running the test, let's clean up the database
  afterAll(async () => {
    // Clean up the database after the tests
    await prisma.user.deleteMany();
  });

  test('It should respond with status 200 and return all users', async () => {
    const response = await request(app).get('/api/admin/users');
    console.log(response.body)
    expect(response.statusCode).toBe(200);
    expect(response.body.data.users.length).toBe(2);
  });

  // test('It should respond with status 500 if an error occurs', async () => {
  //   // Mocking prisma.user.findMany() to throw an error
  //   prismaMock.user.findMany.mockRejectedValueOnce(new Error('Database error'));

  //   const response = await request(app).get('/api/users');
  //   expect(response.statusCode).toBe(500);
  //   expect(response.body.message).toBe('An error occurred while fetching users');
  // });
});
