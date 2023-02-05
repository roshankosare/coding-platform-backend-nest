FROM alpine as build-env
RUN apk add --no-cache build-base
WORKDIR /app
COPY . .
# Compile the binaries
RUN gcc -o hello main.c
FROM alpine
COPY --from=build-env /app/hello /app/hello
WORKDIR /app
CMD ["/app/hello"] 