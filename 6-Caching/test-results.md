# Performance test results

<P>
Brief description of the used server (choose one): HTTP/1.1 / HTTP/2
</P>

* Used server -> HTTP/1.1, localhost (127.0.0.1) port 7777

<P>
Brief description of your computer:
</P>

* Chip Apple M1 Max
* Memory 64GB
* macOS Sonoma 14.1

## No Caching

### Retrieving todos

* http_reqs: 13614
* http_req_duration - median: 6.04ms
* http_req_duration - 99th percentile: 17.43ms

## With Caching

### Retrieving todos

* http_reqs: 15372
* http_req_duration - median: 5.65ms
* http_req_duration - 99th percentile: 16.27ms

## Reflection

Brief reflection on the results of the tests -- why do you think you saw the results you saw:

<p>
Both tests run with two items in db. The test results tell that the todo-api with caching completes with more requests than without caching (15,4k vs 13,6k requests). This is also reflected in lower request duration times. The app uses cached data to redis for get requests and thus it does not need to query postgress in every reuest as the data have not been changed.
<p>
