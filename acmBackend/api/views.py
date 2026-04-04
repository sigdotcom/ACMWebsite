from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from core.models import Event
from .serializers import EventSerializer

class EventImageUploadView(APIView):
    # MultiPartParser handles multipart/form-data requests
    # This is the format browsers use when submitting a form that includes a file
    # FormParser handles regular form fields alongside the file
    # Both are needed together for file upload endpoints
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, pk=None):
        # PATCH is used instead of PUT because we're only updating one field
        # (the image) rather than replacing the entire event object
        # pk is the MongoDB ObjectId of the event passed in the URL
        # e.g. PATCH /api/events/64f1a2b3c4d5e6f7a8b9c0d1/upload-image/
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            # Return a clear error if the event ID doesn't match any document
            return Response(
                {'error': 'Event not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # request.FILES is a dictionary of all files included in the request
        # We look for a file submitted under the key "image"
        # If the frontend sends a file input named "image", it shows up here
        file = request.FILES.get('image')
        if not file:
            return Response(
                {'error': 'No image provided.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Assigning the file to event.image triggers django-storages automatically
        # django-storages uploads the file to Cloudflare R2 in the background
        # MongoDB then stores only the file path string, not the binary file data
        event.image = file
        event.save()

        # Return the full public R2 URL so the frontend can immediately
        # display or confirm the uploaded image without making another request
        return Response(
            {'image_url': event.image.url},
            status=status.HTTP_200_OK
        )