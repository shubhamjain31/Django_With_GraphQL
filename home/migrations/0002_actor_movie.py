# Generated by Django 4.0.6 on 2022-07-21 15:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateField(default=django.utils.timezone.now)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('created_at', models.DateField(default=django.utils.timezone.now)),
                ('actors', models.ManyToManyField(to='home.actor')),
            ],
            options={
                'ordering': ('title',),
            },
        ),
    ]