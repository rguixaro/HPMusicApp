// @ts-nocheck
const request = require('supertest');
const express = require('express');
const { createApp } = require('../src/bin/app');
const { AlbumModel, AlbumInstance } = require('../src/models/album');
const { corsMiddleware } = require('../src/middlewares/cors');
const { createAlbumRouter } = require('../src/routes/album');

const app = createApp({ albumModel: AlbumModel });

describe('GET /api/v1/albums?artist=Elephanz', () => {
	it('should return resources', async () => {
		return request(app)
			.get('/api/v1/albums?artist=Elephanz')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty('success', true);
				expect(res.body).toHaveProperty('resources');
			});
	});

	it('should return error', async () => {
		return request(app)
			.get('/api/v1/albums')
			.expect('Content-Type', /json/)
			.expect(400)
			.then((res) => {
				expect(res.statusCode).toBe(400);
				expect(res.body).toHaveProperty('success', false);
			});
	});
});
