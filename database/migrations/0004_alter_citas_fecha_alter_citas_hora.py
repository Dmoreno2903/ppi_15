# Generated by Django 4.2.6 on 2023-11-19 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0003_alter_citas_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='citas',
            name='fecha',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='citas',
            name='hora',
            field=models.CharField(max_length=50),
        ),
    ]
