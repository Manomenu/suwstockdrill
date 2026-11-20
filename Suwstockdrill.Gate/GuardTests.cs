using Suwgate.Architecture.Profiles;
using Suwgate.Database.Profiles;
using Suwstockdrill.Server.Api;

namespace Suwstockdrill.Gate;

public sealed class GuardTests
{
    [Fact]
    public void Every_guard_of_suwgate_passes() =>
        SuwgateGuards.VerifyAll(
            new GuardInputs
            {
                Production = [typeof(ServerApp).Assembly],
                Tests = [typeof(GuardTests).Assembly],
                Server = typeof(ServerApp),
            },
            new DatabaseProfile()
        );
}
