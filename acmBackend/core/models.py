from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField

# Create your models here.

### Key/Legend
# v/ is a checkmark
# X is a problem
# TODO is To do
# TBD is to be determined
# R is for review
# P is in progress. Follow with - Your Name if your working on it
# these can be changed, just my notes for now

# sigs v/
#  name v/
#  logo v/ - "image"
#  meeting(s) v/
#    day of week - v/
#    time - clock v/
#    repition - once every X weeks v/
#    location v/
#  description v/
#  discord v/

# officer(s) R - table of officers associated with a sig
#  sig v/
#  name v/
#  position v/
#  image R - link for officer image
#  alumi? TBD

# events v/
#   sig v/
#   date v/ - clocktime + day
#   location v/
#   description v/
#   image v/
#   title v/

# Events json format
# {
#     "title": "string",             # v/
#     "month": "string",             # R
#     "day": "string",               # R
#     "date": "MM/DD/YYYY",          # R, v/
#     "time": "string",              # v/
#     "location": "string",          # v/
#     "contact": "string",           # v/
#     "description": "string",       # v/
#     "posterImage": "string",       # v/
#     "registrationLink": "string"   # v/
# }

# Enum for days of the week
class Weekday(models.TextChoices):
    SUNDAY = "SUNDAY", "Sunday"
    MONDAY = "MONDAY", "Monday"
    TUESDAY = "TUESDAY", "Tuesday"
    WEDNESDAY = "WEDNESDAY", "Wednesday"
    THURSDAY = "THURSDAY", "Thursday"
    FRIDAY = "FRIDAY", "Friday"
    SATURDAY = "SATURDAY", "Saturday"


def sig_image_path(instance, filename):
    # Generates: uploads/sigs/security/assets/filename.jpg
    return f'uploads/sigs/{instance.slug}/assets/{filename}'

def event_image_path(instance, filename):
    # General events (no sig) go to uploads/general/events/
    # Sig events go to uploads/sigs/security/events/
    if instance.sig:
        return f'uploads/sigs/{instance.sig.slug}/events/{filename}'
    return f'uploads/general/events/{filename}'

def attachment_path(instance, filename):
    # Sorts PDFs by sig if one exists, otherwise general
    if instance.sig:
        return f'uploads/attachments/{instance.sig.slug}/{filename}'
    return f'uploads/attachments/general/{filename}'


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
    meeting_time_start = models.CharField(max_length=100, blank=True)
    meeting_time_end = models.CharField(max_length=100, blank=True)
    meeting_day = models.CharField(max_length=11, choices=Weekday)
    # every_x_weeks = models.CharField(max_length=1, default=1)
    every_x_weeks = models.IntegerField(default=1)
    # maybe models.IntegerChoices(1, 2, 3, 4, default=1, max_length=1)
    meeting_location = models.CharField(max_length=100, blank=True)

    ## URLS (and similar)
    # *apparently* urlfield is CharField with url validation
    discord_url = models.URLField(max_length=200, blank=True)
    email = models.EmailField(max_length=100, blank=True)
    git_url = models.URLField(max_length=200, blank=True)
    #instragram/other socials? modify: discord_url = models.URLField(max_length=200, blank=True)



    # ImageField handles the full upload lifecycle:
    # 1. Receives the file from a form or API request
    # 2. Sends it to Cloudflare R2 via django-storages
    # 3. Stores only the file path string in MongoDB (e.g. "uploads/sigs/acm-logo.jpg")
    # upload_to= sets the subfolder inside the bucket for this model's images
    # blank=True means a sig can exist without an image
    image = models.ImageField(upload_to='sigs/', blank=True)

    def __str__(self):
        return self.name

class Officer(models.Model):
    id = ObjectIdAutoField(primary_key=True)

    sig = models.ForeignKey(Sig, related_name='officers', on_delete=models.CASCADE) # mostly gpted. Test functionality

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100, blank=True)
    #       probably not this     vvvvvvvvvvv
    image = models.ImageField(upload_to='officers/', blank=True)

    def __str__(self):
        return self.name

class Event(models.Model):
    id = ObjectIdAutoField(primary_key=True)

    # ForeignKey creates a relationship between Event and Sig
    # Each event can belong to one sig (e.g. a Security event belongs to the Security sig)
    # null=True, blank=True allows general ACM events that don't belong to any specific sig
    # on_delete=CASCADE means if a sig is deleted, all its events are deleted too
    sig = models.ForeignKey(Sig, on_delete=models.CASCADE, null=True, blank=True)

    url = models.URLField(max_length=100, blank=True)
    registrationLink = models.URLField(max_length=200, blank=True)
    contact = models.EmailField(max_length=100, blank=True)

    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=100, blank=True)


    # Same ImageField pattern as Sig — uploads go to the events/ subfolder in R2
    # MongoDB stores the path, Django reconstructs the full URL when accessed
    image = models.ImageField(upload_to='events/', blank=True)

    # FileField works identically to ImageField but accepts any file type
    # Used for PDFs like event slides or handouts
    # Uploads go to the attachments/ subfolder in R2
    attachment = models.FileField(upload_to='attachments/', blank=True)

    def __str__(self):
        return self.title
