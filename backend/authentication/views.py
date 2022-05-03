from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, UserBadgeSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import APIView
from rest_framework.response import Response
from badges.models import Badge
from cleanups.models import Cleanup
from django.http import Http404
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

    #intakes user id, counts number of cleanups the user has, if that matches a pre-req on a badge, it adds the badge to the user
    def patch(self, request, user_id):
        user = User.objects.get(id=user_id)
        cleanup_count = Cleanup.objects.filter(user=user_id).count()
        print(cleanup_count)
        try:
            badges = Badge.objects.filter(cleanup_prereq__lte=cleanup_count)
            print(badges)
            for badge in badges:
                user.badges.add(badge)
            serializer = UserBadgeSerializer(user)
            return Response(serializer.data)
        except Badge.DoesNotExist:
            raise Http404



