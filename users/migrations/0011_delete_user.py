# Generated by Django 4.2.6 on 2023-10-23 00:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_merge_20231022_1920'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
