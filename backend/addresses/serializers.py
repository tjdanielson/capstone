from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'state', 'zip', 'latitude', 'longitude', 'cleanup_id']

    cleanup_id = serializers.IntegerField(write_only=True)