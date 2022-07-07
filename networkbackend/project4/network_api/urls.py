#from django.urls import path
#from .views import BlacklistTokenView, PostList, PostDetail, UserCreate, UserList, UserDetail
from rest_framework.routers import DefaultRouter
from .views import PostList, UserList

app_name = 'network_api'

router = DefaultRouter()
router.register('user', UserList, basename='user')
router.register('posts', PostList, basename='post')
urlpatterns = router.urls


# urlpatterns = [
#    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
#    path('', PostList.as_view(), name='listcreate'),
#    path('user', UserList.as_view(), name='user'),
#    path('user/<int:pk>/', UserDetail.as_view(), name='user'),
#    path('user/register/', UserCreate.as_view(), name='user_create'),
#    path('user/logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
# ]
