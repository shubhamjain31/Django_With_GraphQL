from atexit import register
import graphene
from .types import *

from graphql_auth.schema import MeQuery
from graphql_auth import mutations

# create mutations for add post
class AddPost(graphene.Mutation):
    class Arguments:
        input = PostInput(required=True)

    post = graphene.Field(PostType)

    def mutate(parent, info, input=None):
        if input is None:
            return AddPost(post=None)

        _post = Post.objects.create(**input)
        return AddPost(post=_post)

# create mutations for update post
class UpdatePost(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)
        input   = PostInput(required=True)

    status      = graphene.Boolean()
    post        = graphene.Field(PostType)

    @staticmethod
    def mutate(parent, info, id, input=None):
        status = True
        post_instance = Post.objects.get(pk=id)

        if post_instance is None:
            status = False
            return UpdatePost(status=status, post=None)

        _post = Post.objects.filter(pk=id).update(**input)
        return UpdatePost(status=status, post=_post)

# create mutations for delete post
class DeletePost(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)

    status      = graphene.Boolean()
    message     = graphene.String()

    @staticmethod
    def mutate(parent, info, id, input=None):
        status = True

        try:
            post_instance = Post.objects.get(pk=id)
        except:
            status = False
            return DeletePost(status=status, message="Post matching query does not exist.")

        if post_instance is None:
            status = False
            return DeletePost(status=status, message="Something Went Wrong!")
        post_instance.delete()
        return DeletePost(status=status)

# create mutations for add author
class AddAuthor(graphene.Mutation):
    class Arguments:
        input = AuthorInput(required=True)

    author = graphene.Field(AuthorType)

    def mutate(parent, info, input=None):
        if input is None:
            return AddAuthor(author=None)
        _author = Author.objects.create(**input)
        return AddAuthor(author=_author)

# create mutations for update author
class UpdateAuthor(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)
        input   = AuthorInput(required=True)

    status      = graphene.Boolean()
    author      = graphene.Field(AuthorType)

    @staticmethod
    def mutate(parent, info, id, input=None):
        status = True
        author_instance = Author.objects.get(pk=id)

        if author_instance is None:
            status = False
            return UpdateAuthor(status=status, author=None)

        _author = Author.objects.filter(pk=id).update(**input)
        return UpdateAuthor(status=status, author=_author)

# create mutations for delete author
class DeleteAuthor(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)

    status      = graphene.Boolean()
    message     = graphene.String()

    @staticmethod
    def mutate(parent, info, id, input=None):
        status = True

        try:
            author_instance = Author.objects.get(pk=id)
        except:
            status = False
            return DeleteAuthor(status=status, message="Author matching query does not exist.")

        if author_instance is None:
            status = False
            return DeleteAuthor(status=status, message="Something Went Wrong!")
        author_instance.delete()
        return DeleteAuthor(status=status)

# create mutations for add actor
class AddActor(graphene.Mutation):
    class Arguments:
        input = ActorInput(required=True)

    status      = graphene.Boolean()
    actor       = graphene.Field(ActorType)

    @staticmethod
    def mutate(parent, info, input=None):
        status = True
        if input is None:
            return AddActor(actor=None)

        _actor = Actor.objects.create(**input)
        return AddActor(status=status, actor=_actor)

# create mutations for update actor
class UpdateActor(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)
        input   = ActorInput(required=True)

    status      = graphene.Boolean()
    actor       = graphene.Field(ActorType)

    @staticmethod
    def mutate(parent, info, id, input=None):
        status = True
        actor_instance = Actor.objects.get(pk=id)

        if actor_instance is None:
            status = False
            return UpdateActor(status=status, actor=None)

        _actor = Actor.objects.filter(pk=id).update(**input)
        return UpdateActor(status=status, actor=_actor)

# create mutations for delete actor
class DeleteActor(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)

    status      = graphene.Boolean()
    message     = graphene.String()

    @staticmethod
    def mutate(parent, info, id, input=None):
        status = True

        try:
            actor_instance = Actor.objects.get(pk=id)
        except:
            status = False
            return DeleteActor(status=status, message="Actor matching query does not exist.")

        if actor_instance is None:
            status = False
            return DeleteActor(status=status, message="Something Went Wrong!")
        actor_instance.delete()
        return DeleteActor(status=status)

# create mutations for add actor
class AddMovie(graphene.Mutation):
    class Arguments:
        input = MovieInput(required=True)

    status      = graphene.Boolean()
    movie       = graphene.Field(MovieType)

    @staticmethod
    def mutate(parent, info, input=None):
        status = True
        if input is None:
            status = False
            return AddMovie(status=status ,movie=None)

        actors = []
        for actor_input in input.actors:
            actor = Actor.objects.get(pk=actor_input.id)
            if actor is None:
                return AddMovie(ok=False, movie=None)
            actors.append(actor)

        _movie = Movie.objects.create(title=input.title, year=input.year)
        _movie.actors.set(actors)
        return AddMovie(status=status, movie=_movie)

# create mutations for update movie
class UpdateMovie(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)
        input   = MovieInput(required=True)

    status      = graphene.Boolean()
    movie       = graphene.Field(MovieType)

    @staticmethod
    def mutate(parent, info, id, input=None):
        status          = True
        movie_instance  = Movie.objects.get(pk=id)

        if movie_instance is None:
            status = False
            return UpdateMovie(status=status ,movie=None)

        actors = []
        for actor_input in input.actors:
            actor = Actor.objects.get(pk=actor_input.id)
            if actor is None:
                return UpdateMovie(ok=False, movie=None)
            actors.append(actor)

        movie_instance.title    = input.title
        movie_instance.year     = input.year
        movie_instance.save()
        movie_instance.actors.set(actors)
        return UpdateMovie(status=status, movie=movie_instance)

# create mutations for delete movie
class DeleteMovie(graphene.Mutation):
    class Arguments:
        id      = graphene.Int(required=True)

    status      = graphene.Boolean()
    message     = graphene.String()

    @staticmethod
    def mutate(parent, info, id, input=None):
        status = True
        try:
            movie_instance = Movie.objects.get(pk=id)
        except:
            status = False
            return DeleteMovie(status=status, message="Movie matching query does not exist.")

        if movie_instance is None:
            status = False
            return DeleteMovie(status=status, message="Something Went Wrong!")
        movie_instance.delete()
        return DeleteMovie(status=status)

# create the mutation type
class Mutation(graphene.ObjectType):
    add_post        = AddPost.Field()
    add_author      = AddAuthor.Field()
    create_actor    = AddActor.Field()
    create_movie    = AddMovie.Field()
    
    update_post     = UpdatePost.Field()
    update_author   = UpdateAuthor.Field()
    update_actor    = UpdateActor.Field()
    update_movie    = UpdateMovie.Field()

    delete_post     = DeletePost.Field()
    delete_author   = DeleteAuthor.Field()
    delete_actor    = DeleteActor.Field()
    delete_movie    = DeleteMovie.Field()

    register        = mutations.Register.Field()
    verify_account  = mutations.VerifyAccount.Field()
    token_auth      = mutations.ObtainJSONWebToken.Field()
    update_account  = mutations.UpdateAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()