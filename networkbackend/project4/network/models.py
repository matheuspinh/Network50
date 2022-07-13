from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    followers = models.ManyToManyField(
        'self', related_name='following', symmetrical=False, blank=True)

    def followings(self):
        return self.following.all()

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

    class Meta:
        ordering = ['-last_modified', ]

    def likes_number(self):
        return len(self.likes.all())

    def likes_line(self):
        return f'{self.likes_number()} like{"s" if self.likes_number() != 1 else ""}'

    def edited(self):
        return self.last_modified.strftime('%b %d, %I:%M %p')

    def author_name(self):
        return self.author.username
