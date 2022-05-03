from time import timezone
from django.db import models
from authentication.models import User
from django.utils import timezone

# Create your models here.
class Cleanup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(default=timezone.now)
    date_cleanup = models.DateField(null=True, blank=False)
    before_img = models.ImageField(null=True)
    after_img = models.ImageField(null=True)




