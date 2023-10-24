# Generated by Django 4.2.6 on 2023-10-24 02:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Eps',
            fields=[
                ('codigo', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nit', models.CharField(max_length=15)),
                ('regimen', models.CharField(max_length=20)),
                ('entidad', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Ips',
            fields=[
                ('codigo', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nombre_prestador', models.CharField(max_length=250)),
                ('nit', models.CharField(max_length=15)),
                ('naturaleza', models.CharField(max_length=15)),
                ('direccion', models.CharField(max_length=10)),
                ('email', models.CharField(max_length=30)),
                ('telefono', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('cedula', models.CharField(max_length=10, unique=True)),
                ('genero', models.CharField(max_length=20)),
                ('usuario', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=20)),
                ('eps', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.eps')),
            ],
        ),
        migrations.CreateModel(
            name='Triaje',
            fields=[
                ('codigo', models.AutoField(primary_key=True, serialize=False)),
                ('respiratoria', models.BooleanField(default=False)),
                ('traumatismos', models.BooleanField(default=False)),
                ('quemaduras', models.BooleanField(default=False)),
                ('perdida', models.BooleanField(default=False)),
                ('hemorragia', models.BooleanField(default=False)),
                ('trabajo_parto', models.BooleanField(default=False)),
                ('abuso_sexual', models.BooleanField(default=False)),
                ('signos_vitales', models.BooleanField(default=False)),
                ('convulsivo', models.BooleanField(default=False)),
                ('deficiencia_respiratoria', models.BooleanField(default=False)),
                ('crisis_hipertensiva', models.BooleanField(default=False)),
                ('fiebre', models.BooleanField(default=False)),
                ('vertigo', models.BooleanField(default=False)),
                ('respiratoria_leve', models.BooleanField(default=False)),
                ('tos_congestion', models.BooleanField(default=False)),
                ('dolor_cabeza_cronico', models.BooleanField(default=False)),
                ('triage_calculado', models.CharField(default=0, max_length=1)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='PerfilUsuario',
            fields=[
                ('codigo', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('telefono', models.CharField(blank=True, max_length=10)),
                ('contacto_emergencia', models.CharField(max_length=50)),
                ('telefono_emergencia', models.CharField(max_length=10)),
                ('direccion', models.CharField(blank=True, max_length=50)),
                ('acceso_ubicacion', models.BooleanField(default=False)),
                ('alergias', models.TextField(blank=True)),
                ('medicamentos', models.TextField(blank=True)),
                ('RH', models.CharField(max_length=5)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
    ]
