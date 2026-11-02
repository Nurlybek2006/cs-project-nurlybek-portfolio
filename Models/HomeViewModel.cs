namespace nurkybek.Models;

public sealed class HomeViewModel
{
    public string Name { get; init; } = "Nurlybek Sarsenbekuly";
    public string Role { get; init; } = "Backend Developer & Fullstack Developer";
    public IReadOnlyList<ProjectItem> Projects { get; init; } =
    [
        new("01", "Blockchain Explorer", "A backend-focused blockchain explorer with transaction indexing, portfolio tracking, and observability.", ["NestJS", "PostgreSQL", "Redis", "Docker", "OpenTelemetry"]),
        new("02", "Smart Task Manager", "A task management application with authentication, task dependencies, and a thoughtfully designed backend API.", ["TypeScript", "Express.js", "Prisma", "PostgreSQL", "Redis"]),
        new("03", "Intelligent Programming Platform", "An educational programming platform concept with code execution, AI tutoring, and interactive coding features.", ["ASP.NET Core", "C#", "SQL Server", "Entity Framework Core"])
    ];
}

public sealed record ProjectItem(string Number, string Name, string Description, IReadOnlyList<string> Technologies, string? GithubUrl = null, string? DemoUrl = null);

public sealed class ContactFormModel
{
    [System.ComponentModel.DataAnnotations.Required, System.ComponentModel.DataAnnotations.StringLength(80, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [System.ComponentModel.DataAnnotations.Required, System.ComponentModel.DataAnnotations.EmailAddress, System.ComponentModel.DataAnnotations.StringLength(160)]
    public string Email { get; set; } = string.Empty;

    [System.ComponentModel.DataAnnotations.Required, System.ComponentModel.DataAnnotations.StringLength(2000, MinimumLength = 10)]
    public string Message { get; set; } = string.Empty;
}
