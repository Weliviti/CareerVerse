"""
Standardized API response utilities for CareerVerse backend.

This module provides consistent response formatting across all API endpoints
and global exception handling for the FastAPI application.
"""

from typing import Any, Optional
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class APIResponse(BaseModel):
    """
    Generic API response model for standardized responses.
    
    Attributes:
        success: Boolean indicating if the request was successful
        message: Human-readable message describing the response
        data: Optional payload data (only present on success)
        error: Optional error details (only present on failure)
    """
    success: bool
    message: str
    data: Optional[Any] = None
    error: Optional[str] = None


def success_response(data: Any = None, message: str = "Success") -> JSONResponse:
    """
    Create a standardized success response.
    
    Args:
        data: The response payload data (default: None)
        message: Success message (default: "Success")
        
    Returns:
        JSONResponse with status 200 and standardized format
        
    Example:
        >>> success_response({"user": "John"}, "User created")
        JSONResponse(status_code=200, content={
            "success": True,
            "message": "User created",
            "data": {"user": "John"},
            "error": None
        })
    """
    response = APIResponse(
        success=True,
        message=message,
        data=data,
        error=None
    )
    return JSONResponse(
        status_code=200,
        content=response.model_dump()
    )


def error_response(message: str, code: int = 400, error_details: Optional[str] = None) -> JSONResponse:
    """
    Create a standardized error response.
    
    Args:
        message: Error message describing what went wrong
        code: HTTP status code (default: 400 Bad Request)
        error_details: Optional detailed error information
        
    Returns:
        JSONResponse with specified status code and standardized error format
        
    Example:
        >>> error_response("User not found", 404)
        JSONResponse(status_code=404, content={
            "success": False,
            "message": "User not found",
            "data": None,
            "error": None
        })
    """
    response = APIResponse(
        success=False,
        message=message,
        data=None,
        error=error_details if error_details else message
    )
    return JSONResponse(
        status_code=code,
        content=response.model_dump()
    )


def setup_exception_handlers(app: FastAPI) -> None:
    """
    Setup global exception handlers for the FastAPI application.
    
    This function registers exception handlers to catch unhandled exceptions
    and return them in our standardized error format.
    
    Args:
        app: The FastAPI application instance
        
    Usage:
        >>> from fastapi import FastAPI
        >>> app = FastAPI()
        >>> setup_exception_handlers(app)
    """
    
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        """
        Global exception handler for all unhandled exceptions.
        
        Catches any unhandled exception and returns it in standardized format.
        In production, this prevents exposing internal error details to users.
        """
        # Log the exception for debugging (in production, use proper logging)
        print(f"Unhandled exception: {type(exc).__name__}: {str(exc)}")
        
        return error_response(
            message="An internal server error occurred",
            code=500,
            error_details=str(exc)
        )
    
    @app.exception_handler(ValueError)
    async def value_error_handler(request: Request, exc: ValueError) -> JSONResponse:
        """Handle ValueError exceptions with 400 Bad Request."""
        return error_response(
            message="Invalid value provided",
            code=400,
            error_details=str(exc)
        )
    
    @app.exception_handler(404)
    async def not_found_handler(request: Request, exc: Exception) -> JSONResponse:
        """Handle 404 Not Found errors."""
        return error_response(
            message="Resource not found",
            code=404,
            error_details=str(exc)
        )
