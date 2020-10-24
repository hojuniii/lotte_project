from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from api.models import Box, Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from PIL import Image
from datetime import datetime
import qrcode
from random import *
errorname = ""
box_num = ""
place_key = 0
year = datetime.today().year+1
customer={
    1 : (" 101동 905호","박고객","01012341234"),
    2 : (" 203동 304호","김고객","01022342234"),
    3 : (" 421동 406호","이고객","01022342234"),
    4 : (" 131동 607호","장고객","01032343234"),
    5 : (" 123동 304호","정고객","01042344234"),
    6 : (" 192동 703호","주고객","01052345234"),
    7 : (" 921동 801호","호고객","01062346234"),
    8 : (" 104동 105호","하고객","01072347234"),
    9 : (" 702동 206호","한고객","01082348234"),
    10 : (" 802동 403호","한고객","01013448734"),
    11 : (" 741동 303호","여고객","01092349234"),
    12 : (" 134동 404호","남고객","01013341334"),
    13 : (" 128동 306호","조고객","01014341434"),
    14 : (" 189동 1107호","강고객","01015341534"),
    15 : (" 912동 1904호","유고객","01016341634"),
    16 : (" 153동 906호","송고객","01017341734"),
    17 : (" 543동 907호","구고객","01018341834"),
    18 : (" 345동 2008호","심고객","01019341934"),
    19 : (" 452동 2109호","곽고객","01012141214"),
    20 : (" 375동 504호","공고객","01012241224"),
}
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
        global box_num
        box_num = random_num
        random_customerNum = randint(1,20)
        newbox=Box()
        newbox.qr_img='images/qr'+random_num+'.png'
        newbox.box_number=random_num
        location = request.POST["customer_location"]
        location = location+customer.get(random_customerNum)[0]
        newbox.customer_location = location
        newbox.customer_name= customer.get(random_customerNum)[1]
        newbox.customer_phonenum= customer.get(random_customerNum)[2]
        newbox.save()
        return redirect("boxcreate")
    return render(request,'boxcreate.html',{'box_num':box_num})

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

def boxqrcode(request):
    profile = get_object_or_404(Profile,user = request.user)
    Boxes = Box.objects.filter(status='W',customer_location__icontains=profile.service_place).order_by('-id')
    if (Boxes.count() < 1):
        for i in range(0,5):
            random_num = str(randint(1000000000,9999999999))
            random_num2 = randint(1,21)
            img = qrcode.make(random_num)
            img.save('media/images/qr'+random_num+'.png')
            global box_num
            box_num = random_num
            random_customerNum = randint(1,20)
            
            newbox=Box()
            newbox.qr_img='images/qr'+random_num+'.png'
            newbox.box_number=random_num
            location = profile.service_place
            location = location+customer.get(random_customerNum)[0]
            newbox.customer_location = location
            newbox.customer_name= customer.get(random_customerNum)[1]
            newbox.customer_phonenum= customer.get(random_customerNum)[2]
            newbox.save()
    return render(request,'boxqrcode.html',{'Boxes':Boxes})