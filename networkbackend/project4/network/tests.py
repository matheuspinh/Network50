from django.test import TestCase
from network.models import Post, User


class Test_Create_Post(TestCase):

    @classmethod
    def setUpTestData(cls):
        testuser3 = User.objects.create_user(
            username='testuser3', password='12345')
        testuser2 = User.objects.create_user(
            username='testuser2', password='abc123')
        testuser1 = User.objects.create_user(
            username='testuser1', password='testpassword')
        test_post = Post.objects.create(
            content='Post content', author=User(3))

    def test_post_content(self):
        post = Post.objects.get(id=1)
        author = f'{post.author}'
        content = f'{post.content}'
        likes = post.likes.all()
        self.assertEqual(author, 'testuser1')
        self.assertEqual(content, 'Post content')
        self.assertEqual(likes, [1, 2])


# REVISTING THIS LATER
