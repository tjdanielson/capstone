from rest_framework import serializers
from .models import Goal
from authentication.models import User
class GoalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Goal
        fields = ['id', 'modified_date', 'goal', 'user_id']
        depth = 1