namespace nurkybek.Models;

public sealed class HomeViewModel
{
    public string Name { get; init; } = "Nurlybek Sarsenbekuly";
    public string Role { get; init; } = "Backend Developer & Fullstack Developer";
    public string GitHubUrl { get; init; } = "https://github.com/Nurlybek2006";
    public string LinkedInUrl { get; init; } = "https://www.linkedin.com/in/nurlybek-sarsenbekuly-114a27251/";
    public IReadOnlyList<ProjectItem> Projects { get; init; } =
    [
        new("01", "Blockchain Explorer", "A blockchain explorer platform focused on backend architecture, transaction indexing, portfolio tracking and blockchain data processing.", ["NestJS", "PostgreSQL", "Redis", "Docker", "OpenTelemetry", "TypeScript"], "https://github.com/Nurlybek2006/blockchain-explorer", null, "Backend / Blockchain"),
        new("02", "Smart Task Manager", "A modern task management application featuring authentication, task dependencies, backend API and database integration.", ["TypeScript", "Express.js", "Prisma", "PostgreSQL", "Redis"], "https://github.com/Nurlybek2006/Smart-Task-Manager", null, "Backend / Fullstack"),
        new("03", "E-Commerce", "An e-commerce application focused on product management, shopping workflows and backend application development.", ["JavaScript", "Node.js", "Backend APIs", "Database"], "https://github.com/Nurlybek2006/e-commerce", null, "Fullstack / E-Commerce")
    ];
}

public sealed record ProjectItem(string Number, string Name, string Description, IReadOnlyList<string> Technologies, string? GithubUrl = null, string? DemoUrl = null, string Category = "Backend / Fullstack");

public sealed class ContactFormModel
{
    [System.ComponentModel.DataAnnotations.Required, System.ComponentModel.DataAnnotations.StringLength(80, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [System.ComponentModel.DataAnnotations.Required, System.ComponentModel.DataAnnotations.EmailAddress, System.ComponentModel.DataAnnotations.StringLength(160)]
    public string Email { get; set; } = string.Empty;

    [System.ComponentModel.DataAnnotations.Required, System.ComponentModel.DataAnnotations.StringLength(2000, MinimumLength = 10)]
    public string Message { get; set; } = string.Empty;
}
