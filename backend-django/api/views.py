from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, NoteSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate

from django.contrib.auth.models import User
from .models import Note

# Auth
class LoginUserView(generics.GenericAPIView):
  serializer_class = UserSerializer

  def post(self, request, *args, **kwargs):
    # Authenticate user
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user:
      # Generate refresh and access tokens
      refresh = RefreshToken.for_user(user)
      return Response({
          'refresh': str(refresh),
          'access': str(refresh.access_token),
          'user': UserSerializer(user).data
      }, status=status.HTTP_200_OK)
    else:
      return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

  def get_serializer(self, *args, **kwargs):
      return self.serializer_class(*args, **kwargs)

  def get_permissions(self):
      if self.request.method == 'POST':
          return [permissions.AllowAny()]
      return [permissions.IsAuthenticated()]

# User
class UserListView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

# Notes
class NoteListCreate(generics.ListCreateAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user)
  
  def preform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(author=self.request.user)
    else:
      print(serializer.error)

class NoteDelete(generics.DestroyAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user)