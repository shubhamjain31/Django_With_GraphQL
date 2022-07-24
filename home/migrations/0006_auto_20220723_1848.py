# Generated by Django 3.1.4 on 2022-07-23 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_auto_20220723_1243'),
    ]

    operations = [
        migrations.AddField(
            model_name='actor',
            name='ip_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='author',
            name='ip_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='movie',
            name='ip_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='ip_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
