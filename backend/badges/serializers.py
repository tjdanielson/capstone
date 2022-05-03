from rest_framework import serializers
from .models import Badge

class BadgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Badge
        fields = ['id', 'description', 'cleanup_prereq', 'locked_image', 'unlocked_image']