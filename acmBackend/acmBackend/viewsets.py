from rest_framework import viewsets
from core.models import Sig, Officer, Event
from acmBackend.serializers import SigSerializer, OfficerSerializer, EventSerializer

#Viewset for the Sig class
class SigViewSet(viewsets.ModelViewSet):
    queryset = Sig.objects.all()
    serializer_class = SigSerializer

#Viewset for the Officer class
class OfficerViewSet(viewsets.ModelViewSet):
    queryset = Officer.objects.all()
    serializer_class = OfficerSerializer

#Viewset for the Event class
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer