using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MvcFrontEnd.Startup))]
namespace MvcFrontEnd
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
