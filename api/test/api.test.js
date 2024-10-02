const request = require('supertest');
const app = require('../index'); // assuming your Express app is exported from index.js

describe('GET /products', function() {
    it('should return a list of products', function(done) {
        request(app)
            .get('/products')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (!('products' in res.body)) throw new Error("Missing products key");
            })
            .end(done);
    });
});
