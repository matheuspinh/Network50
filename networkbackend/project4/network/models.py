from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    followers = models.ManyToManyField(
        'self', related_name='following', symmetrical=False, blank=True)

    def followers_number(self):
        return len(self.followers.all())

    def following_number(self):
        return len(self.following.all())

    def __str__(self):
        return self.username


class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    last_modified = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(
        User, related_name='liked_posts', blank=True)

    def likes_number(self):
        return len(self.likes.all())

    def __str__(self):
        return f'{self.author} said: {self.content}.'\
            f'{self.likes_number()} like{"s" if self.likes else ""}'

    def writter(self):
        return self.author.username
