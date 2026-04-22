from django.test import TestCase
from models import Sig, Officer, Event

# Create your tests here.

class SigTestCase(TestCase):
    def setUp(self):
        Sig.objects.create(id="1234", name="test sig name 1")
        Sig.objects.create(id="5678", name="test sig name 2")

    def test_FetchSigNames(self):
        sig1 = Sig.objects.get("1234")
        sig2 = Sig.objects.get("5678")
        
        self.assertEqual(sig1.name, "test sig name 1")
        self.assertEqual(sig2.name, "test sig name 2")