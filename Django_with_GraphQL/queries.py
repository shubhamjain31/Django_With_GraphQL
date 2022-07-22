import graphene
from .types import AuthorType, PostType, ActorType, MovieType
from home.models import Author, Post, Actor, Movie


class Query(graphene.ObjectType):
    feed            = graphene.List(PostType)
    post            = graphene.Field(PostType, postId=graphene.String())
    all_authors     = graphene.Field(AuthorType)
    author          = graphene.Field(AuthorType, authorId=graphene.String())

    actor           = graphene.Field(ActorType, actorId=graphene.Int())
    movie           = graphene.Field(MovieType, movieId=graphene.Int())
    actors          = graphene.List(ActorType)
    movies          = graphene.List(MovieType)

    # Resolver for feed field
    def resolve_feed(parent, info):
        return Post.objects.all().order_by('created_at')

    # Resolver for post field
    def resolve_post(parent, info, postId):
        return Post.objects.get(id=postId)

    # Resolver for all_authors field
    def resolve_all_authors(parent, info, postId):
        return Author.objects.all()

    # Resolver for author field
    def resolve_author(parent, info, authorId):
        return Author.objects.get(id=authorId)

    # Resolver for actor field
    def resolve_actor(self, info, **kwargs):
        id      = kwargs.get('actorId')
        if id is not None:
            return Actor.objects.get(pk=id)
        return None

    # Resolver for movie field
    def resolve_movie(self, info, **kwargs):
        id      = kwargs.get('movieId')
        if id is not None:
            return Movie.objects.get(pk=id)
        return None

    # Resolver for actors field
    def resolve_actors(self, info, **kwargs):
        return Actor.objects.all()

    # Resolver for movies field
    def resolve_movies(self, info, **kwargs):
        return Movie.objects.all()