from rest_framework.decorators import APIView
from .models import Cleanup
from .serializers import CleanupSerializer, UserSerializer
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class CleanupList(APIView, AllowAny):

    def get(self, request):
        cleanups = Cleanup.objects.all()
        serializer = CleanupSerializer(cleanups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CleanupSerializer(data=request.data)
        print(request.user)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CleanupDetail(APIView, IsAuthenticated):
    def get_object(self, pk):
        try:
            return Cleanup.objects.get(pk=pk)
        except Cleanup.DoesNotExist:
            raise Http404
    
    def delete(self, request, pk):
        cleanup = self.get_object(pk)
        cleanup.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        cleanup = self.get_object(pk)
        serializer = CleanupSerializer(cleanup, data=request.data)
        if serializer.is_valid() and request.user == cleanup.user:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
