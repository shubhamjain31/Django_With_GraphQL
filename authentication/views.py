from django.shortcuts import redirect

# Create your views here.

def redirect_view(request):
    if request.user.is_authenticated:
        return redirect("/graphql")
    else:
        return redirect("/api")