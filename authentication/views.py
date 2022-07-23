from django.shortcuts import redirect
from django.contrib.auth import mixins
from rest_framework.authentication import SessionAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from graphene_django.views import GraphQLView

# Create your views here.

def redirect_view(request):
    if request.user.is_authenticated:
        return redirect("/graphql")
    else:
        return redirect("/api")

class TokenLoginRequiredMixin(mixins.LoginRequiredMixin):

    """A login required mixin that allows token authentication."""

    def dispatch(self, request, *args, **kwargs):
        """If token was provided, ignore authenticated status."""
        http_auth = request.META.get("HTTP_AUTHORIZATION")

        """Check for a passing JWT <token> in headers"""
        if http_auth and "JWT" in http_auth:
            pass

        elif not request.user.is_authenticated:
            return self.handle_no_permission()

        return super(mixins.LoginRequiredMixin, self).dispatch(
            request, *args, **kwargs)

class PrivateGraphQLView(TokenLoginRequiredMixin, GraphQLView):

    """This view supports both token and session authentication."""

    authentication_classes = [
        SessionAuthentication,
        JSONWebTokenAuthentication,
        ]