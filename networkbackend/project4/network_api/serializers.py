from rest_framework import serializers
from network.models import Post, User


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'likes_line',
                  'last_modified', 'likes', 'likes_number', 'author_name', 'content', 'edited')


class UserSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'followers', 'following',
                  'followers_number', 'following_number', 'password', 'email', 'posts')

    # def create(self, validated_data):
    #     userposts_data = validated_data.pop('user_posts')
    #     user = User.objects.create(**validated_data)
    #     for user_posts_data in user_posts_data:
    #         Post.objects.create(author=User, **userposts_data)
    #     return user


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
