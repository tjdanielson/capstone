from django.db import models

# Create your models here.
class Badge(models.Model):
    description = models.CharField(max_length=300)
    cleanup_prereq = models.IntegerField()
    locked_image = models.ImageField()
    unlocked_image = models.ImageField()