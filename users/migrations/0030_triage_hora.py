# Generated by Django 3.2.22 on 2023-10-23 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0029_auto_20231022_2248'),
    ]

    operations = [
        migrations.AddField(
            model_name='triage',
            name='hora',
            field=models.TimeField(default='00:00:00'),
            preserve_default=False,
        ),
    ]