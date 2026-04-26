from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """Allow read to anyone, write only to the object owner."""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        owner = getattr(obj, 'user_id', None) or getattr(obj, 'id', None)
        return owner == request.user


class IsOwner(BasePermission):
    """Allow access only to the object owner."""

    def has_object_permission(self, request, view, obj):
        owner = getattr(obj, 'user_id', None) or getattr(obj, 'id', None)
        return owner == request.user
