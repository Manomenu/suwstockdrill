using Microsoft.AspNetCore.Http.HttpResults;
using Npgsql;
using Suwstockdrill.Server.Database;

namespace Suwstockdrill.Server.Health;

internal static partial class HealthEndpoints
{
    public static void MapHealth(this IEndpointRouteBuilder routes) => routes.MapGet("/health", Check);

    private static async Task<Results<Ok<HealthStatus>, ProblemHttpResult>> Check(
        Pool pool,
        ILoggerFactory loggerFactory,
        CancellationToken cancellationToken
    )
    {
        try
        {
            await using var connection = await pool.OpenAsync(cancellationToken);
            return TypedResults.Ok(new HealthStatus("ok"));
        }
        catch (NpgsqlException error)
        {
            DatabaseDoesNotAnswer(loggerFactory.CreateLogger("Suwstockdrill.Server.Health"), error);
            return TypedResults.Problem(
                detail: "The database does not answer: start it with `just tmux-dev start` (or scripts/.internal/db.sh up), or fix ConnectionStrings:Default.",
                statusCode: StatusCodes.Status503ServiceUnavailable
            );
        }
    }

    [LoggerMessage(Level = LogLevel.Warning, Message = "The health check could not reach the database")]
    private static partial void DatabaseDoesNotAnswer(ILogger logger, Exception error);
}
