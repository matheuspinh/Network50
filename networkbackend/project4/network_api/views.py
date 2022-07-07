from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from network.models import Post, User
from .serializers import PostSerializer, RegisterSerializer, UserSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, AllowAny, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework_simplejwt.tokens import RefreshToken


class PostUserWritePermission(BasePermission):
    message = 'You must be the author of this post to edit it.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.username == request.user


class ProfileUserPermission(BasePermission):
    message = 'You must be authenticated to follow someone.'


class PostList(viewsets.ModelViewSet):
    permission_classes = [PostUserWritePermission]
    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, id=item)

    # Custom Queryset
    def get_queryset(self):
        return Post.objects.all()


class UserList(viewsets.ModelViewSet):
    permission_classes = [PostUserWritePermission]
    serializer_class = UserSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(User, username=item)

    def get_queryset(self):
        return User.objects.all()

# class UserList(generics.ListCreateAPIView):
#    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#    queryset = User.objects.all()
#    serializer_class = UserSerializer
#    pass

# class PostList(viewsets.ViewSet):
#     permission_classes = [AllowAny]
#     queryset = Post.objects.all()

#     def list(self, request):
#         serializer_class = PostSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)

#     def retrieve(self, request, pk=None):
#         post = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = PostSerializer(post)
#         return Response(serializer_class.data)

# class PostList(generics.ListCreateAPIView):
#    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#    queryset = Post.objects.all()
#    serializer_class = PostSerializer
#    pass

# class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
#    permission_classes = [PostUserWritePermission]
#    queryset = Post.objects.all()
#    serializer_class = PostSerializer
#    pass

# class UserDetail(generics.RetrieveDestroyAPIView):
#    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#    queryset = User.objects.all()
#    serializer_class = UserSerializer
#    pass


class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
