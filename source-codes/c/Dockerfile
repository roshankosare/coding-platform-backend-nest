# Get the GCC preinstalled image from Docker Hub
FROM frolvlad/alpine-gcc


# Copy the current folder which contains C++ source code to the Docker image under /usr/src
COPY . /usr/src/code

# Specify the working directory
WORKDIR /usr/src/code

# Use GCC to compile the Test.cpp source file
RUN gcc -o Test main.c

# Run the program output from the previous step
CMD ["./Test"]