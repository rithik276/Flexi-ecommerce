from djoser.serializers import UserCreateSerializer
from accounts.models import User

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields=('id', 'email', 'username', 'password')