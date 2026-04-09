from rest_framework import serializers
from core.models import Sig, Event

class SigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sig
        fields = ['id', 'name', 'slug']


class EventSerializer(serializers.ModelSerializer):
    # SerializerMethodField lets us define a custom method to compute a field's value
    # We use this instead of a plain field because event.image stores only a relative
    # file path in MongoDB — we need to call event.image.url to get the full R2 URL
    image_url = serializers.SerializerMethodField()

    # Nesting SigSerializer here means the API response includes the full sig object
    # instead of just a raw MongoDB ObjectId
    # read_only=True means this field is only used for outgoing responses,
    # not for incoming data when creating or updating an event
    sig = SigSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'image_url', 'sig']

    def get_image_url(self, obj):
        # obj is the Event instance being serialized
        # obj.image is falsy if no image has been uploaded yet
        # obj.image.url asks django-storages to construct the full public URL
        # by combining AWS_S3_CUSTOM_DOMAIN with the stored file path
        # Example: "uploads/events/cybersec.jpg"
        # →        "https://pub-<hash>.r2.dev/uploads/events/cybersec.jpg"
        if obj.image:
            return obj.image.url
        return None