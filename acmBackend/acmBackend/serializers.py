from rest_framework import serializers
from core.models import Sig, Officer, Event

#Serializer for Officer class
class OfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Officer
        fields = '__all__'

#Serializer for Sig class
class SigSerializer(serializers.ModelSerializer):
    officers = OfficerSerializer(many=True, read_only=True)
    class Meta:
        model = Sig
        fields = '__all__'

#Serializer for Event class
#Uses Slug to represent Sig so it can be easily accessed without needing id?
class EventSerializer(serializers.ModelSerializer):
    Sig = serializers.SlugRelatedField (
        slug_field = 'slug',
        queryset = Sig.objects.all(),
        allow_null = True,
        required = False
    )
    class Meta:
        model = Event
        fields = '__all__'