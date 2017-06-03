REST => Representational State Transfer.

REST - a mapping between HTTP(Hypertext Transfer Protocol) routes and CRUD (Create, Read, Update, Destroy).
-A pattern for defining routes.

CREATE   /createBlog/new
READ     /allBlogs
UPDATE   /updateBlog/:id
DESTROY /destroyBlog/:id


SEVEN RESTful ROUTES
--------------------
 
    METHOD    PATH           HTTP-VERB    MongooseMethod          PURPOSE
    --------------------------------------------------------------------------------------  
1.) INDEX     /dogs            GET        Dog.find()              List all dogs
2.) NEW       /dogs/new        GET        N/A                     Show new dog form
3.) CREATE    /dogs            POST       Dog.create()            Create a new dog, then redirect somewhere
4.) SHOW      /dogs/:id        GET        Dog.findById()          Show info about one specific dog
5.) EDIT      /dogs/:id/edit   GET        Dog.findById()          Show edit form for one dog.
6.) UPDATE    /dogs/:id        PUT        Dog.findByIdAndUpdate() Update a particular dog, then redirect somewhere.
7.) DESTROY   /dogs/:id        DELETE     Dog.findByIdAndRemove() Delete a particular dog, then redirect somewhere.






