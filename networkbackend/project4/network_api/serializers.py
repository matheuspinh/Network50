from rest_framework import serializers
from network.models import Post, User


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'content',
                  'last_modified', 'likes', 'likes_number', 'writter')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'followers')
