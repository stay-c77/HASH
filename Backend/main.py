import sys
from pathlib import Path

# Add the Backend directory to sys.path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.append(str(backend_dir))

# Now you can import FastAPI and other modules
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def react():
    return {'message': 'Hello World'}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {'message': f'Hello {name}!'}