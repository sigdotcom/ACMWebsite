from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SigViewSet, EventViewSet, EventImageUploadView

# DefaultRouter automatically generates standard REST routes for each ViewSet
# Registering EventViewSet under 'events' produces:
#   GET  /api/events/         → list all events
#   GET  /api/events/{id}/    → retrieve one event by ID
router = DefaultRouter()
router.register(r'sigs', SigViewSet, basename='sig')
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    # Include all router-generated routes under /api/
    path('', include(router.urls)),

    # Separate manual route for image uploads
    # This sits outside the router because it's a custom action
    # that doesn't fit the standard list/retrieve/update pattern
    # <str:pk> captures the event's MongoDB ObjectId from the URL
    path('events/<str:pk>/upload-image/', EventImageUploadView.as_view()),
]