from django.shortcuts import render
# Create your views here.
from rest_framework import viewsets
from .models import SIG, Event
from api.serializers import SIGSerializer, EventSerializer

class SIGViewSet(viewsets.ModelViewSet):
   # Gives endpointts for all the sigs 
    queryset = SIG.objects.all()
    serializer_class = SIGSerializer

class EventViewSet(viewsets.ModelViewSet):
    #provides endpoints for the api/events/ endpoint
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = Event.objects.all()
        # Captures the 'sig' ID from the URL (e.g., /api/events/?sig=1)
        sig_id = self.request.query_params.get('sig')
        
        if sig_id:
            # Filters the events table where the related SIG's ID matches
            queryset = queryset.filter(sig__id=sig_id)
            
        return queryset