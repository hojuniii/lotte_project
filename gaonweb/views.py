from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout


# Create your views here.
def home(request):
    return render(request,'home.html')

def place(request):
    return render(request,'place.html')
def members(request):
    return render(request,'members.html')

def login(request):
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
    return render(request,'login.html')

def signup(request):
    return render(request,'signup.html')

def mypage(request):
    return render(request,'mypage.html')

def logout_view(request):
    logout(request)
    return redirect('home')
