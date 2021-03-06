from time import timezone
from django.db import models
from authentication.models import User
from django.utils import timezone

# Create your models here.
class Cleanup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(default=timezone.now)
    date_cleanup = models.DateField(null=True, blank=False)
    time_spent = models.IntegerField(default=0)
    before_img = models.ImageField(null=True, blank=True)
    after_img = models.ImageField(null=True, blank=True)
    street = models.CharField(max_length=300, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    zip = models.IntegerField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)




