from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Task


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'first_name', 'last_name')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class TaskSerializer(serializers.ModelSerializer):
    is_overdue = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = (
            'id', 'title', 'description', 'priority', 'status',
            'due_date', 'created_at', 'updated_at', 'is_overdue'
        )
        read_only_fields = ('id', 'created_at', 'updated_at', 'is_overdue')

    def get_is_overdue(self, obj):
        if obj.due_date and obj.status != 'completed':
            return obj.due_date < timezone.now().date()
        return False
