# Generated by Django 4.0.4 on 2022-05-03 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('badges', '0002_remove_badge_user'),
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='badges',
            field=models.ManyToManyField(to='badges.badge'),
        ),
    ]
