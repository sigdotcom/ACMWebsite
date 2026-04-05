from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField

class Sig(models.Model):
    # ObjectIdAutoField maps to MongoDB's native _id field
    # MongoDB generates this automatically — it's a unique 12-byte identifier
    # used to look up this specific sig document in the database
    id = ObjectIdAutoField(primary_key=True)

    name = models.CharField(max_length=100)

    # slug is a URL-friendly version of the name, e.g. "ACM Security" → "security"
    # Used in API filters like /api/events/?sig=security
    # unique=True ensures no two sigs share the same slug
    slug = models.SlugField(unique=True)

    description = models.TextField()
    meeting_time = models.CharField(max_length=100, blank=True)

    # ImageField handles the full upload lifecycle:
    # 1. Receives the file from a form or API request
    # 2. Sends it to Cloudflare R2 via django-storages
    # 3. Stores only the file path string in MongoDB (e.g. "uploads/sigs/acm-logo.jpg")
    # upload_to= sets the subfolder inside the bucket for this model's images
    # blank=True means a sig can exist without an image
    image = models.ImageField(upload_to='sigs/', blank=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    id = ObjectIdAutoField(primary_key=True)

    # ForeignKey creates a relationship between Event and Sig
    # Each event can belong to one sig (e.g. a Security event belongs to the Security sig)
    # null=True, blank=True allows general ACM events that don't belong to any specific sig
    # on_delete=CASCADE means if a sig is deleted, all its events are deleted too
    sig = models.ForeignKey(Sig, on_delete=models.CASCADE, null=True, blank=True)

    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()

    # Same ImageField pattern as Sig — uploads go to the events/ subfolder in R2
    # MongoDB stores the path, Django reconstructs the full URL when accessed
    image = models.ImageField(upload_to='events/', blank=True)

    # FileField works identically to ImageField but accepts any file type
    # Used for PDFs like event slides or handouts
    # Uploads go to the attachments/ subfolder in R2
    attachment = models.FileField(upload_to='attachments/', blank=True)

    def __str__(self):
        return self.title