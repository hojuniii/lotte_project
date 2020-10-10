from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'home.html')

def place(request):
    return render(request,'place.html')
def members(request):
    return render(request,'members.html')