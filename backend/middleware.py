"""Custom FastAPI middleware for request timing and performance monitoring."""
import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class ProcessTimeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        start_time = time.perf_counter()
        response = await call_next(request)
        process_time = time.perf_counter() - start_time
        response.headers["X-Process-Time-Seconds"] = f"{process_time:.4f}"
        response.headers["X-Powered-By"] = "Vanguard Combat Engine"
        return response
