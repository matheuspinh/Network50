from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from network.models import Post, User
from .serializers import PostSerializer, RegisterSerializer, UserSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, AllowAny, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly


class PostUserWritePermission(BasePermission):
    message = 'You must be the author of this post to edit it.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class ProfileUserPermission(BasePermission):
    message = 'You must be authenticated to follow someone.'


class PostList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pass


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pass


class UserList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pass


class UserDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pass


class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
