import argparse
import requests
from urllib3._collections import HTTPHeaderDict
from aiohttp import web
import asyncio
import json

#Create the web app
routes = web.RouteTableDef()

url = "http://dbresolver:1337/camera/"

@routes.post('/camera/update')
async def update(request):
    return await send_request("update", await request.json(), requests.post)

@routes.get('/camera/get')
async def get(request):
    return await send_request("get", await request.json(),requests.get)

@routes.delete('/camera/delete')
async def delete(request):
    return await send_request("delete", await request.json(), requests.delete)

@routes.post('/camera/create')
async def signup(request):
    return await send_request("signup", await request.json(), requests.post)

@routes.get('/camera/userlist')
async def users(request):
    return await send_request("userlist", await request.json(), requests.get)

@routes.get('/camera/adminlist')
async def users(request):
    return await send_request("adminlist", '{}', requests.get)

async def send_request(path, json, query_function):
    response = query_function(url + path,headers={'Content-type': 'application/json'}, json=(json))
    return web.Response(text=response.text, status=response.status_code)

app = web.Application()

app.add_routes(routes)

web.run_app(app, host='0.0.0.0', port=1340)
