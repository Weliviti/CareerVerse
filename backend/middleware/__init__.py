"""
Middleware package for CareerVerse backend.

This package contains middleware functions for request processing,
authentication, and authorization.
"""

from .auth import verify_token

__all__ = ["verify_token"]
