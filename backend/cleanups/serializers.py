from rest_framework import serializers
from .models import Cleanup
from authentication.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']

class CleanupSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Cleanup
        fields = ['id', 'date_submitted', 'date_cleanup', 'before_img', 'after_img', 'street', 'city', 'state', 'zip', 'latitude', 'longitude', 'user']