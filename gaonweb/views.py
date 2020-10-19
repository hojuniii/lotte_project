from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from api.models import Box, Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from PIL import Image
errorname = ""
# Create your views here.
def home(request):
    return render(request,'home.html')

def place(request):
    return render(request,'place.html')

def members(request):
    # profiles = Profile.objects.filter().order_by('nickname')
    profiles = Profile.objects
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
            global errorname
            errorname = "loginerror"
            return render(request,'error.html',{'errorname':errorname})
    return render(request,'signin.html')

def signup(request):
    if request.method=="POST":
        username= request.POST["username"]
        password= request.POST["password"]
        uservalid = User.objects.filter(username__icontains=username)
        valid = True
        for i in uservalid:
            if i.username == username:
                valid=False
        if valid == True:
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
        else :
            global errorname
            errorname = "signuperror"
            return render(request,'error.html',{'errorname':errorname})

    return render(request, 'signup.html')

@login_required
def mypage(request):
    profile = get_object_or_404(Profile,user = request.user)
    Boxes = Box.objects.filter(user=request.user).order_by('-id')
    return render(request,'mypage.html',{'Boxes':Boxes,'profile':profile})

def setprofile(request):
    profile = get_object_or_404(Profile,user = request.user)
    Boxes = Box.objects.filter(user=request.user).order_by('-id')
    return render(request,'updateprofile.html',{'Boxes':Boxes,'profile':profile})

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