FROM frolvlad/alpine-gcc

RUN apk add --no-cache g++

# Copy the current folder which contains C++ source code to the Docker image under /usr/src
COPY . /usr/src/code

# Specify the working directory
WORKDIR /usr/src/code

# Use GCC to compile the Test.cpp source file
RUN g++ -o Test main.cpp

# Run the program output from the previous step
CMD ["./Test"]