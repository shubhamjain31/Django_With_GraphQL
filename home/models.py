from django.db import models
from django.utils.timezone import now

# Create your models here.

class Author(models.Model):
    name            = models.CharField(max_length=100)
    biodata         = models.TextField()

    def __str__(self):
        return self.name


class Post(models.Model):
    title           = models.CharField(max_length=100)
    content         = models.TextField()
    created_at      = models.DateField(default=now)
    author          = models.ForeignKey(Author, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

#-----------------------------------------------------------------------------------------------------------------------------

class Actor(models.Model):
    name            = models.CharField(max_length=100)
    created_at      = models.DateField(default=now)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)

class Movie(models.Model):
    title           = models.CharField(max_length=100)
    actors          = models.ManyToManyField(Actor)
    year            = models.IntegerField()
    created_at      = models.DateField(default=now)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)