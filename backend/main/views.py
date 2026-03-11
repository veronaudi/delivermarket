from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse

from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserProfile, Category, Dish
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    CategorySerializer,
    DishSerializer,
    RegisterSerializer
)


def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "service": "Food Delivery API"
    })


def index(request):
    return JsonResponse({
        "message": "Food Delivery API",
        "endpoints": {
            "api/categories/": "List of categories",
            "api/dishes/": "List of dishes",
            "api/profile/": "User profile",
            "api/register/": "Register user",
            "api/login/": "Login user"
        }
    })


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class DishViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "Profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)

            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }
            })

        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)