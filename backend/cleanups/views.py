from rest_framework.decorators import APIView

from authentication.models import User
from .models import Cleanup
from .serializers import CleanupSerializer, UserSerializer, AddressSerializer
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

#gets all cleanups for a specific user
class CleanupUser(APIView, AllowAny):
    
    def get(self, request, pk):
        cleanups = Cleanup.objects.filter(user=pk)
        serializer = CleanupSerializer(cleanups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#gets all addresses that are not null (doesn't include other cleanupdata)
class AddressList(APIView, AllowAny):

    def get(self, request):
        addresses = Cleanup.objects.filter(latitude__isnull=False)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#gets all addresses that are not null for a specific user (doesn't include other cleanupdata)
class AddressDetail(APIView, AllowAny):
    def get(self, request, id):
        user_addresses = Cleanup.objects.filter(user=id)
        addresses = user_addresses.filter(latitude__isnull=False)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

