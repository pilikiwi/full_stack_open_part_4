const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      "title": "My test blog",
      "author": "Chih Wei Hsu",
      "url": "www.bloguriltest.com",
      "likes": 20,
    },
    {
      "title": "My 2nd test blog",
      "author": "Chih Wei Hsu",
      "url": "www.bloguril2test.com",
      "likes": 30,
    },
]

beforeEach(async ()=>{
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async ()=>{
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})

test('blogs are returned as json', async ()=>{
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)  
})

const addBlog = {
    "title": "My 3rd test blog",
    "author": "Chih Wei Hsu",
    "url": "www.bloguriltest3.com",
    "likes": 70
  
}

test('1 blog added', async () => {
  let blogObject = new Blog(addBlog)
  await blogObject.save()

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('My 3rd test blog')
})

afterAll(()=>{
    mongoose.connection.close()
})