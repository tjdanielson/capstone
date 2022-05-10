from functools import partial
from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, UserBadgeSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import APIView
from rest_framework.response import Response
from badges.models import Badge
from cleanups.models import Cleanup
from django.http import Http404
from authentication.models import User
User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

class UserBadges(APIView, IsAuthenticated):

    def get(self, request, user_id):
        users = User.objects.filter(id=user_id)
        serializer = UserBadgeSerializer(users, many=True)
        return Response(serializer.data)

    #intakes user id, counts number of cleanups the user has, if that matches a pre-req on a badge, it adds the badge to the user
    def patch(self, request, user_id):
        print(request.user)
        user = User.objects.get(id=user_id)
        cleanup_count = Cleanup.objects.filter(user=user_id).count()
        print(cleanup_count)
        try:
            badges_to_add = Badge.objects.filter(cleanup_prereq__lte=cleanup_count)
            badges_to_remove = Badge.objects.filter(cleanup_prereq__gt=cleanup_count)
            for badge in badges_to_add:
                user.badges.add(badge)
            for badge in badges_to_remove:
                user.badges.remove(badge)
            serializer = UserBadgeSerializer(user)
            return Response(serializer.data)
        except Badge.DoesNotExist:
            raise Http404

class UserList(APIView, IsAuthenticated):

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserDetail(APIView, IsAuthenticated):

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def patch(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid() and request.user.is_staff:
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)




