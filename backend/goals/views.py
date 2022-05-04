from .models import Goal
from .serializers import GoalSerializer
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import APIView

# Create your views here.
class GoalList(APIView, AllowAny):

    def get(self, request):
        goals = Goal.objects.all()
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoalDetail(APIView, IsAuthenticated):

    def get_object(self, pk):
        try:
            return Goal.objects.get(pk=pk)
        except Goal.DoesNotExist:
            raise Http404

    def delete(self, request, id):
        goal = self.get_object(id)
        goal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id):
        goal = self.get_object(id)
        serializer = GoalSerializer(goal, data=request.data)
        if serializer.is_valid() and request.user == goal.user:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserGoal(APIView, IsAuthenticated):

    def get(self, request, id):
        goals = Goal.objects.filter(user=id).order_by('-modified_date')[:1]
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



