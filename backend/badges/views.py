from rest_framework.decorators import APIView
from cleanups.serializers import CleanupSerializer
from .models import Badge
from .serializers import BadgeSerializer
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class BadgeList(APIView, AllowAny):

    def get(self, request):
        badges = Badge.objects.all()
        serializer = BadgeSerializer(badges, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = BadgeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BadgeDetail(APIView, IsAuthenticated):

    def get_object(self, pk):
        try:
            return Badge.objects.get(pk=pk)
        except Badge.DoesNotExist:
            raise Http404

    def delete(self, request, pk):
        badge = self.get_object(pk)
        if request.user.is_staff ==1:
            badge.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk):
        badge = self.get_object(pk)
        serializer = BadgeSerializer(badge, data=request.data, partial=True)
        if serializer.is_valid() and request.user.is_staff == 1:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

