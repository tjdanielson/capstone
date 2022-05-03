from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, UserBadgeSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import APIView
from rest_framework.response import Response
from badges.models import Badge
User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

class UserBadges(APIView, AllowAny):

    def get(self, request, user_id):
        users = User.objects.filter(id=user_id)
        serializer = UserBadgeSerializer(users, many=True)
        return Response(serializer.data)

    def patch(self, request, user_id, badge_id):
        user = User.objects.get(id=user_id)
        badge = Badge.objects.get(id=badge_id)
        user.badges.add(badge)
        serializer = UserBadgeSerializer(user)
        return Response(serializer.data)


