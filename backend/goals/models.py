from django.db import models
from authentication.models import User

# Create your models here.
class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    modified_date = models.DateTimeField(auto_now=True)
    goal = models.IntegerField(default=5)