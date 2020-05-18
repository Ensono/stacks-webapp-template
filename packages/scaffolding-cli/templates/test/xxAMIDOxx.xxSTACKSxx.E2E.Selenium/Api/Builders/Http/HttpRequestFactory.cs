using System.Net.Http;
using System.Threading.Tasks;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Api.Builders.Http
{
  public class HttpRequestFactory
  {
    public static async Task<HttpResponseMessage> Delete(
    string apiBaseUrl,
    string path)
    {
      return await new HttpRequestBuilder()
                          .AddMethod(HttpMethod.Delete)
                          .AddRequestUri(apiBaseUrl, path)
                          .SendAsync();
    }
  }
}
