from time import timezone
from django.db import models
from authentication.models import User
from django.utils import timezone

# Create your models here.
class Cleanup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(default=timezone.now)
    date_cleanup = models.DateField(null=True, blank=False)
    before_img = models.ImageField(null=True, blank=True, upload_to="before_images/")
    after_img = models.ImageField(null=True, blank=True, upload_to="after_images/")
    street = models.CharField(max_length=300, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    zip = models.IntegerField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=7, null=True, blank=True)




