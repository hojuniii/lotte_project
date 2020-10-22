from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from api.models import Box, Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from PIL import Image
from datetime import datetime
import qrcode
import random
errorname = ""
place_key = 0
year = datetime.today().year+1
place_value= {
    0:"all",
    1:"서울 강남구 신사동 래미안",
    2:"서울 강남구 압구정동 어울림",
    3:"서울 강남구 대치동 더샵",    
    4:"서울 강남구 논현동 신도브레뉴",
    5:"서울 강남구 일원동 중앙하이츠빌",
    6:"서울 송파구 오륜동 미지엔",
    7:"서울 송파구 잠실2동 좋은집",
    8:"서울 송파구 송파1동 꿈에그린",
    9:"서울 강동구 천호1동 SKview",
    10:"서울 강동구 강일동 Xi",
    11:"서울 강동구 상일동 몰라",
    12:"서울 강동구 암사2동 현진에버빌",
    13:"서울 노원구 공릉1동 e편한세상",
    14:"서울 노원구 상계1동 미소지음",
    15:"서울 노원구 상계3.4동 래미안",
    16:"서울 노원구 하계1동 중앙하이츠빌",
    17:"서울 용산구 남영동 경남아너스빌",
    18:"서울 용산구 용문동 꿈에그린",
    19:"서울 용산구 이촌1동 아이파크",
    20:"서울 용산구 서빙고동 e편한세상",
    21:"서울 용산구 남영동 더샵"
}
name_value = "all"
# Create your views here.
def home(request):
    return render(request,'home.html')

def boxcreate(request):
    if request.method=="POST":
        random_num = str(randint(1000000000,9999999999))
        img = qrcode.make(random_num)
        img.save('media/images/qr'+random_num+'.png')
        newbox=Box()
        newbox.qr_img='media/images/qr'+random_num+'.png'
        newbox.box_number=random_num
        newbox.customer_location= request.POST["customer_location"]
        newbox.customer_phonenum= request.POST["customer_phonenum"]
        newbox.customer_name= request.POST["customer_name"]
        
        newbox.save()
        return redirect("boxcreate")
    return render(request,'boxcreate.html')

def place(request):
    return render(request,'place.html')

def members(request):
    # profiles = Profile.objects.filter().order_by('nickname')
    global place_key
    global name_value
    temp_value=place_value[place_key]
    if(place_key==0):
        if(name_value=="all"):
            profiles = Profile.objects.exclude(pk=1).order_by('nickname')
        else:
            profiles = Profile.objects.filter(nickname__icontains=name_value).exclude(pk=1).order_by('nickname')
            name_value="all"
    else :
        profiles = Profile.objects.filter(service_place__icontains=place_value[place_key]).exclude(pk=1).order_by('service_place')
        place_key=0
    #box 개수 세는 dictionary
    box_num=dict()

    #전체 user 개수 세는 변수
    user_num=Profile.objects.exclude(pk=1).count()
    
    for p in profiles:
        boxes = Box.objects.filter(user=p.user, status="C")
        box_num[p.user]=boxes.count()
    return render(request,'members.html',{'profiles':profiles,'temp_value':temp_value,'user_num':user_num ,'box_num':box_num})

def placetemp(request, temp):
    global place_key
    place_key = temp
    return redirect("members")


def members_search(request):
    global name_value
    name_value = request.POST.get('data')
    return redirect("members")

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
        global errorname
        username= request.POST["username"]
        password= request.POST["password"]
        uservalid = User.objects.filter(username__icontains=username)
        age = year-int(request.POST['birth'])//10000
        valid = True
        valid2 = True
        if age < 65:
            valid2 = False
        for i in uservalid:
            if i.username == username:
                valid=False
        if valid == True:
            if valid2 == True:
                user = User.objects.create_user(username,"",password)
                profile = get_object_or_404(Profile,user_pk=user.id)
                # fileName = user.id + '_profile.png'
                profile.user = user
                profile.nickname =request.POST['nickname']
                profile.birth = request.POST['birth']
                profile.age = age
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
                errorname= "ageerror"
                return render(request,'error.html',{'errorname':errorname})
        else :
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

def place_toss(request):
    if(request.method=='POST'):
        place_value = request.POST['place_value']
    return redirect('members')