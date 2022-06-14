from rest_framework import serializers
from network.models import Post, User


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'likes_line',
                  'last_modified', 'likes', 'likes_number', 'author_name', 'content', 'edited')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'followers',
                  'followers_number', 'following_number', 'password')
