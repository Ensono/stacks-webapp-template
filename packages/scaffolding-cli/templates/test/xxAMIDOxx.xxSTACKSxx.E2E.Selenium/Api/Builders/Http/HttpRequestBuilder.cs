using System;
using System.Collections.Concurrent;
using System.Net.Http;
using System.Threading.Tasks;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Api.Builders.Http
{
  public class HttpRequestBuilder
  {
    private HttpMethod method;
    private string path;
    private string baseUrl;

    public HttpRequestBuilder AddMethod(HttpMethod method)
    {
      this.method = method;
      return this;
    }

    public HttpRequestBuilder AddRequestUri(string baseUrl, string requestUri)
    {
      this.baseUrl = baseUrl;
      path = requestUri;

      return this;
    }

    public async Task<HttpResponseMessage> SendAsync()
    {
      //Create the request message based on the request in the builder
      var request = new HttpRequestMessage
      {
        Method = this.method,
        RequestUri = new Uri($"{this.baseUrl}{this.path}")
      };

      //Creates or Gets an existing HttpClient for the BaseUrl being used
      var httpClient = HttpClientFactory.GetHttpClientInstance(baseUrl);

      return await httpClient.SendAsync(request);
    }
  }

  //This static factory ensures that we are using one HttpClient per BaseUrl used in the solution.
  //This prevents a large number sockets being left open after the tests are run
  public static class HttpClientFactory
  {
    private static ConcurrentDictionary<string, HttpClient> httpClientList = new ConcurrentDictionary<string, HttpClient>();

    public static HttpClient GetHttpClientInstance(string baseUrl)
    {
      if (!httpClientList.ContainsKey(baseUrl))
        httpClientList.TryAdd(baseUrl, new HttpClient());

      return httpClientList[baseUrl];
    }
  }
}
