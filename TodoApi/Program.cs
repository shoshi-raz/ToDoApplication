using Microsoft.EntityFrameworkCore;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("ToDoDB");
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("https://todoapplication-20pz.onrender.com")
              .AllowAnyMethod()   
              .AllowAnyHeader(); 
    });
});


var app = builder.Build();
app.UseCors("CorsPolicy");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/items", async (ToDoDbContext db) =>
    await db.Items.ToListAsync());

app.MapGet("/", () => Results.Redirect("/swagger"));

app.MapPost("/items", async (ToDoDbContext db, Item item) =>
{
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{item.Id}", item);
});

app.MapPut("/items/{id}", async (ToDoDbContext db,int id ,Item item)=>
{
    Item? item1 = await db.Items.FindAsync(id) ;
    if (item1 is null)
         return Results.NotFound();
    
    //item1.Name = item.Name;
    item1.IsComplete = item.IsComplete;//!!!
    await db.SaveChangesAsync();

    return Results.NoContent();

} );
app.MapDelete("/items/{id}", async (ToDoDbContext db, int id) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();

    return Results.Ok();
});


// app.MapMethods("/options-or-head", new[] { "OPTIONS", "HEAD" }, 
//                           () => "This is an options or head request ");
app.Run();



