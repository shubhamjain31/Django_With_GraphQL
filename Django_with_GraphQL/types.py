from graphene_django import DjangoObjectType, DjangoListField
from home.models import Author, Post, Actor, Movie
import graphene
from django.contrib.auth import get_user_model

User = get_user_model()


# Create a GraphQL type for the post model
class UserType(DjangoObjectType):
    class Meta:
        model       = User
        # fields      = ("id", )

# Create a GraphQL type for the post model
class PostType(DjangoObjectType):
    class Meta:
        model       = Post
        fields      = ("id", "title", "content", "author", "created_at")

# Create a GraphQL type for the author model
class AuthorType(DjangoObjectType):
    class Meta:
        model       = Author
        fields      = ("id", "name", "biodata")

    posts = DjangoListField(PostType)

    def resolve_posts(self, info):
        return Post.objects.filter(author=self.id)

# Create Input Object Types
class UserInput(graphene.InputObjectType):
    id              = graphene.ID()
    username        = graphene.String(required=True)
    email           = graphene.String(required=True)
    password        = graphene.String(required=True)
    
# Create Input Object Types
class PostInput(graphene.InputObjectType):
    id              = graphene.ID()
    title           = graphene.String(required=True)
    content         = graphene.String(required=True)
    created_at      = graphene.Date()
    author_id       = graphene.String(required=True, name="author")

# Create Input Object Types
class AuthorInput(graphene.InputObjectType):
    id              = graphene.ID()
    name            = graphene.String(required=True)
    biodata         = graphene.String()

######################################################################################################################################

# Create a GraphQL type for the movie model
class MovieType(DjangoObjectType):
    class Meta:
        model       = Movie
        fields      = ("id", "title", "actors", "year", "created_at")

# Create a GraphQL type for the actor model
class ActorType(DjangoObjectType):
    class Meta:
        model       = Actor
        fields      = ("id", "name", "created_at")

# Create Input Object Types
class ActorInput(graphene.InputObjectType):
    id              = graphene.ID()
    name            = graphene.String(required=True)
    created_at      = graphene.Date()

# Create Input Object Types
class MovieInput(graphene.InputObjectType):
    id              = graphene.ID()
    title           = graphene.String(required=True)
    year            = graphene.Int()
    created_at      = graphene.Date()
    actors          = graphene.List(ActorInput)