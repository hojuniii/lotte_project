from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from api.models import Box, Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from PIL import Image

# Create your views here.
def home(request):
    return render(request,'home.html')

def place(request):
    return render(request,'place.html')

def members(request,place):
    profiles = Profile.objects.filter(service_place=place).order_by('nickname')
    return render(request,'members.html',{'profiles':profiles})

def members_search(request):
    data = request.POST.get('data')
    profiles = Profile.objects.filter(nickname__icontains=data).order_by('nickname')
    return render(request,'membersearch.html',{'profiles':profiles})

def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            print("인증성공")
            login(request, user)
            return redirect('home')
        else :
            return HttpResponse("로그인 실패. 다시 시도해보세요")
    return render(request,'signin.html')

def signup(request):
    if request.method=="POST":
        print(request.POST)
        username= request.POST["username"]
        password= request.POST["password"]
        user = User.objects.create_user(username,"",password)
        profile = get_object_or_404(Profile,user_pk=user.id)

        # fileName = user.id + '_profile.png'
        
        profile.user = user
        profile.nickname =request.POST['nickname']
  
        # image.save(str(user.id) + '_profile.png')
        if 'profile_image' not in request.FILES:
            pass
        else:
            profile.profile_image =request.FILES['profile_image']
        profile.service_place=request.POST['service_place']
        profile.user_pk=user.id

        user.save()
       
        login(request, user)
        return redirect("home")
    return render(request, 'signup.html')

@login_required
def mypage(request):
    profile = get_object_or_404(Profile,user = request.user)
    Boxes = Box.objects.filter(user=request.user).order_by('-id')
    return render(request,'mypage.html',{'Boxes':Boxes,'profile':profile})

def setprofile(request):
    profile = get_object_or_404(Profile,user = request.user)
    return render(request,'updateprofile.html',{'profile':profile})

def saveprofile(request):
    if request.method == "POST":
        profile = get_object_or_404(Profile,user = request.user)
        profile.nickname = request.POST['nickname']
        profile.service_place=request.POST['service_place']
        if 'profile_image' not in request.FILES:
            profile.save()
        else:
            profile.profile_image =request.FILES['profile_image']
            profile.save()
    return redirect("mypage")

def logout_view(request):
    logout(request)
    return redirect('home')