#from .views import PostList, PostDetail, UserCreate, UserList, UserDetail
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostList, UserList, BlacklistTokenView, CreatePost, EditPost, AdminPostDetail, FollowView, FollowPosts, UserDetail

app_name = 'network_api'

router = DefaultRouter()
router.register('user', UserList, basename='user')
router.register('posts', PostList, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path('user/logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('post/create/', CreatePost.as_view(), name='createpost'),
    path('post/edit/postdetail/<int:pk>/',
         AdminPostDetail.as_view(), name='admindetailpost'),
    path('user/follow/<int:pk>/', FollowView.as_view(), name='follow'),
    path('user/id/<int:pk>/', UserDetail.as_view(), name='user'),
    path('user/follow/<int:pk>/<int:pk2>/',
         FollowView.as_view(), name='following'),
    path('user/follows/<int:pk>/posts/',
         FollowPosts.as_view(), name='followposts'),
]


# urlpatterns = [
#    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
#    path('', PostList.as_view(), name='listcreate'),
#    path('user', UserList.as_view(), name='user'),
#    path('user/<int:pk>/', UserDetail.as_view(), name='user'),
#    path('user/register/', UserCreate.as_view(), name='user_create'),
#    path('user/logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
# ]
